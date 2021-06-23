import PropTypes from "prop-types"
import styles from "./ButtonWithSpinner.module.css"

export const classes = {
  button: (spinnerAnchor, className) =>
    (className ?? "") +
    " " +
    (spinnerAnchor ? styles[spinnerAnchor.toLowerCase()] : "") +
    " " +
    styles.Button,
  spinner: (children, spinnerAnchor, classNames = {}) => ({
    ...classNames,
    container:
      (classNames.container ?? "") +
      " " +
      (spinnerAnchor && children ? styles[spinnerAnchor.toLowerCase()] : "") +
      " " +
      styles.Spinner
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
