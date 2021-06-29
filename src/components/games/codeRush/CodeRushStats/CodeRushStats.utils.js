import PropTypes from "prop-types"
import styles from "./CodeRushStats.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  score: (classNames) => classNames,
  lives: (classNames) => classNames
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  classNames: PropTypes.exact({
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
  })
}

export const textProps = { noMargin: true }

export const defaultPenaltyProps = {
  textProps: { htmlElem: "h6", style: { marginBottom: "unset" } },
  valueProps: { htmlElem: "p", bold: true }
}

export function getLevelValue(score, difficulty) {
  let level = Math.floor(score / (5 - difficulty)) + 1
  return level >= 12 ? 11 : level
}

export function getTimePenalty(score, difficulty) {
  const level = Math.floor(score / (5 - difficulty)) + 1
  // return level <= 2 ? "0ms" : `-${(level - 2) * 50}ms`
  return `-${(level - 2) * 50}ms`
}
