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

export function getTimeoutForLevel(timeout, score, difficulty) {
  const level = Math.floor(score / (5 - difficulty)) + 1
  return level <= 2 ? timeout : timeout - (level - 2) * 50
}

export function getButtonText(
  promptRestart,
  isLatencyActive,
  elapsedMs,
  timeout
) {
  if (promptRestart) return "Tap to restart"
  if (isLatencyActive) return getFormattedCountdown(elapsedMs, timeout)
  return "Start game"
}

function getFormattedCountdown(ms, limit) {
  const delta = limit - ms
  const rawRemaningMs = delta < 0 ? 0 : delta
  const remainingSecs = Math.floor(rawRemaningMs / 1000).toString()
  const remainingMs = rawRemaningMs % 1000

  return remainingSecs + ":" + addTrailingZeros(remainingMs)
}

function addTrailingZeros(number, qtyOfZeros = 3) {
  let strNum = number.toString()

  while (strNum.length < qtyOfZeros) strNum += "0"

  return strNum
}
