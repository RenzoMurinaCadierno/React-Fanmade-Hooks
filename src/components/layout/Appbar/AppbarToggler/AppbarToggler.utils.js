import PropTypes from "prop-types"
import styles from "./AppbarToggler.module.css"

export const classes = {
  container: (classNames) => (classNames ?? "") + " " + styles.Container,
  toggler: (isActive, className) =>
    (className ?? "") +
    " " +
    (isActive ? styles.Active : "") +
    " " +
    styles.Toggler
}

export const appbarTogglerPropTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    toggler: PropTypes.string
  }),
  togglerDisplayProps: PropTypes.object,
  otherProps: PropTypes.object
}
