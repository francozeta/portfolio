import {
  BASELINE_1,
  BOND_AIR_CELLS,
  BOND_BOW_CELLS,
  BOND_BOW_S,
  BOND_CELL_SCALE,
  BOND_MIN_CELLS,
  BOND_OFF_BEFORE_HOME,
  BOND_ON_TICK,
  BOND_WEIGHT_CELLS,
  CAP_H,
  CAP_PIXELS,
  EASE_MOVE,
  EASE_RETURN,
  FONT_WEIGHT,
  FPS,
  HOLD_TICKS,
  INK,
  JITTER_CELLS,
  JITTER_EASE_TICKS,
  JITTER_GATE,
  JITTER_S,
  LINES,
  LINE_PITCH,
  MOVE_TICKS,
  POSES,
  RETURN_TICKS,
  SCATTERS_MAX,
  SCATTERS_MIN,
} from "./params"

interface Letter {
  ch: string
  x: number
  y: number
  left: number
  right: number
  top: number
  bottom: number
  px: number[]
  py: number[]
  line: number
  slot: number
}

function edgeDistance(halfWidth: number, halfHeight: number, ux: number, uy: number) {
  const tx = ux !== 0 ? halfWidth / Math.abs(ux) : Infinity
  const ty = uy !== 0 ? halfHeight / Math.abs(uy) : Infinity
  return Math.min(tx, ty)
}

function sample(table: number[], tick: number) {
  if (tick <= 0) return table[0]
  const index = Math.floor(tick)
  if (index >= table.length - 1) return table.at(-1) ?? 1
  return table[index] + (table[index + 1] - table[index]) * (tick - index)
}

export class BondType {
  private ctx: CanvasRenderingContext2D | null
  private raf = 0
  private t0 = 0
  private lastFrame = 0
  private running = false
  private lastTick = -1
  private letters: Letter[] = []
  private pairs: [number, number][] = []
  private sequence: number[] = []
  private cycleTicks = 0
  private font = ""
  private cell = 1
  private clock = 0
  private lastPose = -1
  readonly ok: boolean

  constructor(
    private canvas: HTMLCanvasElement,
    private family = "sans-serif",
  ) {
    this.ctx = canvas.getContext("2d")
    this.ok = Boolean(this.ctx)
    if (this.ok) this.resize()
  }

  resize() {
    const bounds = this.canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.canvas.width = Math.round(bounds.width * dpr)
    this.canvas.height = Math.round(bounds.height * dpr)
    this.layout()
    if (this.lastTick >= 0) this.render(this.lastTick)
    else this.renderStill()
  }

  setFont(family: string) {
    this.family = family
    this.layout()
    if (this.running && this.lastTick >= 0) this.render(this.lastTick)
    else this.renderStill()
  }

  private layout() {
    const ctx = this.ctx
    if (!ctx) return
    const height = this.canvas.height
    const width = this.canvas.width

    ctx.font = `${FONT_WEIGHT} 100px ${this.family}`
    const probe = ctx.measureText("H")
    const capAt100 = probe.actualBoundingBoxAscent || 72
    const size = (CAP_H * height * 100) / capAt100
    this.font = `${FONT_WEIGHT} ${size}px ${this.family}`
    ctx.font = this.font
    ctx.textBaseline = "alphabetic"
    this.cell = this.measureCell(size, CAP_H * height) * BOND_CELL_SCALE

    this.letters = []
    this.pairs = []

    LINES.forEach((word, lineIndex) => {
      const baseline = (BASELINE_1 + lineIndex * LINE_PITCH) * height
      const total = ctx.measureText(word).width
      const lineLeft = (width - total) / 2
      const start = this.letters.length

      for (let slot = 0; slot < word.length; slot++) {
        const x = lineLeft + ctx.measureText(word.slice(0, slot)).width
        const metrics = ctx.measureText(word[slot])
        this.letters.push({
          ch: word[slot],
          x,
          y: baseline,
          left: -(metrics.actualBoundingBoxLeft || 0),
          right: metrics.actualBoundingBoxRight || metrics.width,
          top: -(metrics.actualBoundingBoxAscent || size * 0.5),
          bottom: metrics.actualBoundingBoxDescent || 0,
          px: [],
          py: [],
          line: lineIndex,
          slot,
        })
        if (slot > 0) this.pairs.push([start + slot - 1, start + slot])
      }

      const lineLetters = this.letters.slice(start)
      const centerX = (letter: Letter) => letter.x + (letter.left + letter.right) / 2
      const typesetCenter = (centerX(lineLetters[0]) + centerX(lineLetters.at(-1)!)) / 2

      POSES.forEach((pose) => {
        const gaps = pose.gaps[lineIndex] ?? []
        const verticalOffsets = pose.dy[lineIndex] ?? []
        const span = gaps.reduce((sum, gap) => sum + gap, 0) * height
        const unclamped = typesetCenter + pose.shift[lineIndex] * height
        const halfSpan = span / 2
        const safeCenter = Math.min(width - halfSpan - this.cell * 4, Math.max(halfSpan + this.cell * 4, unclamped))
        let x = safeCenter - halfSpan

        lineLetters.forEach((letter, index) => {
          if (index > 0) {
            const gap = gaps[index - 1]
            x += (Number.isFinite(gap) ? gap : 0) * height
          }
          const horizontal = x - centerX(letter)
          const vertical = verticalOffsets[index]
          letter.px.push(Number.isFinite(horizontal) ? horizontal : 0)
          letter.py.push((Number.isFinite(vertical) ? vertical : 0) * height)
        })
      })
    })
  }

