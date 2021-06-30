import PropTypes from "prop-types"
import styles from "./CodeRushStats.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  score: (classNames) => classNames,
  highScore: (classNames) => classNames,
  lives: (classNames) => classNames,
  level: (classNames) => classNames,
  penalty: (classNames) => classNames,
  mode: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.Mode
  })
}

export const defaultProps = { classNames: {} }

const counterKeys = ["score", "highScore", "lives", "penalty", "mode"]
const counterClassNamesExactShape = PropTypes.exact({
  container: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.string
})

const countersPropTypes = counterKeys.reduce(
  (acc, item) => ({ ...acc, [item]: counterClassNamesExactShape }),
  {}
)

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    ...countersPropTypes,
    lives: PropTypes.exact({
      container: PropTypes.string,
      text: PropTypes.string,
      livesContainer: PropTypes.string,
      life: PropTypes.string
    })
  })
}

export const textProps = { noMargin: true }

export const smallCounterProps = {
  textProps: { htmlElem: "h6", style: { marginBottom: "unset" } },
  valueProps: { htmlElem: "p", bold: true }
}

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

export function getLevelValue(score, difficulty, livesLeft) {
  if (!livesLeft) return 1
  let level = Math.floor(score / (5 - difficulty)) + 1
  return level >= 12 ? 11 : level
}

export function getTimePenaltyValue(score, mode, livesLeft) {
  if (!livesLeft) return "0ms"
  const level = Math.floor(score / (5 - mode)) + 1
  return level <= 2 ? "0ms" : `-${(level - 2) * 50}ms`
}

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
