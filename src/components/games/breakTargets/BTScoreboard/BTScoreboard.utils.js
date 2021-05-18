import PropTypes from "prop-types"
import styles from "./BTScoreboard.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}

export const btScoreboardPropTypes = {
  scores: PropTypes.objectOf(
    PropTypes.exact({
      bonusTime: PropTypes.number.isRequired,
      minAccuracy: PropTypes.number.isRequired,
      points: PropTypes.number.isRequired
    })
  ).isRequired,
  gameSt: PropTypes.shape({
    isGameActive: PropTypes.bool,
    text: PropTypes.string,
    hits: PropTypes.number,
    points: PropTypes.number,
    speed: PropTypes.number,
    accSpeed: PropTypes.number,
    highScore: PropTypes.number
  }).isRequired,
  timerComponent: PropTypes.func,
  onGameReset: PropTypes.func.isRequired,
  onGameStart: PropTypes.func.isRequired,
  className: PropTypes.string
}
