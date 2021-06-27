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
