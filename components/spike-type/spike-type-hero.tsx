"use client"

import { useEffect, useRef } from "react"
import { prepareEdge, traceWord } from "./outline"
import { growSpikes, type Spike } from "./spikes"

const WORD = "ZETA"

const PALETTE = {
  ground: "#0a0a0a",
  mark: "#0a0a0a",
  line: "#ef263a",
  lineActive: "#ff665c",
} as const

const EVERY = 3
const MAX_LENGTH = 0.26
const ROOT_WIDTH = 0.006
const ROUGHNESS = 0.007
const SAMPLE_STEP = 0.006
const LINE_WIDTH = 0.0024
const EDGE_RUN = 9
const BREATH_RATE = 0.38
const BREATH_AMOUNT = 0.052
const POINTER_REACH = 0.3
const POINTER_BEND = 0.34
const GROWTH_AMOUNT = 0.9
const SPRING = 0.055
const DAMPING = 0.86
const MAGNET_AMOUNT = 0.008
const MAGNET_REACH = 0.34
const MAGNET_SPRING = 0.05
const MAGNET_DAMPING = 0.87
const TINT_REACH = 0.2
const TINT_STEPS = 24

interface DrawableSpike extends Spike {
  letter: number
  shape: Path2D
}

interface EdgeRun {
  letter: number
  shape: Path2D
  x: number
  y: number
  width: number
}

interface LetterGroup {
  low: number
  high: number
  contours: number[]
}

const TINT_RAMP = makeColorRamp(PALETTE.line, PALETTE.lineActive, TINT_STEPS)

function makeColorRamp(from: string, to: string, steps: number) {
  const parse = (value: string) => [
    Number.parseInt(value.slice(1, 3), 16),
    Number.parseInt(value.slice(3, 5), 16),
    Number.parseInt(value.slice(5, 7), 16),
  ]
  const start = parse(from)
  const end = parse(to)

  return Array.from({ length: steps }, (_, index) => {
    const progress = index / (steps - 1)
    const eased = progress * progress * (3 - 2 * progress)
    const channels = start.map((channel, channelIndex) =>
      Math.round(channel + (end[channelIndex] - channel) * eased),
    )
    return `rgb(${channels[0]} ${channels[1]} ${channels[2]})`
  })
}

function pathFromPoints(points: number[]) {
  const path = new Path2D()
  if (points.length < 4) return path
  path.moveTo(points[0], points[1])
  for (let index = 2; index < points.length; index += 2) {
    path.lineTo(points[index], points[index + 1])
  }
  path.closePath()
  return path
}

function addContour(path: Path2D, points: number[]) {
  if (points.length < 4) return
  path.moveTo(points[0], points[1])
  for (let index = 2; index < points.length; index += 2) {
    path.lineTo(points[index], points[index + 1])
  }
  path.closePath()
}

function buildGroups(contours: number[][]) {
  const spans = contours.map((contour) => {
    let low = Infinity
    let high = -Infinity
    for (let index = 0; index < contour.length; index += 2) {
      low = Math.min(low, contour[index])
      high = Math.max(high, contour[index])
    }
    return { low, high }
  })

  const groups: LetterGroup[] = []
  spans.forEach((span, contourIndex) => {
    const group = groups.find(
      (candidate) => span.low < candidate.high && span.high > candidate.low,
    )
    if (group) {
      group.low = Math.min(group.low, span.low)
      group.high = Math.max(group.high, span.high)
      group.contours.push(contourIndex)
    } else {
      groups.push({ ...span, contours: [contourIndex] })
    }
  })

  return groups.sort((left, right) => left.low - right.low)
}

function tintAt(
  x: number,
  y: number,
  pointerX: number,
  pointerY: number,
  grip: number,
  reach: number,
) {
  if (grip <= 0.001) return 0
  const distance = Math.hypot(x - pointerX, y - pointerY)
  if (distance >= reach) return 0
  const proximity = 1 - distance / reach
  return Math.round(proximity * proximity * grip * (TINT_STEPS - 1))
}

