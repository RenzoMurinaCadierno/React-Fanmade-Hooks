import PropTypes from "prop-types"
import defaultSearchSVG from "assets/icons/search.svg"
import defaultCrossSVG from "assets/icons/cross.svg"
import styles from "./AppbarSearchbar.module.css"
import { cn } from "utils/utilityFunctions"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  input: (classNames = {}) => ({
    ...classNames,
    container: styles.Input + cn.get(classNames?.container)
  }),
  icon: (isInputEmpty, className) =>
    styles.Icon + cn.get(className) + cn.if(!isInputEmpty, styles.Animate)
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
