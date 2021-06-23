import PropTypes from "prop-types"
import styles from "./ButtonWithProgress.module.css"

export const classes = {
  container: (className) => className,
  buttonWithProgress: (classNames = {}) => ({
    button: (classNames.button ?? "") + " " + styles.Button,
    spinner: classNames.spinner
  }),
  progress: (className) => className
}

export const defaultProps = {
  classNames: {},
  containerProps: {},
  progressProps: {}
}

export const propTypes = {
  showProgress: PropTypes.bool,
  min: PropTypes.number,
  value: PropTypes.number,
  max: PropTypes.number,
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
