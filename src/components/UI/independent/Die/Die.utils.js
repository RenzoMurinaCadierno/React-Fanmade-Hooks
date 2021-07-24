import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Die.module.css"

export const classes = {
  container: (isRolling, isFrozen, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(isRolling, styles.Roll) +
    cn.if(isFrozen, styles.Frozen),
  digit: (className) => styles.Digit + cn.get(className)
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
