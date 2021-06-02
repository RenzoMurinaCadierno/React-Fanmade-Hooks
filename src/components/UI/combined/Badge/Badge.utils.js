import PropTypes from "prop-types"
import styles from "./Badge.module.css"

export const classes = {
  container: (
    size,
    anchor,
    type,
    typeBackground,
    fontVariant,
    noBorder,
    mountCN,
    unmountCN,
    onChangeCN,
    className
  ) =>
    (className ?? "") +
    " " +
    (size ? styles[size.toLowerCase()] : "") +
    " " +
    (anchor
      ? anchor
          .split("-")
          .map((a) => styles[a.toLowerCase()])
          .join(" ")
      : "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (fontVariant ? styles[fontVariant.toLowerCase()] : "") +
    " " +
    (typeBackground && type ? styles.TypeBackground : "") +
    " " +
    (noBorder && type ? styles.NoBorder : "") +
    " " +
    mountCN +
    " " +
    unmountCN +
    " " +
    onChangeCN +
    " " +
    styles.Container,
  content: (className) => (className ?? "") + " " + styles.Content,
  animateMount: styles.AnimateMount,
  animateUnmount: styles.AnimateUnmount,
  animateOnChange: styles.AnimateOnChange
}

const xAnchors = ["top", "bottom"]
const yAnchors = ["left", "right"]
const xyAnchors = getDistribution(xAnchors, yAnchors)
const anchorDistances = ["close", "closest", "far", "farthest"]
const anchorPropTypesOneOfArray = [
  ...xAnchors,
  ...yAnchors,
  ...xyAnchors,
  ...getDistribution(xAnchors, anchorDistances),
  ...getDistribution(yAnchors, anchorDistances),
  ...getDistribution(xyAnchors, anchorDistances)
]

const baseTypes = ["primary", "secondary", "danger"]
const typeVariations = ["", "0", "1"]
const typePropTypesOneOfArray = getDistribution(baseTypes, typeVariations)

export const badgePropTypes = {
  show: PropTypes.bool,
  content: PropTypes.node,
  size: PropTypes.oneOf(["smallest", "small", "medium", "large", "largest"]),
  anchor: PropTypes.oneOf(anchorPropTypesOneOfArray),
  type: PropTypes.oneOf(typePropTypesOneOfArray),
  typeBackground: PropTypes.bool,
  fontVariant: PropTypes.oneOf(["sm", "p", "h1", "h2", "h3", "h4", "h5", "h6"]),
  noBorder: PropTypes.bool,
  animateOn: PropTypes.node,
  onMount: PropTypes.func,
  onUnmount: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    content: PropTypes.string
  })
}

/**
 * Combines each element on `arrFactor1` with each element on `arrayFactor2`,
 * joining each instance with `jointString`.
 *
 * E.g.:
 * * arrFactor1 = ["blue", "red", "green"]
 * * arrFactor2 = ["cat", "dog"]
 * * < ["blue-cat", "blue-dog", "red-cat", "red-dog", "green-cat", "green-dog"]
 *
 * @param {String[]} arrFactor1 Strings to use up front on each combination
 * @param {String[]} arrFactor2 Strings append to each element of `arrayFactor1`
 * @param {string} jointString String to use in the middle of each factor
 *   combination. Defaults to "-".
 *
 * @returns {String[]} Resulting array of combined elements
 */
function getDistribution(arrFactor1, arrFactor2, jointString = "-") {
  return arrFactor1.flatMap((term1) =>
    arrFactor2.map((term2) => (term2 ? term1 + jointString + term2 : term1))
  )
}
