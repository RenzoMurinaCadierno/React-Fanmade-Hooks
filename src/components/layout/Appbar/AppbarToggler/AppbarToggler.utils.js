import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./AppbarToggler.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  toggler: (isActive, animate, className) =>
    cnp.default(styles.Toggler, className) +
    cnp.if(isActive, styles.Active) +
    cnp.if(animate, styles.Animate)
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
