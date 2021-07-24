import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Input.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className)
}

export const inputPropTypes = {
  className: PropTypes.string
}
