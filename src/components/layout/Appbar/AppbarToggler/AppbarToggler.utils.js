import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./AppbarToggler.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  toggler: (isActive, animate, className) =>
    styles.Toggler +
    cn.get(className) +
    cn.if(isActive, styles.Active) +
    cn.if(animate, styles.Animate)
}

export const defaultProps = { classNames: {}, togglerDisplayProps: {} }

export const propTypes = {
  isActive: PropTypes.bool,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    toggler: PropTypes.string
  }),
  togglerDisplayProps: PropTypes.object,
  otherProps: PropTypes.object
}
