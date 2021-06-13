import PropTypes from "prop-types"
import styles from "./InputWithValidation.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  input: (className) => (className ?? "") + " " + styles.Input,
  inputStyled: (classNames) => ({
    ...classNames,
    container: (classNames?.container ?? "") + " " + styles.Input
  })
}

export const defaultProps = {
  useInputHandlersProps: {},
  useInputHandlersConfigs: {},
  classNames: {},
  containerProps: {},
  inputProps: {}
}

export const propTypes = {
  useInputHandlersProps: PropTypes.object,
  useInputHandlersConfigs: PropTypes.object,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    input: PropTypes.string,
    inputStyled: PropTypes.exact({
      container: PropTypes.string,
      label: PropTypes.string,
      input: PropTypes.string,
      underline: PropTypes.string
    })
  }),
  containerProps: PropTypes.object,
  inputProps: PropTypes.object
}
