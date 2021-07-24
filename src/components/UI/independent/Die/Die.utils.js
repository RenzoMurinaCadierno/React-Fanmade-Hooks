import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Die.module.css"

export const classes = {
  container: (isRolling, isFrozen, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(isRolling, styles.Roll) +
    cnp.if(isFrozen, styles.Frozen),
  digit: (className) => styles.Digit + cnp.get(className)
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
