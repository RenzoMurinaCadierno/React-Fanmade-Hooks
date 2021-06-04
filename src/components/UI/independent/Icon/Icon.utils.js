import PropTypes from "prop-types"
import styles from "./Icon.module.css"

export const classes = {
  container: (type, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type] : "") +
    " " +
    styles.Container
}

export const iconPropTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  className: PropTypes.string
}
