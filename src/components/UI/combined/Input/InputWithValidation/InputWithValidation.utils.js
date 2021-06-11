import PropTypes from "prop-types"
import styles from "./InputWithValidation.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  input: (className) => (className ?? "") + " " + styles.InputContainer,
  inputStyled: (classNames) => ({
    ...classNames,
    container: (classNames?.container ?? "") + " " + styles.InputContainer
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

export const defaultProps = {
  useInputHandlersProps: {},
  useInputHandlersConfigs: {},
  validationContainerAnchor: "top",
  messageType: "secondary",
  classNames: {},
  containerProps: {},
  inputProps: {},
  validationContainerProps: {},
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
  messageType: PropTypes.oneOf(["primary", "secondary"]),
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
    validationContainerArrow: PropTypes.string,
    validationMessage: PropTypes.string
  }),
  containerProps: PropTypes.object,
  inputProps: PropTypes.object,
  validationContainerProps: PropTypes.object,
  validationMsgProps: PropTypes.object
}
