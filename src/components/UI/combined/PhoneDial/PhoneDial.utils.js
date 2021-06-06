import PropTypes from "prop-types"
import styles from "./PhoneDial.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  button: (className) => (className ?? "") + " " + styles.Button
}

export const defaultProps = { buttonProps: {} }

/**
 * Array of a sub-arrays, each with a button name as first element ('one',
 * 'two', ..., 'hash') and its representation as second one ('1', '2', ...,
 * '#').
 */
export const buttons = [
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
  ["star", "*"],
  ["zero", "0"],
  ["hash", "#"]
]

// { one: PropTypes.object, two: PropTypes.object, ..., hash: PropTypes.object }
const buttonPropsShape = PropTypes.shape(
  buttons.reduce(
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
  buttonProps: buttonPropsShape
}
