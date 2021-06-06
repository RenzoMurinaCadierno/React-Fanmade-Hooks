import PropTypes from "prop-types"
import styles from "./AppbarToggler.module.css"

export const classes = {
  container: (classNames) => (classNames ?? "") + " " + styles.Container,
  toggler: (isActive, animate, className) =>
    (className ?? "") +
    " " +
    (isActive ? styles.Active : "") +
    " " +
    (animate ? styles.Animate : "") +
    " " +
    styles.Toggler
}

export const defaultProps = { classNames: {}, togglerDisplayProps: {} }

export const propTypes = {
  isActive: PropTypes.bool,
  animate: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    toggler: PropTypes.string
  }),
  togglerDisplayProps: PropTypes.object,
  otherProps: PropTypes.object
}
