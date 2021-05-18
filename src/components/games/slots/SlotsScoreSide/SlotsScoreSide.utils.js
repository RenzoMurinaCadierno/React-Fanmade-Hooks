import PropTypes from "prop-types"
import styles from "./SlotsScoreSide.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  item: (classNames) => classNames,
  image: (className) => (className ?? "") + " " + styles.Image
}

const requiredArrayOfArraysOfStrings = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.string).isRequired
).isRequired

const scoreDataShape = PropTypes.shape({
  1: PropTypes.number,
  2: PropTypes.number,
  3: PropTypes.number,
  multiplier: PropTypes.number.isRequired
})

export const slotsScoreSidePropTypes = {
  items: requiredArrayOfArraysOfStrings,
  badgesProps: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  propThatTriggersScoreEffect: PropTypes.string.isRequired,
  badgeEffectImgSrcArray: requiredArrayOfArraysOfStrings,
  scoreData: PropTypes.objectOf(scoreDataShape),
  classNames: PropTypes.shape({
    container: PropTypes.string,
    item: PropTypes.object,
    image: PropTypes.string
  })
}
