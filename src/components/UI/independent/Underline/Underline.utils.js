import PropTypes from "prop-types"
import styles from "./Underline.module.css"

export const classes = {
  container: (className, isFocused) =>
    (className ?? "") +
    " " +
    styles.Container +
    " " +
    (isFocused ? styles.Focused : "")
}

export const propTypes = {
  isFocused: PropTypes.bool,
  className: PropTypes.string
}
