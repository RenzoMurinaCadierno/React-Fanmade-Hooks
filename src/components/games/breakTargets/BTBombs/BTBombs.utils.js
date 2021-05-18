import PropTypes from "prop-types"
import styles from "./BTBombs.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  bomb: (className) => (className ?? "") + " " + styles.Bomb
}

export const btBombsPropTypes = {
  bombs: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  show: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    bomb: PropTypes.string
  })
}
