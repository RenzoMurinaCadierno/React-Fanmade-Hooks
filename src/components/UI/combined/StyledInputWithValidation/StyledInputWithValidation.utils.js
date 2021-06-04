import PropTypes from "prop-types"
import styles from "./StyledInputWithValidation.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  styledInput: (classNames) => ({
    container: (classNames?.container ?? "") + " " + styles.InputContainer,
    label: classNames?.label ?? "",
    input: classNames?.input ?? "",
    underline: classNames?.underline ?? ""
  }),
  validationContainer: (anchor, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    styles.ValidationContainer,
  validationContainerArrow: (anchor, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    styles.ValidationContainerArrow,
  validationMessage: (className) =>
    (className ?? "") + " " + styles.ValidationMessage
}

export const styledInputWithValidationPropTypes = {
  useInputHandlersProps: PropTypes.object,
  useInputHandlersConfigs: PropTypes.object,
  validationContainerAnchor: PropTypes.oneOf([
    "top",
    "right",
    "bottom",
    "left"
  ]),
  messageType: PropTypes.oneOf(["primary", "secondary"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    styledInput: PropTypes.object,
    validationContainer: PropTypes.string,
    validationContainerArrow: PropTypes.string,
    validationMessage: PropTypes.string
  }),
  containerProps: PropTypes.object,
  styledInputProps: PropTypes.object,
  validationContainerProps: PropTypes.object,
  validationMsgProps: PropTypes.object
}
