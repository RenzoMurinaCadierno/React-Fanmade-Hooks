import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./InputWithValidationBubbles.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  input: (className) => cnp.default(styles.InputContainer, className),
  inputStyled: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.InputContainer, classNames?.container)
  }),
  validationContainer: (anchor, className) =>
    cnp.default(styles.ValidationContainer, className) +
    cnp.if(anchor, styles[anchor?.toLowerCase()]),
  validationMessage: (className) => className,
  validationArrow: (anchor, type, className) =>
    cnp.default(styles.Pointer, className) +
    cnp.if(type, styles[type?.toLowerCase()]) +
    cnp.if(anchor, styles[anchor?.toLowerCase()])
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
