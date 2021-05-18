import PropTypes from "prop-types"
import styles from "./Progressbar.module.css"

export const classes = {
  container: (onClick, className) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (onClick ? styles.Clickable : ""),
  progress: (growFrom, className) =>
    (className ?? "") +
    " " +
    styles.Progress +
    " " +
    (growFrom ? styles["grow-" + growFrom] : "")
}

export const progressbarPropTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  unit: PropTypes.string,
  showValue: PropTypes.bool,
  text: PropTypes.string,
  growFrom: PropTypes.string,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    progress: PropTypes.string
  })
}

/**
 * Given values and limits, it returns an object to use as "styles" property
 * for "progress" '*div*'.
 *
 * @param {number} _value Adjusted current progress value.
 * @param {number} _min Adjusted minimum possible progress value.
 * @param {number} _max Adjusted maximum possible progress value.
 *
 * @returns {object} Object to assign to "styles" property in "progress"
 *   '*div*'.
 */
export function getProgressStyle(_value, _min, _max) {
  return {
    width: ((_value + _min) * 100) / _max + "%",
    filter: `hue-rotate(${((_value + _min) / _max) * 30 - 15}deg)`,
    opacity: ((_value + _min) / _max) * 0.15 + 0.1
  }
}

/**
 * Adjusts `value`, `min` and `max` so that `value` never exceeds both limits.
 *
 * @param {number} value Current progress value.
 * @param {number} min Minimum possible progress value.
 * @param {number} max Maximum possible progress value.
 *
 * @returns {Array} An array where the first element is the minumum value, the
 * second the actual value and the third one, the maximum. Each value is
 * adjusted to valid ranges.
 */
export function getValidRangeValues(value, min, max) {
  if (min + value >= max) return [min, max, max]
  if (value <= min) return [min, min, max]
  return [min, value, max]
}
