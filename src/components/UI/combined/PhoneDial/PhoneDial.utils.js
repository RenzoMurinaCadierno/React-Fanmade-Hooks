import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./PhoneDial.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  button: (className) => styles.Button + cn.get(className)
}

export const defaultProps = { buttonProps: {} }

/**
 * Dial numbers' names
 */
export const NAMES = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "star",
  "zero",
  "hash"
]

/**
 * Dial numbers' values
 */
export const VALUES = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "*",
  "0",
  "#"
]

/**
 * Array of a sub-arrays, each with a button name as first element ('one',
 * 'two', ..., 'hash') and its representation as second one ('1', '2', ...,
 * '#').
 */
export const BUTTONS = NAMES.map((name, i) => [name, VALUES[i]])
// export const buttons = [
//   ["one", "1"],
//   ["two", "2"],
//   ["three", "3"],
//   ["four", "4"],
//   ["five", "5"],
//   ["six", "6"],
//   ["seven", "7"],
//   ["eight", "8"],
//   ["nine", "9"],
//   ["star", "*"],
//   ["zero", "0"],
//   ["hash", "#"]
// ]

// { one: PropTypes.object, two: PropTypes.object, ..., hash: PropTypes.object }
const buttonPropsShape = PropTypes.shape(
  BUTTONS.reduce(
    (acc, [buttonName]) => ({ ...acc, [buttonName]: PropTypes.object }),
    {}
  )
)

export const propTypes = {
  classNames: PropTypes.exact({
    container: PropTypes.string,
    buttons: PropTypes.string
  }),
  onButtonClick: PropTypes.func,
  buttonProps: buttonPropsShape,
  genericButtonProps: PropTypes.object
}
