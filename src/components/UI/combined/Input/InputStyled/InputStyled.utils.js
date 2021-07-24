import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./InputStyled.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  input: (className) => cnp.default(styles.Input, className),
  label: (className) => cnp.default(styles.Label, className)
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
