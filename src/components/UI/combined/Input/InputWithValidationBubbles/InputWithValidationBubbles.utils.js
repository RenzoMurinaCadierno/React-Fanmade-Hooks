import PropTypes from "prop-types"
import styles from "./InputWithValidationBubbles.module.css"

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
  validationMessage: (className) => className,
  // (className ?? "") + " " + styles.ValidationMessage,
  validationArrow: (anchor, type, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    styles.Pointer
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
