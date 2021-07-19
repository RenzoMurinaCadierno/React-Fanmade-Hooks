import PropTypes from "prop-types"
import defaultSearchSVG from "assets/icons/search.svg"
import defaultCrossSVG from "assets/icons/cross.svg"
import styles from "./AppbarSearchbar.module.css"

export const classes = {
  container: (className) =>
    (className ? className + " " : "") + styles.Container,
  input: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.Input
  }),
  icon: (isInputEmpty, className) =>
    (className ?? "") +
    " " +
    (isInputEmpty ? "" : styles.Animate) +
    " " +
    styles.Icon
}

export const defaultProps = {
  searchIcon: defaultSearchSVG,
  clearIcon: defaultCrossSVG,
  classNames: {},
  iconProps: {},
  inputProps: {}
}

export const propTypes = {
  onClick: PropTypes.func,
  searchIcon: PropTypes.string,
  clearIcon: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    input: PropTypes.exact({
      container: PropTypes.string,
      input: PropTypes.string,
      label: PropTypes.string
    }),
    icon: PropTypes.string
  }),
  iconProps: PropTypes.object,
  inputProps: PropTypes.object,
  otherProps: PropTypes.object
}
