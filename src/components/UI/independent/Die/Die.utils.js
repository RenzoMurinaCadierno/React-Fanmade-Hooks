import PropTypes from "prop-types"
import styles from "./Die.module.css"

export const classes = {
  container: (isRolling, isFrozen, className) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (isRolling ? styles.Roll : "") +
    " " +
    (isFrozen ? styles.Frozen : ""),
  digit: (className) => (className ?? "") + " " + styles.Digit
}

export const diePropTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  isFrozen: PropTypes.bool,
  onBeforeRoll: PropTypes.func,
  onAfterRoll: PropTypes.func
}
