import PropTypes from "prop-types"
import styles from "./AppbarRoot.module.css"

export const classes = {
  container: (isOpen, className) =>
    (className ?? "") +
    " " +
    (isOpen ? styles.Open : "") +
    " " +
    styles.Container,
  toggler: (classNames) => classNames,
  modal: (classNames) => classNames,
  searchbar: (className) => className,
  content: (className) => (className ?? "") + " " + styles.Content,
  homeIcon: (classNames) => classNames
}

export const appbarPropTypes = {
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
