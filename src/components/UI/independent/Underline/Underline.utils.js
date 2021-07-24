import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Underline.module.css"

export const classes = {
  container: (className, isFocused) =>
    cnp.default(styles.Container, className) + cnp.if(isFocused, styles.Focused)
}

export const propTypes = {
  isFocused: PropTypes.bool,
  className: PropTypes.string
}
