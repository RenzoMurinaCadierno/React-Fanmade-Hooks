import PropTypes from "prop-types"
import styles from "./CodeRushTimerButton.module.css"

export const classes = {
  timerButton: (classNames = {}) => ({
    button: (classNames.button ?? "") + styles.Button,
    spinner: classNames.spinner,
    progress: classNames.progress
  })
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  timeout: PropTypes.number.isRequired,
  mode: PropTypes.oneOf([1, 2, 3]).isRequired,
  livesLeft: validatePositiveInteger,
  maxLives: validateMaxLives,
  timePenalty: validatePositiveInteger,
  score: validatePositiveInteger,
  onGameStart: PropTypes.func.isRequired,
  onLifeLost: PropTypes.func.isRequired,
  onGameOver: PropTypes.func.isRequired,
  classNames: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    }),
    progress: PropTypes.string
  })
}

/**
 * Returns `true` if `value` is an integer higher or equal to 0.
 *
 * @param {any} value The value to test
 */
function isPositiveInteger(value) {
  return Number.isInteger(value) && value >= 0
}

/**
 * Validates if target prop is an integer higher or equal to 0.
 *
 * Throws a prop type error if check fails.
 *
 * @param {object} props '*CodeRush.TimerButton*' `props`.
 *
 * @param {string} propName '*CodeRush.TimerButton*' prop being validated.
 *
 * @param {string} cmpName 'CodeRushTimerButton'.
 */
function validatePositiveInteger(props, propName, cmpName) {
  const targetProp = props[propName]

  if (targetProp === undefined) return

  if (!isPositiveInteger(targetProp)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${cmpName}.\n\nIt must be an integer higher or equal to 0.\n`
    )
  }
}

/**
 * Validates `maxLives` being an integer higher than 0 and less than 99.
 *
 * @param {object} props '*CodeRushLives*' `props`.
 *
 * @param {string} propName `props.maxLives`.
 *
 * @param {string} cmpName '*CodeRushLives*'.
 */
function validateMaxLives(props, propName, cmpName) {
  const maxLives = props[propName]

  if (maxLives === undefined) return // undefined is accepted (first render)

  if (!isPositiveInteger(maxLives) || maxLives > 99) {
    return new Error(
      `Invalid prop ${propName} supplied to ${cmpName}.\n\nIt must be an integer between 0 and 99, both inclusive.\n`
    )
  }
}

/**
 * Returns the time to use as `timeout` for '*useLatency*', and to calculate
 * '*ButtonWithProgress*' `max`, `value` and `type`.
 *
 * It will be higher on lower `mode` values (lower difficulty), and
 * decreases by `timePenalty` multipled the `level` the game state is at.
 *
 * @param {number} timeout '*CodeRush.TimerButton*' `timeout`. The time in ms
 *   until '*useLatency*' releases.
 *
 * @param {number} score '*CodeRush.TimerButton*' `score`. Current game's
 *   "score" state.
 *
 * @param {number} mode '*CodeRush.TimerButton*' `mode`, the game's difficulty
 *   level. Ehtier 1, 2 or 3.
 *
 * @param {number} timePenalty '*CodeRush.TimerButton*' `timePenalty`. The
 *   amount of milliseconds to substract to `timeout` according to current
 *   game level and `mode`.
 */
export function getTimeoutForLevel(timeout, score, mode, timePenalty) {
  const level = Math.floor(score / (5 - mode)) + 1

  return level <= 2 ? timeout : timeout - (level - 2) * timePenalty
}

/**
 * Returns the text to display as children of '*Button.WithProgress*'.
 *
 * It is related to texts in '*CodeRush.constants*' when (1) game is inactive,
 * (2) a restart is being prompted, (3) when 'last stand' time is active.
 *
 * When game is active while not at a restart prompt or at 'last stand' time,
 * the formatted value of current '*useLatency*' `elapsedMs` is returned.
 *
 * @param {boolean} promptRestart "isPromptingRestart".
 *
 * @param {boolean} isLatencyActive '*useLatency*' "isActive".
 *
 * @param {number} elapsedMs '*useLatency*' "elapsedMs".
 *
 * @param {number} timeout Net timeout, calculated by "getTimeoutForLevel".
 *
 * @param {object} texts Object with keys 'PROMPT_RESTART', 'BONUS_TIME' and
 *   'START_GAME', each containing the strings to return at those game states.
 */
export function getButtonText(
  promptRestart,
  isLatencyActive,
  elapsedMs,
  timeout,
  texts
) {
  const { PROMPT_RESTART, BONUS_TIME, START_GAME } = texts

  if (promptRestart) return PROMPT_RESTART

  if (isLatencyActive) {
    return getFormattedCountdown(elapsedMs, timeout, BONUS_TIME)
  }

  return START_GAME
}

/**
 * Returns '*Button.WithProgress*' `type`. It will be: (1) 'secondary' if a
 * game restart is being promted, (2) 'danger' on 'last stand' time, or (3)
 * 'primary' at any other case.
 *
 * @param {boolean} promptRestart "isPromptingRestart".
 *
 * @param {number} elapsedMs '*useLatency*' "elapsedMs".
 *
 * @param {number} timeout Net timeout, calculated by "getTimeoutForLevel".
 */
export function getButtonType(promptRestart, elapsedMs, timeout) {
  if (promptRestart) return "secondary"
  if (elapsedMs > timeout) return "danger"
  return "primary"
}

/**
 * Returns the difference -delta- between `timeout` (the maximum value for
 * '*useLatency*' timeout) and `elapsedMs` ('*useLatency*' `elapsedMs`),
 * formatted in a human-friendly way.
 *
 * If 'last stand' time is active (that when difference is a negative value),
 * `bonusTime` will be prepended to the result.
 *
 * Examples:
 *
 * * `delta = 100` results in "0:100"
 * * `delta = 1900` results in "1:900"
 * * `delta = -11500` and `bonusText = 'Bonus!'` results in "Bonus! 11:500"
 *
 * @param {number} elapsedMs '*useLatency*' "elapsedMs".
 *
 * @param {number} timeout Net timeout, calculated by "getTimeoutForLevel".
 *
 * @param {string} bonusText The string to prepend when delta is negative
 *   (when 'last stand' time is active).
 */
function getFormattedCountdown(elapsedMs, timeout, bonusText) {
  const delta = timeout - elapsedMs
  const rawRemaningMs = delta <= 0 ? delta + timeout : delta
  const remainingSecs = Math.floor(rawRemaningMs / 1000).toString()
  const remainingMs = rawRemaningMs % 1000
  const stringifiedTime = remainingSecs + ":" + addTrailingZeros(remainingMs)

  return delta > 0 ? stringifiedTime : bonusText + " " + stringifiedTime
}

/**
 * Returns a stringified version of `number` with "0"s appended to it up until
 * `desiredLength` matches `number.length`.
 *
 * Example:
 *
 * * `number = 518` and `desiredLength = 5` results in "51800".
 * * `number = 518` and `desiredLength = 3` results in "518".
 *
 * @param {number} number The number to stringify and append "0"s to.
 *
 * @param {number} desiredLength The desired length of the final number. "0"s
 *   will be appended to `number` up until `desiredLength` matches
 *   `number.length`.
 */
function addTrailingZeros(number, desiredLength = 3) {
  let strNum = number.toString()

  while (strNum.length < desiredLength) strNum += "0"

  return strNum
}
