import type { Edge, Field } from "./outline"

export interface Spike {
  path: number[]
  x: number
  y: number
  nx: number
  ny: number
  reach: number
  slack: number
}

interface SpikeOptions {
  maxLength: number
  rootWidth: number
  steps: number
  field: Field
}

function headroom(
  x: number,
  y: number,
  directionX: number,
  directionY: number,
  maximum: number,
  field: Field,
) {
  const step = Math.max(1, field.scale)
  const skip = step * 3

  for (let distance = skip; distance < maximum; distance += step) {
    if (field.hit(x + directionX * distance, y + directionY * distance)) {
      return distance
    }
  }

  return maximum
}

function random(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return value - Math.floor(value)
}

export function growSpikes(
  edge: Edge,
  every: number,
  options: SpikeOptions,
  seed: number,
) {
  const pointCount = edge.pts.length / 2
  const spikes: Spike[] = []

  for (let index = 0; index < pointCount; index += every) {
    const spikeSeed = seed + index * 0.371
    if (random(spikeSeed + 91.3) < 0.14) continue

    const reach = Math.pow(random(spikeSeed), 2.6)
    const requestedLength = options.maxLength * (0.06 + 0.94 * reach)
    const x = edge.pts[index * 2]
    const y = edge.pts[index * 2 + 1]
    let normalX = edge.nrm[index * 2]
    let normalY = edge.nrm[index * 2 + 1]

    const lean = (random(spikeSeed + 17.7) - 0.5) * 0.9
    const cosine = Math.cos(lean)
    const sine = Math.sin(lean)
    const rotatedX = normalX * cosine - normalY * sine
    const rotatedY = normalX * sine + normalY * cosine
    normalX = rotatedX
    normalY = rotatedY

    const room = headroom(
      x,
      y,
      normalX,
      normalY,
      options.maxLength,
      options.field,
    )
    const length = Math.min(requestedLength, room * 0.62)
    if (length < options.rootWidth * 2.5) continue

    spikes.push({
      path: buildSpine(length, options, spikeSeed),
      x,
      y,
      nx: normalX,
      ny: normalY,
      reach: length / options.maxLength,
      slack: Math.max(
        0,
        Math.min(options.maxLength * 0.55, room * 0.62 - length) / length,
      ),
    })
  }

  return spikes
}

function buildSpine(length: number, options: SpikeOptions, seed: number) {
  const { steps, rootWidth } = options
  const spineX = new Array<number>(steps + 1)
  const spineY = new Array<number>(steps + 1)
  const halfWidth = new Array<number>(steps + 1)
  const buriedRoot = rootWidth * 2.2
  let directionX = 1
  let directionY = 0
  let currentX = -buriedRoot
  let currentY = 0
  const wander = (random(seed + 3.3) - 0.5) * 0.55

  for (let index = 0; index <= steps; index++) {
    const progress = index / steps
    spineX[index] = currentX
    spineY[index] = currentY
    halfWidth[index] = rootWidth * Math.pow(1 - progress, 1.8)
    if (index === steps) break

    const turn =
      (random(seed + index * 7.13) - 0.5) * 0.22 + wander / steps
    const cosine = Math.cos(turn)
    const sine = Math.sin(turn)
    const nextX = directionX * cosine - directionY * sine
    const nextY = directionX * sine + directionY * cosine
    directionX = nextX
    directionY = nextY

    const segment = (length + buriedRoot) / steps
    currentX += directionX * segment
    currentY += directionY * segment
  }

  const path: number[] = []
  for (let index = 0; index <= steps; index++) {
    const previous = Math.max(0, index - 1)
    const next = Math.min(steps, index + 1)
    const tangentX = spineX[next] - spineX[previous]
    const tangentY = spineY[next] - spineY[previous]
    const tangentLength = Math.hypot(tangentX, tangentY) || 1
    path.push(
      spineX[index] + (tangentY / tangentLength) * halfWidth[index],
      spineY[index] - (tangentX / tangentLength) * halfWidth[index],
    )
  }

  for (let index = steps; index >= 0; index--) {
    const previous = Math.max(0, index - 1)
    const next = Math.min(steps, index + 1)
    const tangentX = spineX[next] - spineX[previous]
    const tangentY = spineY[next] - spineY[previous]
    const tangentLength = Math.hypot(tangentX, tangentY) || 1
    path.push(
      spineX[index] - (tangentY / tangentLength) * halfWidth[index],
      spineY[index] + (tangentX / tangentLength) * halfWidth[index],
    )
  }

  return path
}
