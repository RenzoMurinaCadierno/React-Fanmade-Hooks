import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./CodeRushStats.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  score: (classNames) => classNames,
  highScore: (classNames) => classNames,
  lives: (classNames) => classNames,
  level: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.Level, classNames?.container)
  }),
  penalty: (classNames) => classNames,
  mode: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.Mode, classNames?.container)
  })
}

export const defaultProps = { classNames: {} }

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

export const propTypes = {
  mode: PropTypes.oneOf([1, 2, 3]).isRequired,
  switchMode: PropTypes.func,
  score: PropTypes.number.isRequired,
  hiScores: PropTypes.exact({
    1: PropTypes.number, // easy
    2: PropTypes.number, // normal
    3: PropTypes.number // hard
  }),
  maxLives: PropTypes.number.isRequired,
  livesLeft: PropTypes.number.isRequired,
  timePenalty: PropTypes.number.isRequired,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    ...countersPropTypes,
    lives: PropTypes.exact({
      container: PropTypes.string,
      text: PropTypes.string,
      livesContainer: PropTypes.string,
      life: PropTypes.string
    })
  }),
  scoreProps: PropTypes.object,
  hiScoresProps: PropTypes.object,
  livesProps: PropTypes.object,
  levelProps: PropTypes.object,
  penaltyProps: PropTypes.object,
  modeProps: PropTypes.object
}

/**
 * `textProps` and `valueProps` to spread in '*CodeRush.Counter*' in order to
 * shrink its size.
 */
export const smallCounterProps = {
  textProps: {
    htmlElem: "h6",
    style: { marginBottom: "unset" }
  },
  valueProps: { htmlElem: "p", bold: true }
}

/**
 * Returns `textProps` and `valueProps` to spread in 'mode'
 * '*CodeRush.Counter*', which correlates to `smallCounterProps` and
 * dynamically changes its `type` given `mode`.
 *
 * @param {number} mode '*CodeRush*' `difficulty` (1, 2, 3).
 */
export function getDefaultModeProps(mode) {
  return {
    textProps: {
      ...smallCounterProps.textProps,
      type: getTextTypeFromMode(mode)
    },
    valueProps: {
      ...smallCounterProps.valueProps,
      type: getTextTypeFromMode(mode, true)
    }
  }
}

/**
 * Returns 'level' '*CodeRush.Counter*' `value`. The game level given current
 * `score` and `mode`.
 *
 * @param {number} score Currently archieved "score".
 * @param {number} mode 1, 2 or 3 (easy, normal and hard, respectively).
 * @param {number} livesLeft The remaining lives on the given game state.
 *
 * @returns {number} On an inactive game (`!livesLeft`), it returns `1`.
 *   Otherwise, 'level' starts as 1 and increases by `1` each 4 correct answers
 *   on 'easy', each 3 correct answers on 'normal' and 2 on 'hard'.
 */
export function getLevelValue(score, mode, livesLeft) {
  if (!livesLeft) return 1

  const level = Math.floor(score / (5 - mode)) + 1

  return level >= 99 ? 99 : level
}

/**
 * Returns 'penalty' '*CodeRush.Counter*' `value`. The humanly-readable time
 * penalty to be substracted from timer on each level up.
 *
 * @param {number} score Currently archieved "score".
 * @param {number} mode 1, 2 or 3 (easy, normal and hard, respectively).
 * @param {number} livesLeft The remaining lives on the given game state.
 * @param {number} timePenaltyInMs time to substract on level up, in ms.
 *
 * @returns {string} On an inactive game (`!livesLeft`), it returns '0ms'.
 *   Otherwise, it starts as '0ms' and on each level up (except for the first
 *   one), it decreases by `timePenalty`.
 *
 * *Example:* Given `timePenaltyInMs = 100` :
 * * _Level 1:_ '0ms'
 * * _Level 2:_ '0ms' // <- handicap
 * * _Level 3:_ '-100ms'
 * * _Level 4:_ '-200ms'
 * * _Level 5:_ '-300ms'
 */
export function getTimePenaltyValue(score, mode, livesLeft, timePenaltyInMs) {
  if (!livesLeft) return "0ms"
  const level = Math.floor(score / (5 - mode)) + 1
  return level <= 2 ? "0ms" : `-${(level - 2) * timePenaltyInMs}ms`
}

/**
 * Returns 'mode' '*CodeRush.Counter*' `value`. The selected difficulty level.
 *
 * @param {number} mode 1, 2 or 3 (easy, normal and hard, respectively).
 *
 * @returns {string} 'Easy' on `mode === 1`, 'Normal' on `mode === 2`, or 'Hard'
 *   on `mode === 3`.
 */
export function getModeValue(mode) {
  switch (mode) {
    case 1:
      return "Easy"
    case 2:
      return "Normal"
    case 3:
      return "Hard"
    default:
      throw new Error("Invalid difficulty mode. Expected `1`, `2` or `3`.")
  }
}

/**
 * Given `mode`, it returns the correct `type` to be passed as `textProps` and
 * `valueProps` to 'mode' '*CodeRush.Counter*'.
 *
 * @param {number} mode 1, 2 or 3 (easy, normal and hard, respectively).
 * @param {boolean} isValueText `true` gets the `type` for 'value'
 *   '*CodeRush.Counter*' inner '*Text*', while `false`, for 'text' '*Text*'.
 *
 * @returns {string}
 * * `mode === 1`: `primary` (`isValueText === true`) or `primary-3`
 *   (`isValueText === false`).
 * * `mode === 2`: `secondary` or `secondary-3`, also given `isValueText`.
 * * `mode === 3`: `danger` or `danger-3`, same with `isValueText`.
 */
export function getTextTypeFromMode(mode, isValueText) {
  switch (mode) {
    case 1:
      return isValueText ? "primary" : "primary-3"
    case 2:
      return isValueText ? "secondary" : "secondary-3"
    case 3:
      return isValueText ? "danger" : "danger-3"
    default:
      throw new Error("Invalid difficulty mode. Expected `1`, `2` or `3`.")
  }
}
