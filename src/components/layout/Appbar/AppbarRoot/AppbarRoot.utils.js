import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./AppbarRoot.module.css"

export const classes = {
  container: (isOpen, className) =>
    cnp.default(styles.Container, className) + cnp.if(isOpen, styles.Open),
  toggler: (classNames) => classNames,
  modal: (classNames) => classNames,
  searchbar: (className) => className,
  content: (className) => cnp.default(styles.Content, className),
  homeIcon: (classNames) => classNames
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  manualToggle: PropTypes.bool,
  animateToggler: PropTypes.bool,
  onTogglerClick: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onHomeIconClick: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    toggler: PropTypes.object,
    modal: PropTypes.object,
    searchbar: PropTypes.object,
    content: PropTypes.string,
    homeIcon: PropTypes.object
  })
}
