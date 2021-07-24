import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./ProgressBackground.module.css"

export const classes = {
  container: (type, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(type, styles[type?.toLowerCase()])
}

export const defaultProps = { show: true, min: 0, value: 0, max: 100 }

const validTypes = [
  "primary",
  "secondary",
  "danger",
  "primary-1",
  "secondary-1",
  "danger-1",
  "primary-2",
  "secondary-2",
  "danger-2",
  "primary-3",
  "secondary-3",
  "danger-3"
]

export const propTypes = {
  show: PropTypes.bool,
  min: PropTypes.number,
  value: PropTypes.number,
  max: PropTypes.number,
  type: PropTypes.oneOf(validTypes),
  shrink: PropTypes.bool,
  classNames: PropTypes.string
}

/**
 * Adjusts `value`, `min` and `max` so that `value` never exceeds both limits.
 *
 * @param {number} min Minimum possible progress value.
 * @param {number} value Current progress value.
 * @param {number} max Maximum possible progress value.
 *
 * @returns {Array} An array where the first element is the minumum value, the
 * second the actual value and the third one, the maximum. Each value is
 * adjusted to valid ranges.
 */
function getValidRangeValues(min, value, max) {
  if (min + value >= max) return [min, max, max]
  if (value <= min) return [min, min, max]
  return [min, value, max]
}

/**
 * Returns the width CSS-in-JS rule as a string to pass to progress container's
 * "width" `style`.
 *
 * @param {number} min Minimum possible progress value.
 * @param {number} value Current progress value.
 * @param {number} max Maximum possible progress value.
 * @param {bool} shrink `true` will start with `width: "100%"` and decrease as
 *   `value` increases, like an 'inverted' progressbar. `false` starts at
 *   `width: "0%"` and grows up to 100%.
 *
 * @returns {string} "width" `style` for progress container.
 */
export function getProgressWidth(min, value, max, shrink) {
  const [_min, _value, _max] = getValidRangeValues(min, value, max)
  const progressWidth = ((_value + _min) * 100) / _max
  return (shrink ? 100 - progressWidth : progressWidth) + "%"
}
