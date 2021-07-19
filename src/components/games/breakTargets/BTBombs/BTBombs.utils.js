import PropTypes from "prop-types"
import styles from "./BTBombs.module.css"

export const classes = {
  container: (className) =>
    (className ? className + " " : "") + styles.Container,
  bomb: (className) => (className ? className + " " : "") + styles.Bomb
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
