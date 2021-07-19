import PropTypes from "prop-types"
import styles from "./SlotsGameRootNode.module.css"
import { copyAndShuffleArray } from "utils/utilityFunctions"
import apple from "../assets/apple.svg"
import cherry from "../assets/cherry.svg"
import heart from "../assets/heart.svg"
import lemon from "../assets/lemon.svg"
import star from "../assets/star.svg"
import berry from "../assets/berry.svg"

/******************************* CONFIGS *******************************/

/**
 * Initial lives
 */
export const lives = 3

/**
 * Root image arrays to render "slot" and "stat" elements across the
 * component tree and to process the game's logic in reducer.
 */
const slotsAndStatsItems = {
  slots: [
    ["apple", apple, "🍎", 4],
    ["cherry", cherry, "🍒", 3],
    ["lemon", lemon, "🍋", 2],
    ["berry", berry, "🍓", 1]
  ],
  stats: [
    ["heart", heart, "❤️"],
    ["star", star, "⭐"]
  ]
}

/******************************* /CONFIGS ******************************/

export const classes = {
  container: (className) =>
    (className ? className + " " : "") + styles.Container,
  resetButton: (className) =>
    (className ? className + " " : "") + styles.ResetButton,
  imgToggleButton: (className) =>
    (className ? className + " " : "") + styles.ImgToggleButton,
  scores: (classNames) => getScoresAndStatsCNs(styles.Scores, classNames),
  stats: (classNames) => getScoresAndStatsCNs(styles.Stats, classNames)
}

// avoids code duplication
function getScoresAndStatsCNs(defaultClassName, classNames = {}) {
  return {
    container: (classNames.container ?? "") + " " + defaultClassName,
    item: classNames.item ?? {},
    image: classNames.image ?? ""
  }
}

export const defaultProps = { classNames: {} }

// avoids code duplication
const slotsScoreSideClassNamesShape = PropTypes.shape({
  container: PropTypes.string,
  item: PropTypes.exact({
    container: PropTypes.string,
    badge: PropTypes.object
  }),
  image: PropTypes.string
})

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    resetButton: PropTypes.string,
    imgToggleButton: PropTypes.string,
    scores: slotsScoreSideClassNamesShape,
    stats: slotsScoreSideClassNamesShape
  })
}

/**
 * Given an array of "slot" items sub-arrays to use on each spinning slot,
 *   it creates and returns an array of "slot" items sub-arrays, each one
 *   shaped:
 * * (elem 0): slot unique key name (slot item's name + "_" + unique index).
 * * (elem 1): path to its svg image to render as *'img'* src.
 * * (elem 2): alt for that *'img'* or icon to render instead of svg.
 *
 * The initial array of "slot" items sub-arrays passed as argument must
 *   have each each sub-array shape:
 * * (elem 0) <string>: slot name (e.g.: "apple", "cherry", "lemon").
 * * (elem 1) <string>: path to its svg image to render as *'img'* src.
 * * (elem 2) <string>: alt for that *'img'* or icon to render instead.
 * * (elem 3) <number>: quantity of times the item appears in spinning slot.
 */
const defaultSlotItemsArray = (function (arrOfSlotItemsSubArrays) {
  return arrOfSlotItemsSubArrays.reduce((acc, slotArr) => {
    for (let i = 0; i < (slotArr[3] ?? 1); i++) {
      acc.push([`${slotArr[0]}_${i}`, ...slotArr.slice(1, 3)])
    }
    return acc
  }, [])
})(slotsAndStatsItems.slots)

/**
 * Array of three `defaultSlotItemsArray` with their elements shuffled,
 *   each one to be passed to its own '*SlotsSpinningSlot*' to be
 *   rendered as spinning slots' items.
 *
 * `defaultSlotItemsArray` is the default array of sub-arrays of "slot"
 *   items, each one shaped:
 * * (elem 0): slot unique key name (slot item's name + "_" + unique index).
 * * (elem 1): path to its svg image to render as *'img'* src.
 * * (elem 2): alt for that *'img'* or icon to render instead of svg.
 */
export const slotsArrays = [
  copyAndShuffleArray(defaultSlotItemsArray),
  copyAndShuffleArray(defaultSlotItemsArray),
  copyAndShuffleArray(defaultSlotItemsArray)
]

/**
 * Object with "scores" (also "slots") and "stats" array of image sub-arrays,
 * used to render '*SlotsResultScreen*' and '*SlotScoreSide*'. They are
 * applied to render "slot" images ("apple", "cherry", "lemon", "berry")
 * and "stat" images ("heart", "star") across the whole component tree.
 *
 * Each sub-array is shaped:
 * * (elem 0) <string>: slot name (e.g.: "apple", "cherry", "lemon").
 * * (elem 1) <string>: path to its svg image to render as *'img'* src.
 * * (elem 2) <string>: alt for that *'img'* or icon to render instead.
 */
export const resultItems = {
  scores: slotsAndStatsItems.slots.map((slotArr) => slotArr.slice(0, 3)),
  stats: slotsAndStatsItems.stats
}

/**
 * Gets an Image array where the first element of each sub-array is the
 * "slot"/"stat" name and returns an array with all of those names.
 *
 * @param {Array} slotArray Image array for "slot"/"stat". Its first element
 *   must be the "slot"/"stat" name (e.g.: "apple", "lemon", "heart", "star").
 *
 * @returns {Array} All "slot"s/"stat"s name strings in `slotArray`.
 */
function getSlotsNames(slotArray) {
  return slotArray.reduce((acc, slotArr) => [...acc, slotArr[0]], [])
}

/**
 * Object with "scores" and "stats" as keys, with their values being an array
 * of "slot" ("scores") and "stat" names as strings.
 *
 * E.g.: { scores: ["apple", "lemon", ...], stats: ["heart", "star"] }
 */
export const reducerItems = {
  scores: getSlotsNames(slotsAndStatsItems.slots),
  stats: getSlotsNames(slotsAndStatsItems.stats)
}

/**
 * Returns true if there are no hearts (lives) left, or if the current
 * stars (score) equals the maximum amount of possible stars (all slots
 * scores were archieved).
 *
 * @param {object} reducerFullState slotsGame.reducer's state
 */
export function isGameOver(reducerFullState) {
  const { stats, maxPossibleStars } = reducerFullState
  return (
    !!!stats[reducerItems.stats[0]][0].content ||
    stats[reducerItems.stats[1]][0].content === maxPossibleStars
  )
}
