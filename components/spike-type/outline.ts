export type Contour = number[]

export interface Field {
  hit: (x: number, y: number) => boolean
  scale: number
}

export interface Edge {
  pts: number[]
  nrm: number[]
}

interface TraceOptions {
  word: string
  font: string
  width: number
  height: number
  dpr: number
}

const FONT_WEIGHT = 700

const EMPTY_TRACE = {
  contours: [] as Contour[],
  field: { hit: () => false, scale: 1 },
}

export function traceWord({ word, font, width, height, dpr }: TraceOptions) {
  const gridHeight = Math.max(360, Math.round(height * dpr * 1.15))
  const gridWidth = Math.max(8, Math.round((gridHeight * width) / height))
  const canvas = document.createElement("canvas")
  canvas.width = gridWidth
  canvas.height = gridHeight

  const context = canvas.getContext("2d", { willReadFrequently: true })
  if (!context) return EMPTY_TRACE

  context.fillStyle = "#000"
  context.fillRect(0, 0, gridWidth, gridHeight)

  const fontFace = (size: number) => `${FONT_WEIGHT} ${size}px ${font}`
  const probeSize = 100
  context.font = fontFace(probeSize)

  const wordUnit = context.measureText(word).width / probeSize
  if (!wordUnit) return EMPTY_TRACE

  const fontSize = Math.min((gridWidth * 0.74) / wordUnit, gridHeight * 0.62)
  context.font = fontFace(fontSize)
  context.textAlign = "center"
  context.textBaseline = "middle"
  context.fillStyle = "#fff"
  context.fillText(word, gridWidth / 2, gridHeight / 2)

  const pixels = context.getImageData(0, 0, gridWidth, gridHeight).data
  const bits = new Uint8Array(gridWidth * gridHeight)
  for (let index = 0; index < bits.length; index++) {
    bits[index] = pixels[index * 4] > 127 ? 1 : 0
  }

  const isMarked = (x: number, y: number) => {
    if (x < 1 || y < 1 || x >= gridWidth - 1 || y >= gridHeight - 1) return false
    return bits[y * gridWidth + x] === 1
  }

  const scaleX = width / gridWidth
  const scaleY = height / gridHeight
  const contours = traceContours(isMarked, gridWidth, gridHeight).map((contour) => {
    const scaled = new Array<number>(contour.length)
    for (let index = 0; index < contour.length; index += 2) {
      scaled[index] = contour[index] * scaleX
      scaled[index + 1] = contour[index + 1] * scaleY
    }
    return scaled
  })

  return {
    contours,
    field: {
      hit: (x: number, y: number) => isMarked(Math.round(x / scaleX), Math.round(y / scaleY)),
      scale: Math.max(scaleX, scaleY),
    },
  }
}

function traceContours(
  isMarked: (x: number, y: number) => boolean,
  gridWidth: number,
  gridHeight: number,
) {
  const moveX = [1, 0, -1, 0]
  const moveY = [0, 1, 0, -1]
  const normalX = [0, 1, 0, -1]
  const normalY = [-1, 0, 1, 0]
  const cornerX = [0, 1, 1, 0]
  const cornerY = [0, 0, 1, 1]
  const used = new Set<number>()
  const edgeKey = (x: number, y: number, direction: number) =>
    (y * gridWidth + x) * 4 + direction
  const contours: number[][] = []

  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      if (!isMarked(x, y)) continue

      for (let direction = 0; direction < 4; direction++) {
        if (isMarked(x + normalX[direction], y + normalY[direction])) continue
        if (used.has(edgeKey(x, y, direction))) continue

        const points: number[] = []
        let pointX = x
        let pointY = y
        let pointDirection = direction
        let guard = gridWidth * gridHeight * 8

        while (guard-- > 0) {
          const key = edgeKey(pointX, pointY, pointDirection)
          if (used.has(key)) break

          used.add(key)
          points.push(
            pointX + cornerX[pointDirection],
            pointY + cornerY[pointDirection],
          )

          const leftX = pointX + moveX[pointDirection] + normalX[pointDirection]
          const leftY = pointY + moveY[pointDirection] + normalY[pointDirection]
          const frontX = pointX + moveX[pointDirection]
          const frontY = pointY + moveY[pointDirection]

          if (isMarked(leftX, leftY)) {
            pointX = leftX
            pointY = leftY
            pointDirection = (pointDirection + 3) & 3
          } else if (isMarked(frontX, frontY)) {
            pointX = frontX
            pointY = frontY
          } else {
            pointDirection = (pointDirection + 1) & 3
          }
        }

        if (points.length >= Math.max(32, gridHeight / 8)) contours.push(points)
      }
    }
  }

  return contours
}

