import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Icon.module.css"

export const classes = {
  container: (type, className) =>
    cnp.default(styles.Container, className) + cnp.if(type, styles[type])
}

export const defaultProps = { type: "primary" }

export const propTypes = {
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
