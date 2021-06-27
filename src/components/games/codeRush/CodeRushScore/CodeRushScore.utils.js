import PropTypes from "prop-types"
import styles from "./CodeRushScore.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  text: (className) => className,
  value: (className) => className,
  scoreAnimation: styles.ScoreAnimation
}

export const defaultProps = {
  text: "Score",
  score: 0,
  type: "primary",
  classNames: {}
}

export const propTypes = {
  text: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["primary", "secondary", "danger"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string,
    value: PropTypes.string
  }),
  textProps: PropTypes.object,
  valueProps: PropTypes.object
}
