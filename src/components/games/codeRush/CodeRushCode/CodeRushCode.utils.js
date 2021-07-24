import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CodeRushCode.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  animateCode: styles.AnimateCode
}

export const defaultProps = { code: [] }

export const propTypes = {
  code: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string
}