export function SpikeTypeHero() {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const precisePointer = window.matchMedia("(pointer: fine)")
    const fontReady = document.fonts?.ready ?? Promise.resolve()
    const fontFamily = getComputedStyle(host).fontFamily || "sans-serif"

    let cancelled = false
    let built = false
    let onScreen = false
    let hidden = document.hidden
    let inTransition = false
    let width = 0
    let height = 0
    let animationFrame = 0
    let resizeTimer = 0
    let lastDrawTime = 0
    let pointer: { x: number; y: number } | null = null
    let pointerX = 0
    let pointerY = 0
    let freshPointer = true
    let grip = 0
    let spikes: DrawableSpike[] = []
    let letterPaths: Path2D[] = []
    let letterCenters: number[] = []
    let edgeRuns: EdgeRun[] = []
    let angles = new Float32Array(0)
    let angularVelocity = new Float32Array(0)
    let extension = new Float32Array(0)
    let extensionVelocity = new Float32Array(0)
    let letterX = new Float32Array(0)
    let letterY = new Float32Array(0)
    let letterVelocityX = new Float32Array(0)
    let letterVelocityY = new Float32Array(0)

    const build = () => {
      if (cancelled) return
      width = host.clientWidth
      height = host.clientHeight
      if (!width || !height) return

      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const traced = traceWord({
        word: WORD,
        font: fontFamily,
        width,
        height,
        dpr,
      })
      if (!traced.contours.length) return

      const groups = buildGroups(traced.contours)
      const contourLetter = traced.contours.map((_, contourIndex) => {
        const index = groups.findIndex((group) => group.contours.includes(contourIndex))
        return Math.max(0, index)
      })

      spikes = []
      edgeRuns = []
      letterPaths = groups.map(() => new Path2D())
      letterCenters = groups.map((group) => (group.low + group.high) / 2)

      traced.contours.forEach((contour, contourIndex) => {
        const edge = prepareEdge(
          contour,
          height * SAMPLE_STEP,
          height * ROUGHNESS,
          contourIndex * 12.9,
        )
        if (!edge) return

        const letter = contourLetter[contourIndex]
        addContour(letterPaths[letter], edge.pts)

        const grown = growSpikes(
          edge,
          EVERY,
          {
            maxLength: height * MAX_LENGTH,
            rootWidth: height * ROOT_WIDTH,
            steps: 7,
            field: traced.field,
          },
          contourIndex * 53.1,
        )
        spikes.push(
          ...grown.map((spike) => ({
            ...spike,
            letter,
            shape: pathFromPoints(spike.path),
          })),
        )

        const pointCount = edge.pts.length / 2
        for (let start = 0; start < pointCount; start += EDGE_RUN) {
          const run = new Path2D()
          const x = edge.pts[start * 2]
          const y = edge.pts[start * 2 + 1]
          run.moveTo(x, y)
          for (let offset = 1; offset <= EDGE_RUN; offset++) {
            const sample = (start + offset) % pointCount
            run.lineTo(edge.pts[sample * 2], edge.pts[sample * 2 + 1])
          }
          const wobble =
            1 + Math.sin(edgeRuns.length * 0.37) * 0.34 +
            Math.sin(edgeRuns.length * 0.13 + 2.1) * 0.22
          edgeRuns.push({
            letter,
            shape: run,
            x,
            y,
            width: Math.max(0.5, height * LINE_WIDTH * Math.max(0.25, wobble)),
          })
        }
      })

      angles = new Float32Array(spikes.length)
      angularVelocity = new Float32Array(spikes.length)
      extension = new Float32Array(spikes.length)
      extensionVelocity = new Float32Array(spikes.length)
      letterX = new Float32Array(groups.length)
      letterY = new Float32Array(groups.length)
      letterVelocityX = new Float32Array(groups.length)
      letterVelocityY = new Float32Array(groups.length)
      lastDrawTime = 0
      draw(0)
    }

    const draw = (now: number) => {
      if (!spikes.length || !width || !height) return

      const seconds = now * 0.001
      const frameScale = lastDrawTime
        ? Math.min(2, Math.max(0.5, (now - lastDrawTime) / (1000 / 60)))
        : 1
      lastDrawTime = now

      const gripTarget = pointer ? 1 : 0
      grip += (gripTarget - grip) * (1 - Math.pow(0.88, frameScale))
      if (pointer) {
        if (freshPointer) {
          pointerX = pointer.x
          pointerY = pointer.y
          freshPointer = false
        } else {
          const pointerEase = 1 - Math.pow(0.82, frameScale)
          pointerX += (pointer.x - pointerX) * pointerEase
          pointerY += (pointer.y - pointerY) * pointerEase
        }
      }

      const pull = height * MAGNET_AMOUNT
      const magnetSpan = height * MAGNET_REACH
      for (let letter = 0; letter < letterPaths.length; letter++) {
        let targetX = 0
        let targetY = 0
        if (grip > 0.001) {
          const deltaX = pointerX - letterCenters[letter]
          const deltaY = pointerY - height / 2
          const distance = Math.hypot(deltaX, deltaY) || 1
          const proximity = Math.max(0, 1 - distance / magnetSpan)
          const amount = pull * proximity * proximity * grip
          targetX = (deltaX / distance) * amount
          targetY = (deltaY / distance) * amount
        }

        const mass = 1 + (letter % 2) * 0.35
        letterVelocityX[letter] =
          (letterVelocityX[letter] +
            (targetX - letterX[letter]) * (MAGNET_SPRING / mass) * frameScale) *
          Math.pow(MAGNET_DAMPING, frameScale)
        letterVelocityY[letter] =
          (letterVelocityY[letter] +
            (targetY - letterY[letter]) * (MAGNET_SPRING / mass) * frameScale) *
          Math.pow(MAGNET_DAMPING, frameScale)
        letterX[letter] += letterVelocityX[letter] * frameScale
        letterY[letter] += letterVelocityY[letter] * frameScale
      }

      context.clearRect(0, 0, width, height)
      context.fillStyle = PALETTE.ground
      context.fillRect(0, 0, width, height)
      context.lineCap = "round"
      context.lineJoin = "round"

      const pointerSpan = height * POINTER_REACH
      const tintSpan = height * TINT_REACH

      spikes.forEach((spike, index) => {
        const offsetX = letterX[spike.letter] ?? 0
        const offsetY = letterY[spike.letter] ?? 0
        const phase = seconds * BREATH_RATE + index * 0.7
        let rotation = Math.sin(phase) * BREATH_AMOUNT
        let angleTarget = 0
        let extensionTarget = 0

        if (grip > 0.001) {
          const deltaX = spike.x + offsetX - pointerX
          const deltaY = spike.y + offsetY - pointerY
          const distance = Math.hypot(deltaX, deltaY)
          if (distance < pointerSpan) {
            const proximity = 1 - distance / pointerSpan
            const side = Math.sign(spike.nx * deltaY - spike.ny * deltaX) || 1
            angleTarget =
              proximity * proximity * POINTER_BEND * side * (0.35 + spike.reach) * grip
            extensionTarget =
              proximity * proximity * spike.slack * GROWTH_AMOUNT * grip
          }
        }

        const stiffness = SPRING * (1.7 - spike.reach * 1.2)
        const damping = DAMPING - (1 - spike.reach) * 0.09
        angularVelocity[index] =
          (angularVelocity[index] +
            (angleTarget - angles[index]) * stiffness * frameScale) *
          Math.pow(damping, frameScale)
        angles[index] += angularVelocity[index] * frameScale
        rotation += angles[index]

        extensionVelocity[index] =
          (extensionVelocity[index] +
            (extensionTarget - extension[index]) * stiffness * 1.3 * frameScale) *
          Math.pow(damping, frameScale)
        extension[index] += extensionVelocity[index] * frameScale

        const tint = tintAt(
          spike.x + offsetX,
          spike.y + offsetY,
          pointerX,
          pointerY,
          grip,
          tintSpan,
        )

        context.save()
        context.translate(spike.x + offsetX, spike.y + offsetY)
        context.rotate(Math.atan2(spike.ny, spike.nx) + rotation)
        context.scale(1 + extension[index], 1)
        context.fillStyle = PALETTE.ground
        context.fill(spike.shape)
        context.strokeStyle = TINT_RAMP[tint]
        context.lineWidth = Math.max(0.45, height * LINE_WIDTH * (0.62 + spike.reach * 0.7))
        context.stroke(spike.shape)
        context.restore()
      })

      letterPaths.forEach((path, letter) => {
        context.save()
        context.translate(letterX[letter] ?? 0, letterY[letter] ?? 0)
        context.fillStyle = PALETTE.mark
        context.fill(path, "evenodd")
        context.restore()
      })

      edgeRuns.forEach((run) => {
        const offsetX = letterX[run.letter] ?? 0
        const offsetY = letterY[run.letter] ?? 0
        const tint = tintAt(
          run.x + offsetX,
          run.y + offsetY,
          pointerX,
          pointerY,
          grip,
          tintSpan,
        )
        context.save()
        context.translate(offsetX, offsetY)
        context.strokeStyle = TINT_RAMP[tint]
        context.lineWidth = run.width
        context.stroke(run.shape)
        context.restore()
      })
    }

    const running = () =>
      built && onScreen && !hidden && !inTransition && !motionPreference.matches

    const frame = (now: number) => {
      animationFrame = 0
      if (!running()) return
      draw(now)
      animationFrame = requestAnimationFrame(frame)
    }

    const sync = () => {
      if (running()) {
        if (!animationFrame) animationFrame = requestAnimationFrame(frame)
      } else if (animationFrame) {
        cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }

      if (built && motionPreference.matches) draw(0)
    }

    const initialize = () => {
      if (built) return
      built = true
      fontReady.then(() => {
        if (cancelled) return
        build()
        sync()
      })
    }

    const intersection = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting)
        if (onScreen) initialize()
        sync()
      },
      { rootMargin: "200px" },
    )
    intersection.observe(host)

    const initialBounds = host.getBoundingClientRect()
    onScreen = initialBounds.bottom >= -200 && initialBounds.top <= window.innerHeight + 200
    if (onScreen) initialize()

    const onVisibility = () => {
      hidden = document.hidden
      sync()
    }
    const onMotionPreference = () => sync()
    const onPageHide = () => {
      inTransition = true
      sync()
    }
    const onPageShow = () => {
      inTransition = false
      sync()
    }
    const onPointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    }
    const onPointerEnter = (event: PointerEvent) => {
      freshPointer = true
      onPointerMove(event)
    }
    const onPointerLeave = () => {
      pointer = null
    }
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        if (built) build()
      }, 120)
    }

    document.addEventListener("visibilitychange", onVisibility)
    motionPreference.addEventListener("change", onMotionPreference)
    window.addEventListener("pagehide", onPageHide)
    window.addEventListener("pageshow", onPageShow)
    if (precisePointer.matches) {
      host.addEventListener("pointerenter", onPointerEnter)
      host.addEventListener("pointermove", onPointerMove)
      host.addEventListener("pointerleave", onPointerLeave)
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(host)

    return () => {
      cancelled = true
      if (animationFrame) cancelAnimationFrame(animationFrame)
      window.clearTimeout(resizeTimer)
      intersection.disconnect()
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      motionPreference.removeEventListener("change", onMotionPreference)
      window.removeEventListener("pagehide", onPageHide)
      window.removeEventListener("pageshow", onPageShow)
      host.removeEventListener("pointerenter", onPointerEnter)
      host.removeEventListener("pointermove", onPointerMove)
      host.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="The word ZETA outlined in crimson, with a ragged edge and hundreds of fine organic spikes inspired by a red spider lily."
      className="relative aspect-[1344/620] w-full select-none overflow-hidden bg-neutral-950"
      style={{ backgroundColor: PALETTE.ground }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
