import PropTypes from "prop-types"
import styles from "./CountBar.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  minusButton: (className) => (className ?? "") + " " + styles.MinusButton,
  progressbar: (classNames) => ({
    container: (classNames?.container ?? "") + " " + styles.ProgressContainer,
    progress: classNames?.progressbar ?? ""
  }),
  plusButton: (className) => (className ?? "") + " " + styles.PlusButton
}

export const countBarPropTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  addText: PropTypes.string,
  subText: PropTypes.string,
  progressText: PropTypes.string,
  disableButtons: PropTypes.bool,
  disableProgressbar: PropTypes.bool,
  onSub: PropTypes.func,
  onAdd: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    minusButton: PropTypes.string,
    progressbar: PropTypes.exact({
      container: PropTypes.string,
      progress: PropTypes.string
    }),
    plusButton: PropTypes.string
  })
}

/**
 * Given current `value`, `max` and `min`, it returns an array shaped:
 *
 * * `elem 0` (boolean): true indicates `value` did not reach its `max`.
 * * `elem 1` (boolean): true indicates `value` did not reach its `min`.
 * * `elem 2` (string): if `value` < `min` or `value` > `max`, this is set to a
 *     string with the difference between `value` and the exceeded limit.
 *     Otherwise, it is set to an empty string.
 *
 * @param {number} value current progress' value
 * @param {number} min minimum possible value
 * @param {number} max maximum possible value
 */
export function getHelpers(value, min, max) {
  return [
    canAdd(value, min, max),
    canSubstract(value, min),
    getExceededValue(value, min, max)
  ]
}

function canAdd(value, min, max) {
  if (min + value >= max) return false
  return true
}

function canSubstract(value, min) {
  if (value <= min) return false
  return true
}

function getExceededValue(value, min, max) {
  if (min + value > max) return " (+" + (min + value - max) + ")"
  if (value < min) return " (" + (value - min) + ")"
  return ""
}