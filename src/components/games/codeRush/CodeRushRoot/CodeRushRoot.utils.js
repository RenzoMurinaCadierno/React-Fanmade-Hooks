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

export const defaultProps = { classNames: {} }

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
