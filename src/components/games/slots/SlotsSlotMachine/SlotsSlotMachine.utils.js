import PropTypes from "prop-types"
import styles from "./SlotsSlotMachine.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  spinningSlot: (className) => className
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  slotsArrays: getPropTypesRequiredArrays(3),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    spinningSlot: PropTypes.object
  })
}

/**
 * Repeats "PropTypes.arrayOf().isRequired" `arrQty` times, and adds
 *   'PropTypes.string' as the deepmost type check.
 *
 * E.g.: **getPropTypesRequiredArrays(3)** results in:
 *
 * > * PropTypes.arrayOf(
 * > * * PropTypes.arrayOf(
 * > * * * PropTypes.arrayOf(
 * > * * * * PropTypes.string
 * > * * * ).isRequired)
 * > * * .isRequired)
 * > * .isRequired
 *
 * @param {number} arrQty Times "PropTypes.arrayOf().isRequired"
 *   is repeated.
 * @param {object} res Current winding-up PropType check
 *
 * @returns "PropTypes.arrayOf().isRequired" times `arrQty`, where
 *  the deepmost type check is PropTypes.string
 */
function getPropTypesRequiredArrays(arrQty, res) {
  if (arrQty <= 0) return PropTypes.string
  res = PropTypes.arrayOf(
    getPropTypesRequiredArrays(arrQty - 1, res)
  ).isRequired
  return res
}
