import { isValidElement } from "react"
import PropTypes from "prop-types"
import styles from "./Aura.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  aura: (isActive, type, blink, size, interval, isCircle, className) =>
    (className ?? "") +
    (isActive
      ? styles.BaseAnimation +
        " " +
        styles[getPascalCasedJoinedWords(blink, "Blink")] +
        " " +
        styles[getPascalCasedJoinedWords(size, "Size")] +
        " " +
        styles[getPascalCasedJoinedWords(interval, "Interval")]
      : "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (isCircle ? styles.Circular : "") +
    " " +
    styles.Aura
}

function getPascalCasedJoinedWords(...words) {
  return words.reduce(
    (acc, word) => (acc += word[0].toUpperCase() + word.slice(1).toLowerCase()),
    ""
  )
}

const validTypePropTypes = getCartesianProduct(
  ["primary", "secondary", "danger"],
  ["", 0, 1, 2]
)
test Proptypes and comment
export const auraPropTypes = {
  children: validateChildren,
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(validTypePropTypes),
  blink: PropTypes.oneOf(["short", "normal", "long"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
  interval: PropTypes.oneOf(["short", "normal", "long"]),
  isCircle: PropTypes.bool,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    aura: PropTypes.string
  }),
  otherAuraProps: PropTypes.object,
  otherProps: PropTypes.object
}

function validateChildren(props, propName, componentName) {
  const prop = props[propName]
  if (typeof prop === "undefined") return
  if (
    !prop ||
    (!isValidElement(prop) &&
      typeof prop !== "string" &&
      typeof prop !== "number")
  ) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected only one React Element.`
    )
  }
}

function getCartesianProduct(arr_1, arr_2, separator = "") {
  return arr_1
    .map((i) =>
      arr_2
        .reduce(
          (acc, j) => [
            ...acc,
            !j && typeof j === "string" ? i : i + separator + j
          ],
          []
        )
        .flat()
    )
    .flat()
}
