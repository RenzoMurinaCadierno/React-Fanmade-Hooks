import PropTypes from "prop-types"
import styles from "./AppbarSearchbar.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  inputField: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.InputField
  }),
  searchIcon: (className) => (className ?? "") + " " + styles.SearchIcon
}

export const appbarSearchbarPropTypes = {
  onClick: PropTypes.func,
  searchIcon: PropTypes.string,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    inputField: PropTypes.shape({
      container: PropTypes.string,
      input: PropTypes.string,
      label: PropTypes.string
    }),
    searchIcon: PropTypes.string
  }),
  searchIconProps: PropTypes.object,
  inputFieldProps: PropTypes.object,
  otherProps: PropTypes.object
}
