import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./BTField.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className)
}

export const defaultProps = { type: "primary" }

export const propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string
}
