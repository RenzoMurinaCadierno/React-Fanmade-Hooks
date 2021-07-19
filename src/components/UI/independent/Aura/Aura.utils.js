import { isValidElement } from "react"
import PropTypes from "prop-types"
import styles from "./Aura.module.css"

export const classes = {
  container: (className) =>
    (className ? className + " " : "") + styles.Container,
  aura: (isActive, type, blink, size, interval, inheritBoxShape, className) =>
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
    (inheritBoxShape ? styles.InheritBoxShape : "") +
    " " +
    styles.Aura
}

export const defaultProps = {
  isActive: true,
  type: "primary",
  blink: "normal",
  size: "normal",
  interval: "normal",
  classNames: {},
  auraProps: {}
}

/**
 * Pascal-cases each string in `words` and returns all of them joined together.
 *
 * @param  {...Array} words Array of strings to pascal-case.
 *
 * @returns {string} The joint string of all resulting pascal-cased words.
 */
function getPascalCasedJoinedWords(...words) {
  return words.reduce(
    (acc, word) => (acc += word[0].toUpperCase() + word.slice(1).toLowerCase()),
    ""
  )
}

const validTypePropTypes = getCartesianProduct(
  ["primary", "secondary", "danger"],
  ["", 0, 1, 2],
  "-"
)

export const propTypes = {
  children: validateChildren,
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(validTypePropTypes),
  blink: PropTypes.oneOf(["short", "normal", "long"]),
  size: PropTypes.oneOf(["small", "normal", "large"]),
  interval: PropTypes.oneOf(["short", "normal", "long"]),
  inheritBoxShape: PropTypes.bool,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    aura: PropTypes.string
  }),
  auraProps: PropTypes.object,
  otherProps: PropTypes.object
}

/**
 * Tests for `children` being only one React.Element, string or number.
 *
 * Throws a "PropType" error if validation fails.
 *
 * @param {object} props '*Aura*' `props`
 * @param {string} propName `children`
 * @param {string} componentName 'Aura'
 */
function validateChildren(props, propName, componentName) {
  const children = props[propName]
  if (typeof children === "undefined") return
  if (
    !children ||
    (!isValidElement(children) &&
      typeof children !== "string" &&
      typeof children !== "number")
  ) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to '*${componentName}*'.\n\nExpected only one React Element, string or number.\n`
    )
  }
}

/**
 * Combines each element in `arr_1` with each element in `arr_2` and returns an
 * array with the results.
 *
 * If `separator` is defined, it will be applied between each combination,
 * unless the iterated element in `arr_2` is an empty string.
 *
 * Examples:
 * > * **>>** `arr_1` = ["a", "b", "c"]; `arr_2` = ["d", "e"]
 * > * **<<** ["ad", "ae", "bd", "be", "cd", "ce"]
 *
 * > * **>>** `arr_1` = ["a", "b", "c"]; `arr_2` = ["1", ""]; `separator` = "-"
 * > * **<<** ["a-1", "a", "b-1", "b", "c-1", "c"]
 *
 * @param {Array} arr_1 Elements to combine with the ones in `arr_2`.
 * @param {Array} arr_2 Elements to append to each element in `arr_1`.
 * @param {string} separator String to add in the middle of each resulting
 *   combination of elements. Defaults to "" (adds nothing in-between).
 *
 * @returns {Array} an array with all combinations between elements of `arr_1`
 *   and `arr_2`.
 */
function getCartesianProduct(arr_1, arr_2, separator = "") {
  return arr_1.flatMap((it_1) =>
    arr_2
      .reduce(
        (acc, it_2) => [
          ...acc,
          !it_2 && typeof it_2 === "string" ? it_1 : it_1 + separator + it_2
        ],
        []
      )
      .flat()
  )
}
