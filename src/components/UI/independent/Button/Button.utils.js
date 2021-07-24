import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Button.module.css"

export const classes = {
  container: (growState, type, coloredBg, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(growState, styles.Grow) +
    cnp.if(type, styles[type]) +
    cnp.if(type && coloredBg, styles[type + "-colored"])
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
