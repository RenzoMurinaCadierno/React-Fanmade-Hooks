import PropTypes from "prop-types"
import defaultSearchSVG from "assets/icons/search.svg"
import defaultCrossSVG from "assets/icons/cross.svg"
import styles from "./AppbarSearchbar.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  inputField: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.InputField
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
  inputFieldProps: {}
}

export const propTypes = {
  onClick: PropTypes.func,
  searchIcon: PropTypes.string,
  clearIcon: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    inputField: PropTypes.exact({
      container: PropTypes.string,
      input: PropTypes.string,
      label: PropTypes.string
    }),
    icon: PropTypes.string
  }),
  iconProps: PropTypes.object,
  inputFieldProps: PropTypes.object,
  otherProps: PropTypes.object
}
