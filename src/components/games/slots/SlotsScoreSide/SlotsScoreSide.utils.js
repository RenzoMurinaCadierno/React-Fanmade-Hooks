import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsScoreSide.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  item: (classNames) => classNames,
  image: (className) => cnp.default(styles.Image, className)
}

export const defaultProps = { scoreData: {}, classNames: {} }

const requiredArrayOfArraysOfStrings = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.string).isRequired
).isRequired

const scoreDataShape = PropTypes.shape({
  1: PropTypes.number,
  2: PropTypes.number,
  3: PropTypes.number,
  multiplier: PropTypes.number.isRequired
})

export const propTypes = {
  items: requiredArrayOfArraysOfStrings,
  badgesProps: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
  propThatTriggersScoreEffect: PropTypes.string.isRequired,
  badgeEffectImgSrcArray: requiredArrayOfArraysOfStrings,
  scoreData: PropTypes.objectOf(scoreDataShape),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    item: PropTypes.exact({
      container: PropTypes.string,
      badge: PropTypes.object
    }),
    image: PropTypes.string
  })
}
