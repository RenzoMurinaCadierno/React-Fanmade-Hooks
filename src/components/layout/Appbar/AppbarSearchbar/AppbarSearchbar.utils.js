import PropTypes from "prop-types"
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

export const appbarSearchbarPropTypes = {
  onClick: PropTypes.func,
  searchIcon: PropTypes.string,
  clearIcon: PropTypes.string,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    inputField: PropTypes.shape({
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
