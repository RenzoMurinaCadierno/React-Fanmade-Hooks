import PropTypes from "prop-types"
import styles from "./Input.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}

export const inputPropTypes = {
  className: PropTypes.string
}
