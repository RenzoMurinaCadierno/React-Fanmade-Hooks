import PropTypes from "prop-types"
import styles from "./SlotsResultScreen.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  resultsContainer: (className) =>
    (className ?? "") + " " + styles.ResultsContainer,
  scoresSection: (classNames = {}) => classNames,
  statsSection: (classNames = {}) => classNames,
  button: (className) => (className ?? "") + " " + styles.Button
}

const requiredObjectOfArraysOfObjects = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
).isRequired

export const slotsResultScreenPropTypes = {
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
  classNames: PropTypes.shape({
    container: PropTypes.string,
    resultsContainer: PropTypes.string,
    scoresSection: PropTypes.object,
    statsSection: PropTypes.object,
    button: PropTypes.string
  })
}
