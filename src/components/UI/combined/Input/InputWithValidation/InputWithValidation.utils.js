import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./InputWithValidation.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  input: (className) => cnp.default(styles.Input, className),
  inputStyled: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.Input, classNames?.container)
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
