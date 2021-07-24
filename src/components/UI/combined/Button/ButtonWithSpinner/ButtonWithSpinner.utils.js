import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./ButtonWithSpinner.module.css"

export const classes = {
  button: (spinnerAnchor, className) =>
    styles.Button +
    cn.get(className) +
    cn.if(spinnerAnchor, styles[spinnerAnchor?.toLowerCase()]),
  spinner: (children, spinnerAnchor, classNames = {}) => ({
    ...classNames,
    container:
      styles.Spinner +
      cn.get(classNames?.container) +
      cn.if(spinnerAnchor && children, styles[spinnerAnchor?.toLowerCase()])
  })
}

export const defaultProps = { spinnerAnchor: "left", classNames: {} }

export const propTypes = {
  showSpinner: PropTypes.bool,
  spinnerAnchor: PropTypes.oneOf(["top", "right", "bottom", "left"]),
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "primary-1",
    "secondary-1",
    "danger-1"
  ]),
  children: PropTypes.node,
  classNames: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    })
  }),
  spinnerProps: PropTypes.object
}
