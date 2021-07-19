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
  digit: (className) => (className ? className + " " : "") + styles.Digit
}

export const defaultProps = {
  min: 1,
  max: 6,
  classNames: {},
  digitProps: {}
}

export const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  isFrozen: PropTypes.bool,
  onBeforeRoll: PropTypes.func,
  onAfterRoll: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    digit: PropTypes.string
  }),
  digitProps: PropTypes.object,
  otherProps: PropTypes.object
}
