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
  classNames: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    }),
    progress: PropTypes.string
  })
}

export function getTimeoutForLevel(timeout, score, mode, timePenaltyInMs) {
  const level = Math.floor(score / (5 - mode)) + 1
  return level <= 2 ? timeout : timeout - (level - 2) * timePenaltyInMs
}

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

export function getButtonType(promptRestart, elapsedMs, timeout) {
  if (promptRestart) return "secondary"
  if (elapsedMs > timeout) return "danger"
  return "primary"
}

function getFormattedCountdown(ms, limit, bonusText) {
  const delta = limit - ms
  const rawRemaningMs = delta <= 0 ? delta + limit : delta
  const remainingSecs = Math.floor(rawRemaningMs / 1000).toString()
  const remainingMs = rawRemaningMs % 1000
  const stringifiedTime = remainingSecs + ":" + addTrailingZeros(remainingMs)

  return delta > 0 ? stringifiedTime : bonusText + " " + stringifiedTime
}

function addTrailingZeros(number, qtyOfZeros = 3) {
  let strNum = number.toString()

  while (strNum.length < qtyOfZeros) strNum += "0"

  return strNum
}
