export const FPS = 32

export const EASE_MOVE = [
  0, 0.014, 0.044, 0.193, 0.317, 0.545, 0.621, 0.735, 0.777, 0.838, 0.868, 0.908, 0.924, 0.95,
  0.962, 0.979, 0.985, 0.994, 0.996, 1,
]

export const EASE_RETURN = [
  0, 0.0115, 0.023, 0.0475, 0.072, 0.1835, 0.295, 0.3645, 0.434, 0.534, 0.634, 0.667, 0.7,
  0.7495, 0.799, 0.8175, 0.836, 0.862, 0.888, 0.8995, 0.911, 0.9275, 0.944, 0.949, 0.954,
  0.9685, 0.983, 0.985, 0.987, 0.9915, 0.996, 0.998, 1,
]

export const INK = "#fafafa"
export const CAP_H = 56 / 304
export const FONT_VAR = "--font-geist-pixel-square"
export const FONT_WEIGHT = 500
export const BASELINE_1 = 140 / 304
export const LINE_PITCH = 67.5 / 304

export const JITTER_CELLS = 1
export const JITTER_S = 5.2
export const JITTER_GATE = 0.975
export const JITTER_EASE_TICKS = 6

export const BOND_CELL_SCALE = 0.5
export const CAP_PIXELS = 9
export const BOND_AIR_CELLS = 2
export const BOND_MIN_CELLS = 1
export const BOND_WEIGHT_CELLS = 2
export const BOND_BOW_CELLS = 1
export const BOND_BOW_S = 7
export const BOND_ON_TICK = 3
export const BOND_OFF_BEFORE_HOME = 2

export const LINES = ["Franco", "Zeta"] as const

export interface Pose {
  gaps: number[][]
  shift: number[]
  dy: number[][]
}

const scaled = (values: number[]) => values.map((value) => value / 304)

export const POSES: Pose[] = [
  {
    gaps: [scaled([56.3, 58.5, 64.6, 71, 66.2]), scaled([78.3, 74.7, 88.6])],
    shift: [4.5 / 304, -10.2 / 304],
    dy: [scaled([-30, -16, -7, -7, -16, -30]), scaled([8, 22, 38, 52])],
  },
  {
    gaps: [scaled([67.8, 65.9, 65.1, 77.9, 70.8]), scaled([74.2, 84.5, 81.7])],
    shift: [-3.8 / 304, 12.7 / 304],
    dy: [scaled([-6, -23, -45, -54, -30, -6]), scaled([48.4, 31, 14, 48.4])],
  },
  {
    gaps: [scaled([60.6, 60.8, 68.9, 68, 72]), scaled([94.9, 86.1, 76.9])],
    shift: [-13.1 / 304, 6.6 / 304],
    dy: [scaled([-54, -44, -34, -24, -14, -6]), scaled([8, 8, 52, 52])],
  },
  {
    gaps: [scaled([75.1, 70.3, 60.8, 73.5, 67.2]), scaled([89.5, 76.7, 87.4])],
    shift: [-4.6 / 304, -2.9 / 304],
    dy: [scaled([-27, -6.2, -18, -39, -53.8, -27]), scaled([30, 52, 45.6, 30])],
  },
  {
    gaps: [scaled([70.2, 74.4, 77.1, 77.5, 72.5]), scaled([95.8, 84, 76.2])],
    shift: [4.9 / 304, -11.4 / 304],
    dy: [scaled([-54, -54, -54, -6, -6, -6]), scaled([52, 32, 8, 30])],
  },
  {
    gaps: [scaled([60.2, 76.3, 69.2, 71.3, 65.4]), scaled([74.3, 88.6, 87.6])],
    shift: [-1.3 / 304, 8.4 / 304],
    dy: [scaled([-30, -15, -6, -6, -15, -30]), scaled([8, 24, 40, 52])],
  },
]

POSES.forEach((pose, poseIndex) => {
  LINES.forEach((word, lineIndex) => {
    const gapCount = pose.gaps[lineIndex]?.length
    const offsetCount = pose.dy[lineIndex]?.length
    if (gapCount !== word.length - 1 || offsetCount !== word.length) {
      throw new Error(
        `Invalid BondType pose ${poseIndex}: ${word} needs ${word.length - 1} gaps and ${word.length} offsets`,
      )
    }
  })
})

export const SCATTERS_MIN = 2
export const SCATTERS_MAX = 4
export const MOVE_TICKS = 24
export const RETURN_TICKS = 20
export const HOLD_TICKS = 32