export function prepareEdge(raw: number[], step: number, roughness: number, seed: number) {
  const base = resample(smooth(raw, 2), step)
  const pointCount = base.length / 2
  if (pointCount < 8) return null

  const points = new Array<number>(pointCount * 2)
  const normals = new Array<number>(pointCount * 2)
  let doubledArea = 0

  for (let index = 0; index < pointCount; index++) {
    const next = (index + 1) % pointCount
    doubledArea +=
      base[index * 2] * base[next * 2 + 1] -
      base[next * 2] * base[index * 2 + 1]
  }

  const outward = doubledArea > 0 ? 1 : -1

  for (let index = 0; index < pointCount; index++) {
    const previous = (index - 1 + pointCount) % pointCount
    const next = (index + 1) % pointCount
    const tangentX = base[next * 2] - base[previous * 2]
    const tangentY = base[next * 2 + 1] - base[previous * 2 + 1]
    const tangentLength = Math.hypot(tangentX, tangentY) || 1
    const normalX = (tangentY / tangentLength) * outward
    const normalY = (-tangentX / tangentLength) * outward
    const phase = index * 0.9 + seed
    const chew =
      Math.sin(phase * 0.21) * 0.55 +
      Math.sin(phase * 0.53 + 1.7) * 0.3 +
      Math.sin(phase * 1.27 + 4.1) * 0.15

    points[index * 2] = base[index * 2] + normalX * chew * roughness
    points[index * 2 + 1] = base[index * 2 + 1] + normalY * chew * roughness
    normals[index * 2] = normalX
    normals[index * 2 + 1] = normalY
  }

  return { pts: points, nrm: normals } satisfies Edge
}

function resample(source: number[], step: number) {
  const pointCount = source.length / 2
  if (pointCount < 3) return []

  const points: number[] = []
  let carry = 0

  for (let index = 0; index < pointCount; index++) {
    const startX = source[index * 2]
    const startY = source[index * 2 + 1]
    const next = (index + 1) % pointCount
    const deltaX = source[next * 2] - startX
    const deltaY = source[next * 2 + 1] - startY
    const length = Math.hypot(deltaX, deltaY)
    if (length < 1e-9) continue

    let distance = carry
    while (distance < length) {
      const progress = distance / length
      points.push(startX + deltaX * progress, startY + deltaY * progress)
      distance += step
    }
    carry = distance - length
  }

  return points
}

function smooth(source: number[], passes: number) {
  const pointCount = source.length / 2
  if (pointCount < 5) return source.slice()

  let current = source
  for (let pass = 0; pass < passes; pass++) {
    const next = new Array<number>(pointCount * 2)
    for (let index = 0; index < pointCount; index++) {
      let sumX = 0
      let sumY = 0
      for (let offset = -2; offset <= 2; offset++) {
        const sample = (index + offset + pointCount) % pointCount
        sumX += current[sample * 2]
        sumY += current[sample * 2 + 1]
      }
      next[index * 2] = sumX / 5
      next[index * 2 + 1] = sumY / 5
    }
    current = next
  }

  return current
}
