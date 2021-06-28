import PropTypes from "prop-types"
import { PhoneDial } from "hub"
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

export const defaultProps = { maxLives: 5, classNames: {} }

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    code: PropTypes.string,
    numPadAndStats: PropTypes.string,
    numPad: PropTypes.exact({
      container: PropTypes.string,
      buttons: PropTypes.string
    }),
    stats: PropTypes.exact({
      container: PropTypes.string,
      score: PropTypes.exact({
        container: PropTypes.string,
        text: PropTypes.string,
        value: PropTypes.string
      }),
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
}

const digits = PhoneDial.VALUES // ['1', '2', '3', ..., '*']

export function getCode(score) {
  // socre + 1 due to this function triggering before "score" state updates
  const amountOfDigitsInCode = Math.floor((score + 1) / 2) + 2
  let code = []

  while (code.length < amountOfDigitsInCode) {
    const digit = digits[Math.floor(Math.random() * digits.length)]
    if (!code.includes(digit)) code = [...code, digit]
  }

  return code
}

export function haveExactValues(attempts, code) {
  if (!attempts.length || attempts.length !== code.length) return false
  if (attempts.some((value) => !code.includes(value))) return false
  return true
}
