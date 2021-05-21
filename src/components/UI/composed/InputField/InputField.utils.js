import PropTypes from "prop-types"
import styles from "./InputField.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  input: (className) => (className ?? "") + " " + styles.Input,
  label: (className) => (className ?? "") + " " + styles.Label
}

export const inputFieldPropTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  selfControlled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSubmit: PropTypes.func,
  style: PropTypes.object,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string
  })
}