import PropTypes from "prop-types"
import { Text } from "hub"
import heartSVG from "assets/icons/heart.svg"
import styles from "./CodeRushLives.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  text: (className) => className,
  livesContainer: (className) =>
    (className ?? "") + " " + styles.LivesContainer,
  life: (className) => (className ?? "") + " " + styles.Life,
  livesLeftText: styles.LivesLeftText,
  animateLifeLost: styles.AnimateLifeLost,
  animateThreeOrMoreLives: styles.AnimateThreeOrMoreLives,
  animateLastTwoLives: styles.AnimateLastTwoLives,
  animateLastLife: styles.AnimateLastLife
}

export const defaultProps = {
  imgSrc: heartSVG,
  imgAlt: "❤️",
  maxLives: 3,
  classNames: {}
}

export const propTypes = {
  imgSrc: PropTypes.string,
  maxLives: validateMaxLives,
  onLifeLost: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string,
    livesContainer: PropTypes.string,
    life: PropTypes.string
  }),
  textProps: PropTypes.object,
  livesContainerProps: PropTypes.object,
  lifeProps: PropTypes.object
}

function validateMaxLives(prop, propName, cmpName) {
  const maxLives = prop[propName]

  if (maxLives === undefined) return

  if (!Number.isInteger(maxLives) || maxLives < 0 || maxLives > 99) {
    return new Error(
      `Invalid prop ${propName} supplied to ${cmpName}.\n\nIt must be an integer between 0 and 99, both inclusive.\n`
    )
  }
}

export function renderLives(
  maxLives,
  livesLeft,
  src,
  alt,
  className,
  lifeProps
) {
  const sharedProps = { alt, src, ...lifeProps }

  if (livesLeft >= 4) {
    return (
      <>
        <img
          className={className + " " + getHeartBeatCN(livesLeft)}
          {...sharedProps}
        />
        <Text htmlElem="h6" type="primary-2" className={classes.livesLeftText}>
          x {livesLeft}
        </Text>
      </>
    )
  }

  return new Array(maxLives > 3 ? 3 : maxLives)
    .fill(null)
    .map((_, i) => (
      <img
        key={i}
        disabled={i >= livesLeft}
        className={className + " " + getHeartBeatCN(livesLeft, i >= livesLeft)}
        {...sharedProps}
      />
    ))
}

function getHeartBeatCN(livesLeft, isDisabled) {
  if (!isDisabled) {
    if (livesLeft >= 3) return classes.animateThreeOrMoreLives
    if (livesLeft === 2) return classes.animateLastTwoLives
    if (livesLeft === 1) return classes.animateLastLife
  }
  return ""
}
