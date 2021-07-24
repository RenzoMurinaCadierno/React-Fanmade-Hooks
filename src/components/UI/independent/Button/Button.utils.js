import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Button.module.css"

export const classes = {
  container: (growState, type, coloredBg, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(growState, styles.Grow) +
    cn.if(type, styles[type]) +
    cn.if(type && coloredBg, styles[type + "-colored"])
}

export const propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf([
    "primary",
    "primary-1",
    "secondary",
    "secondary-1",
    "danger",
    "danger-1"
  ]),
  coloredBg: PropTypes.bool,
  className: PropTypes.string,
  otherProps: PropTypes.object
}
