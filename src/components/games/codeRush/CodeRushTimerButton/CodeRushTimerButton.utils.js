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

export function getFormattedCountdown(ms, limit) {
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
