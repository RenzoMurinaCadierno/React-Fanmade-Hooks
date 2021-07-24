import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./InputStyled.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  input: (className) => styles.Input + cn.get(className),
  label: (className) => styles.Label + cn.get(className)
}

export const styledInputPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string
  }),
  labelProps: PropTypes.object,
  underlineProps: PropTypes.object
}