  private measureCell(fontSize: number, capHeight: number) {
    const fallback = Math.max(1, Math.round(capHeight / CAP_PIXELS))
    try {
      const width = Math.ceil(fontSize * 4)
      const height = Math.ceil(fontSize * 1.6)
      const offscreen = document.createElement("canvas")
      offscreen.width = width
      offscreen.height = height
      const ctx = offscreen.getContext("2d", { willReadFrequently: true })
      if (!ctx) return fallback
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = "#fff"
      ctx.font = `${FONT_WEIGHT} ${fontSize}px ${this.family}`
      ctx.textBaseline = "alphabetic"
      ctx.fillText("HEIL", 4, height * 0.8)

      const runs: number[] = []
      for (const fraction of [0.45, 0.55, 0.65]) {
        const y = Math.floor(height * 0.8 - capHeight * fraction)
        if (y < 0 || y >= height) continue
        const data = ctx.getImageData(0, y, width, 1).data
        let run = 0
        for (let x = 0; x < width; x++) {
          if (data[x * 4] > 127) run++
          else {
            if (run > 0) runs.push(run)
            run = 0
          }
        }
        if (run > 0) runs.push(run)
      }
      if (!runs.length) return fallback
      const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a)
      let cell = runs[0]
      for (const run of runs) cell = gcd(cell, run)
      return cell >= 2 ? cell : fallback
    } catch {
      return fallback
    }
  }

  private newCycle() {
    const count = SCATTERS_MIN + Math.floor(Math.random() * (SCATTERS_MAX - SCATTERS_MIN + 1))
    const next: number[] = []
    let last = this.lastPose
    for (let index = 0; index < count; index++) {
      let pose = Math.floor(Math.random() * POSES.length)
      if (pose === last) pose = (pose + 1) % POSES.length
      next.push(pose)
      last = pose
    }
    this.sequence = next
    this.lastPose = last
    this.cycleTicks = next.length * MOVE_TICKS + RETURN_TICKS + HOLD_TICKS
  }

  private ease(table: number[], localTick: number, duration: number) {
    const progress = Math.min(1, Math.max(0, localTick / duration))
    return sample(table, progress * (table.length - 1))
  }

  private poseOffset(letter: Letter, pose: number): [number, number] {
    const x = letter.px[pose]
    const y = letter.py[pose]
    return [Number.isFinite(x) ? x : 0, Number.isFinite(y) ? y : 0]
  }

  private offsetAt(letter: Letter, tick: number): [number, number] {
    const scatterEnd = this.sequence.length * MOVE_TICKS

    if (tick < scatterEnd) {
      const keyframe = Math.min(this.sequence.length - 1, Math.floor(tick / MOVE_TICKS))
      const local = tick - keyframe * MOVE_TICKS
      const progress = this.ease(EASE_MOVE, local, MOVE_TICKS)
      const from = keyframe === 0 ? ([0, 0] as const) : this.poseOffset(letter, this.sequence[keyframe - 1])
      const to = this.poseOffset(letter, this.sequence[keyframe])
      return [from[0] + (to[0] - from[0]) * progress, from[1] + (to[1] - from[1]) * progress]
    }

    const local = tick - scatterEnd
    if (local >= RETURN_TICKS) return [0, 0]
    const progress = this.ease(EASE_RETURN, local, RETURN_TICKS)
    const last = this.sequence.at(-1) ?? 0
    const [x, y] = this.poseOffset(letter, last)
    return [x * (1 - progress), y * (1 - progress)]
  }

  private unrest(tick: number) {
    const offAt = this.sequence.length * MOVE_TICKS
    if (tick <= BOND_ON_TICK || tick >= offAt) return 0
    const edge = Math.min(tick - BOND_ON_TICK, offAt - tick) / JITTER_EASE_TICKS
    const eased = Math.min(1, Math.max(0, edge))
    return eased * eased * (3 - 2 * eased)
  }

  private jitter(index: number, amount: number): [number, number] {
    if (JITTER_CELLS <= 0 || amount < 0.5) return [0, 0]
    const wave = (Math.PI * 2) / JITTER_S
    const y = Math.sin(this.clock * wave + index * 2.9)
    if (Math.abs(y) >= JITTER_GATE) return [0, Math.sign(y) * JITTER_CELLS * this.cell]
    const x = Math.sin(this.clock * wave * 0.73 + index * 1.7)
    if (Math.abs(x) >= JITTER_GATE) return [Math.sign(x) * JITTER_CELLS * this.cell, 0]
    return [0, 0]
  }

  private render(tick: number) {
    const ctx = this.ctx
    if (!ctx) return
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.font = this.font
    ctx.textBaseline = "alphabetic"
    ctx.fillStyle = INK

    const unrest = this.unrest(tick)
    const offsets = this.letters.map((letter, index) => {
      const [x, y] = this.offsetAt(letter, tick)
      const [jitterX, jitterY] = this.jitter(index, unrest)
      return [x + jitterX, y + jitterY] as [number, number]
    })

    this.letters.forEach((letter, index) => {
      ctx.fillText(letter.ch, letter.x + offsets[index][0], letter.y + offsets[index][1])
    })

    const bondEnd = this.sequence.length * MOVE_TICKS + RETURN_TICKS - BOND_OFF_BEFORE_HOME
    if (tick < BOND_ON_TICK || tick > bondEnd) return

    const centers = this.letters.map((letter, index) => [
      letter.x + (letter.left + letter.right) / 2 + offsets[index][0],
      letter.y + (letter.top + letter.bottom) / 2 + offsets[index][1],
    ] as [number, number])

    const cell = this.cell
    for (const [leftIndex, rightIndex] of this.pairs) {
      const left = this.letters[leftIndex]
      const right = this.letters[rightIndex]
      const dx = centers[rightIndex][0] - centers[leftIndex][0]
      const dy = centers[rightIndex][1] - centers[leftIndex][1]
      const length = Math.hypot(dx, dy)
      if (length < 1) continue

      const ux = dx / length
      const uy = dy / length
      const leftEdge = edgeDistance((left.right - left.left) / 2, (left.bottom - left.top) / 2, ux, uy)
      const rightEdge = edgeDistance((right.right - right.left) / 2, (right.bottom - right.top) / 2, ux, uy)
      const free = length - leftEdge - rightEdge
      const air = BOND_AIR_CELLS * cell
      const usable = free - 2 * air
      const count = Math.floor(usable / cell)
      if (count < BOND_MIN_CELLS) continue

      const start = leftEdge + air + (usable - count * cell) / 2
      const bow = BOND_BOW_CELLS * cell * Math.sin(this.clock * ((Math.PI * 2) / BOND_BOW_S) + leftIndex * 1.1)
      const nx = -uy
      const ny = ux

      for (let index = 0; index < count; index++) {
        const distance = start + (index + 0.5) * cell
        const envelope = count > 1 ? Math.sin((Math.PI * (index + 0.5)) / count) : 0
        const x = centers[leftIndex][0] + ux * distance + nx * bow * envelope
        const y = centers[leftIndex][1] + uy * distance + ny * bow * envelope
        const weight = BOND_WEIGHT_CELLS * cell
        ctx.fillRect(
          Math.round((x - weight / 2) / cell) * cell,
          Math.round((y - weight / 2) / cell) * cell,
          weight,
          weight,
        )
      }
    }
  }

  start() {
    if (this.running || !this.ok) return
    this.running = true
    if (!this.sequence.length) this.newCycle()
    const startedAt = performance.now()
    const resumeTick = Math.max(0, this.lastTick)
    this.t0 = startedAt - (resumeTick / FPS) * 1000
    this.lastFrame = startedAt

    const frame = (now: number) => {
      if (!this.running) return
      this.clock += Math.max(0, now - this.lastFrame) / 1000
      this.lastFrame = now
      const tick = ((now - this.t0) / 1000) * FPS
      if (tick >= this.cycleTicks) {
        this.t0 = now
        this.newCycle()
        this.lastTick = 0
        this.render(0)
      } else {
        this.lastTick = tick
        this.render(tick)
      }
      this.raf = requestAnimationFrame(frame)
    }

    this.raf = requestAnimationFrame(frame)
  }

  stop() {
    if (!this.running) return
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  renderStill() {
    if (!this.sequence.length) this.newCycle()
    this.render(this.cycleTicks - 1)
  }

  destroy() {
    this.stop()
  }
}
