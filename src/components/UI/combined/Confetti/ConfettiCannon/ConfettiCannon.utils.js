import PropTypes from "prop-types"
import { Confetti } from "hub"
import cnp from "styles/classNameProcessor"
import styles from "./ConfettiCannon.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  relativeWrapper: (className) =>
    cnp.default(styles.RelativeWrapper, className),
  glitter: (classNames) => classNames
}

export const defaultProps = { quantity: 20, classNames: {} }

/**
 * All valid layout props of children components, used to generate random
 * outputs to randomize each paper piece's behavior.
 */
const layoutProps = {
  anchors: ["left", "right"],
  altitudes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  distances: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  rotateOrientations: ["forwards", "reverse"],
  rotateSpeeds: ["slowest", "slow", "medium", "fast", "fastest"]
}

const classNamesPropTypesShape = {
  container: PropTypes.string,
  relativeWrapper: PropTypes.string,
  glitter: PropTypes.exact({
    guides: PropTypes.exact({
      x: PropTypes.string, // '*Confetti.Guides.X*'
      y: PropTypes.string // '*Confetti.Guides.Y*'
    }),
    paperPiece: PropTypes.string // '*Confetti.PaperPiece*'
  })
}

export const propTypes = {
  anchor: PropTypes.oneOf(layoutProps.anchors),
  altitude: PropTypes.oneOf(layoutProps.altitudes),
  color: PropTypes.string,
  distance: PropTypes.oneOf(layoutProps.distances),
  quantity: validateQuantity,
  rotateOrientation: PropTypes.oneOf(layoutProps.rotateOrientations),
  rotateSpeed: PropTypes.oneOf(layoutProps.rotateSpeeds),
  classNames: PropTypes.exact(classNamesPropTypesShape),
  guidesProps: PropTypes.exact({ x: PropTypes.object, y: PropTypes.object }),
  paperPieceProps: PropTypes.object
}

function validateQuantity(props, propName, cmpName) {
  const quantity = props[propName]

  if (quantity === undefined) return

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return new TypeError(
      `Invalid prop \`${propName}\` with value \`${quantity}\` supplied to \`${cmpName}\`.\n\nExpected an integer higher than 0.\n`
    )
  }
}

/**
 * Given a 'layout' prop name used by '*Confetti*' `children`, it returns a
 * random valid value to pass to that prop.
 *
 * Layout props are:
 * * 'anchor', 'distance' (used by '*Confetti.Guides.X*')
 * * 'altitude' (used by '*Confetti.Guides.Y*')
 * * 'rotateSpeed', 'rotateOrientation' (used by '*Confetti.PaperPiece*')
 *
 * @param {string} propName The layout prop name to return a valid value for.
 */
function getRandomProp(propName) {
  return layoutProps[propName][
    Math.floor(Math.random() * layoutProps[propName].length)
  ]
}

/**
 * Generates and returns `props` to spread in '*Confetti.Glitter*' with all
 * defined props as is, and random values for each undefined 'layout' prop
 * used by '*Confetti*' `children`.
 *
 * Layout props are:
 * * 'anchor', 'distance' (used by '*Confetti.Guides.X*')
 * * 'altitude' (used by '*Confetti.Guides.Y*')
 * * 'rotateSpeed', 'rotateOrientation' (used by '*Confetti.PaperPiece*')
 *
 * @param {object} glitterProps '*Confetti.Glitter*' `props`
 */
function getProcessedGlitterProps({
  anchor,
  altitude,
  distance,
  rotateOrientation,
  rotateSpeed,
  ...otherProps
}) {
  return {
    anchor: anchor ?? getRandomProp("anchors"),
    altitude: altitude ?? getRandomProp("altitudes"),
    distance: distance ?? getRandomProp("distances"),
    rotateOrientation: rotateOrientation ?? getRandomProp("rotateOrientations"),
    rotateSpeed: rotateSpeed ?? getRandomProp("rotateSpeeds"),
    ...otherProps
  }
}

/**
 * Returns an array of '*Confetti.Glitter*', each with random 'layout' props to
 * be used by its children.
 *
 * Layout props are:
 * * 'anchor', 'distance' (used by '*Confetti.Guides.X*')
 * * 'altitude' (used by '*Confetti.Guides.Y*')
 * * 'rotateSpeed', 'rotateOrientation' (used by '*Confetti.PaperPiece*').
 *
 * **Note:** A 'layout' prop will be randomized only if it is undefined.
 *
 * @param {number} quantity The amount of '*Confetti.Glitter*' in the returned
 *   array.
 *
 * @param {object} classNames '*Confetti.Glitter*' `className`.
 *
 * @param {object} glitterProps Other props to spread in '*Confetti.Glitter*'.
 */
export function renderGlitter(quantity, classNames = {}, glitterProps) {
  return new Array(quantity)
    .fill(null)
    .map((_, i) => (
      <Confetti.Glitter
        key={i}
        classNames={classes.glitter(classNames)}
        {...getProcessedGlitterProps(glitterProps)}
      />
    ))
}
