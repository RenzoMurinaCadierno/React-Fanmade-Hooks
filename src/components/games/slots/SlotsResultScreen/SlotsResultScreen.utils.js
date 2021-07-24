import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsResultScreen.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  resultsContainer: (className) =>
    cnp.default(styles.ResultsContainer, className),
  scoresSection: (classNames = {}) => classNames,
  statsSection: (classNames = {}) => classNames,
  button: (className) => cnp.default(styles.Button, className)
}

export const defaultProps = { classNames: {} }

const requiredObjectOfArraysOfObjects = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
).isRequired

export const propTypes = {
  show: PropTypes.bool,
  imagesObj: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string.isRequired).isRequired)
      .isRequired
  ).isRequired,
  scoreData: PropTypes.objectOf(
    PropTypes.shape({
      1: PropTypes.number,
      2: PropTypes.number,
      3: PropTypes.number,
      multiplier: PropTypes.number.isRequired
    })
  ),
  scoresBadgesProps: requiredObjectOfArraysOfObjects,
  statsBadgesProps: requiredObjectOfArraysOfObjects,
  onRestartButtonClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    resultsContainer: PropTypes.string,
    scoresSection: PropTypes.object,
    statsSection: PropTypes.object,
    button: PropTypes.string
  })
}
