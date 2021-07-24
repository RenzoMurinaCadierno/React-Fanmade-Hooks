import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./AppbarRoot.module.css"

export const classes = {
  container: (isOpen, className) =>
    styles.Container + cn.get(className) + cn.if(isOpen, styles.Open),
  toggler: (classNames) => classNames,
  modal: (classNames) => classNames,
  searchbar: (className) => className,
  content: (className) => styles.Content + cn.get(className),
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
