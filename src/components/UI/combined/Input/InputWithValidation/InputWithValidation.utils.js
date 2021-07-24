import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./InputWithValidation.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  input: (className) => styles.Input + cn.get(className),
  inputStyled: (classNames = {}) => ({
    ...classNames,
    container: styles.Input + cn.get(classNames?.container)
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
