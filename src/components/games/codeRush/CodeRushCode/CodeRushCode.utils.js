import PropTypes from "prop-types"
import styles from "./CodeRushCode.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  animateCode: styles.AnimateCode
}

export const defaultProps = { code: [] }

export const propTypes = {
  code: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
}
