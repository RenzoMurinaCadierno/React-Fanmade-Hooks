import PropTypes from "prop-types"
import styles from "./CodeRushScore.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  text: (className) => className,
  value: (className) => className,
  scoreAnimation: styles.ScoreAnimation
}

export const defaultProps = { score: 0, classNames: {} }

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string
  })
}
