import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./InputWithValidationBubbles.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  input: (className) => styles.InputContainer + cn.get(className),
  inputStyled: (classNames = {}) => ({
    ...classNames,
    container: styles.InputContainer + cn.get(classNames?.container)
  }),
  validationContainer: (anchor, className) =>
    styles.ValidationContainer +
    cn.get(className) +
    cn.if(anchor, styles[anchor?.toLowerCase()]),
  validationMessage: (className) => className,
  validationArrow: (anchor, type, className) =>
    styles.Pointer +
    cn.get(className) +
    cn.if(type, styles[type?.toLowerCase()]) +
    cn.if(anchor, styles[anchor?.toLowerCase()])
}

export const defaultProps = {
  useInputHandlersProps: {},
  useInputHandlersConfigs: {},
  validationContainerAnchor: "top",
  messageType: "secondary",
  classNames: {},
  containerProps: {},
  inputProps: {},
  validationContainerProps: {},
  validationArrowProps: {},
  validationMsgProps: {}
}

export const propTypes = {
  useInputHandlersProps: PropTypes.object,
  useInputHandlersConfigs: PropTypes.object,
  validationContainerAnchor: PropTypes.oneOf([
    "top",
    "right",
    "bottom",
    "left"
  ]),
  messageType: PropTypes.oneOf(["primary", "secondary", "danger"]),
  hideBubbles: PropTypes.bool,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    input: PropTypes.string,
    inputStyled: PropTypes.exact({
      container: PropTypes.string,
      label: PropTypes.string,
      input: PropTypes.string,
      underline: PropTypes.string
    }),
    validationContainer: PropTypes.string,
    validationArrow: PropTypes.string,
    validationMessage: PropTypes.string
  }),
  containerProps: PropTypes.object,
  inputProps: PropTypes.object,
  validationArrowProps: PropTypes.object,
  validationContainerProps: PropTypes.object,
  validationMsgProps: PropTypes.object
}
