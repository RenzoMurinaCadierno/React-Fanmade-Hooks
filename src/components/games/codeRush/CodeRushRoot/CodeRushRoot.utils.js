import PropTypes from "prop-types"
import styles from "./CodeRushRoot.module.css"

export const classes = {
  container: (className) => className,
  code: (className) => className,
  numPadAndStats: (className) =>
    (className ?? "") + " " + styles.NumPadAndStats,
  numPad: (classNames) => classNames,
  stats: (classNames) => classNames,
  timerButton: (classNames) => classNames
}

export const defaultProps = {
  maxLives: 5,
  timePenalty: 100,
  mode: 2,
  classNames: {}
}

/**
 * Keys for "countersPropTypes" object.
 */
const counterKeys = ["score", "highScore", "lives", "penalty", "mode"]

/**
 * Value for each "countersPropTypes" key.
 */
const counterClassNamesExactShape = PropTypes.exact({
  container: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string
})

/**
 * className PropTypes for each rendered '*CodeRush.Counter*'. All "counterKeys"
 * with "counterClassNamesExactShape" as values.
 */
const countersPropTypes = counterKeys.reduce(
  (acc, item) => ({ ...acc, [item]: counterClassNamesExactShape }),
  {}
)

const classNamesPropTypes = PropTypes.exact({
  container: PropTypes.string,
  code: PropTypes.string,
  numPadAndStats: PropTypes.string,
  numPad: PropTypes.exact({
    container: PropTypes.string,
    buttons: PropTypes.string
  }),
  stats: PropTypes.exact({
    container: PropTypes.string,
    ...countersPropTypes,
    lives: PropTypes.exact({
      container: PropTypes.string,
      text: PropTypes.string,
      livesContainer: PropTypes.string,
      life: PropTypes.string
    })
  }),
  timerButton: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    }),
    progress: PropTypes.string
  })
})

export const propTypes = {
  timeout: PropTypes.number,
  code: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  attempt: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  score: PropTypes.number.isRequired,
  hiScores: PropTypes.objectOf(PropTypes.number).isRequired,
  livesLeft: PropTypes.number.isRequired,
  maxLives: PropTypes.number,
  timePenalty: PropTypes.number,
  mode: PropTypes.oneOf([1, 2, 3]),
  handleGameStart: PropTypes.func,
  handleGameOver: PropTypes.func,
  updateAttempt: PropTypes.func,
  loseLife: PropTypes.func,
  switchMode: PropTypes.func,
  classNames: classNamesPropTypes,
  codeProps: PropTypes.object,
  numPadAndStatsProps: PropTypes.object,
  numPadProps: PropTypes.object,
  statsProps: PropTypes.object,
  timerButtonProps: PropTypes.object
}
