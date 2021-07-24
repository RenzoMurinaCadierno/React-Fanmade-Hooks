import PropTypes from "prop-types"
import { Text } from "hub"
import cnp from "styles/classNameProcessor"
import heartSVG from "assets/icons/heart.svg"
import styles from "./CodeRushLives.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  text: (className) => className,
  livesContainer: (className) => cnp.default(styles.LivesContainer, className),
  life: (className) => cnp.default(styles.Life, className),
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
  imgAlt: PropTypes.string,
  livesLeft: PropTypes.number.isRequired,
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

/**
 * Validates `maxLives` being an integer higher than 0 and less than 99.
 *
 * @param {object} props '*CodeRushLives*' `props`
 * @param {string} propName `props.maxLives`
 * @param {string} cmpName '*CodeRushLives*'
 */
function validateMaxLives(props, propName, cmpName) {
  const maxLives = props[propName]

  if (maxLives === undefined) return // undefined is accepted (first render)

  if (!Number.isInteger(maxLives) || maxLives < 0 || maxLives > 99) {
    return new Error(
      `Invalid prop ${propName} supplied to ${cmpName}.\n\nIt must be an integer between 0 and 99, both inclusive.\n`
    )
  }
}

/**
 * Returns the JSX to render inside "lives container" '*div*'.
 *
 * It can either be three 'life' '*img*'s on `livesLeft` <= 3, or one 'life'
 * '*img*' plus a '*Text*' with its multiplier ('x3', 'x5', 'x99').
 *
 * @param {number} maxLives Amount of initial lives at game start.
 * @param {number} livesLeft Amount of lives remaining.
 * @param {string} src Path to an SVG image.
 * @param {string} alt Alt for `src`.
 * @param {string?} className className string to add to 'life' '*img*'.
 * @param {object?} lifeProps additional props to spread in 'life' '*img*'.
 */
export function renderLives(
  maxLives,
  livesLeft,
  src,
  alt,
  className,
  lifeProps
) {
  if (livesLeft >= 4) {
    return (
      <>
        <img
          className={className + " " + getHeartBeatCN(livesLeft)}
          {...{ alt, src, ...lifeProps }}
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
        {...{ alt, src, ...lifeProps }}
      />
    ))
}

/**
 * Returns the animation `className` to append to 'life' '*img*', depending on
 * `livesLeft`.
 *
 * @param {number} livesLeft Amount of lives remaining.
 * @param {boolean} isDisabled `true` returns an empty string (no className).
 */
function getHeartBeatCN(livesLeft, isDisabled) {
  if (!isDisabled) {
    if (livesLeft >= 3) return classes.animateThreeOrMoreLives
    if (livesLeft === 2) return classes.animateLastTwoLives
    if (livesLeft === 1) return classes.animateLastLife
  }
  return ""
}
