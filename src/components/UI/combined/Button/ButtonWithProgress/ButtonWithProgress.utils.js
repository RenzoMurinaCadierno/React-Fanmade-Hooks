import PropTypes from "prop-types"
import styles from "./ButtonWithProgress.module.css"

export const classes = {
  buttonWithSpinner: (classNames = {}) => ({
    button: (classNames.button ?? "") + " " + styles.Button,
    spinner: classNames.spinner
  }),
  progress: (className) => className
}

export const defaultProps = { classNames: {}, progressProps: {} }

export const propTypes = {
  showProgress: PropTypes.bool,
  min: (props) => validateLimits(props.min, props.value, props.max, "min"),
  value: (props) => validateLimits(props.min, props.value, props.max, "value"),
  max: (props) => validateLimits(props.min, props.value, props.max, "max"),
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "primary-1",
    "secondary-1",
    "danger-1"
  ]),
  shrink: PropTypes.bool,
  classNames: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    }),
    progress: PropTypes.string
  })
}

function isInvalidNumber(num) {
  return typeof num !== "number" || Number.isNaN(num)
}

function getSharedMsg(variable, min, value, max, fillerString) {
  return `Invalid prop \`${variable}\` in \`ButtonWithProgress\`. It must be a defined number and cannot be ${fillerString}\n\nCurrent values:\n\n  > "min":   ${min}\n  > "value": ${value}\n  > "max":   ${max}\n`
}

function validateLimits(min, value, max, propName) {
  switch (propName) {
    case "min":
      if (isInvalidNumber(min) || min > value || min > max) {
        return new Error(
          getSharedMsg(
            propName,
            min,
            value,
            max,
            "higher than `value` or `max`."
          )
        )
      }
      break
    case "value":
      if (isInvalidNumber(value) || value < min || value > max) {
        return new Error(
          getSharedMsg(
            propName,
            min,
            value,
            max,
            "lower than `min` or higher than `max`."
          )
        )
      }
      break
    case "max":
      if (isInvalidNumber(value) || max < value || max < min) {
        return new Error(
          getSharedMsg(
            propName,
            min,
            value,
            max,
            "lower than `min` or lower than `value`."
          )
        )
      }
      break
    default:
      break
  }
}
