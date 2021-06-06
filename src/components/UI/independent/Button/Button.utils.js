import PropTypes from "prop-types"
import styles from "./Button.module.css"

export const classes = {
  container: (growState, type, coloredBg, className) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (growState ? styles.Grow : "") +
    " " +
    (type ? styles[type] : "") +
    " " +
    (type && coloredBg ? styles[type + "-colored"] : "")
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
