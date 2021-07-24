import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./BTBombs.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  bomb: (className) => cnp.default(styles.Bomb, className)
}

export const defaultProps = { show: true, classNames: {} }

export const propTypes = {
  bombs: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    bomb: PropTypes.string
  })
}
