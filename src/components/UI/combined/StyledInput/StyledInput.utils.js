import PropTypes from "prop-types"
import styles from "./StyledInput.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  input: (className) => (className ?? "") + " " + styles.Input,
  label: (className) => (className ?? "") + " " + styles.Label
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
