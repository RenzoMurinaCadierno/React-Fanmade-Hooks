import PropTypes from "prop-types"
import styles from "./ButtonWithSpinner.module.css"

export const classes = {
  button: (className) => (className ?? "") + " " + styles.Container,
  spinner: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.Spinner
  })
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  showSpinner: PropTypes.bool,
  children: PropTypes.node.isRequired,
  classNames: PropTypes.exact({
    button: PropTypes.string,
    spinner: PropTypes.exact({
      container: PropTypes.string,
      dot: PropTypes.string
    })
  }),
  spinnerProps: PropTypes.object
}
