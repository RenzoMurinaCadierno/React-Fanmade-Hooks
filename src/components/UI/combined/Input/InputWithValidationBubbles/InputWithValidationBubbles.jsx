import { useRef, useState } from "react"
import { Container, Input, Text, useInputHandlers } from "hub"
import {
  classes,
  defaultProps,
  propTypes
} from "./InputWithValidationBubbles.utils"
import pointer from "assets/icons/pointer.svg"

/**
 * Returns either an '*Input*' or an '*Input.Styled*' component, either of them
 * linked to '*useInputHandlers*' hook.
 *
 * It is designed to be validated. Hence, it should recieve "onSubmit" callback
 * in `useInputHandlersProps`).
 *
 * If input's validation fails, the first validation message is shown at
 * orientation specified in `validationContainerAnchor` relative to input.
 *
 * @param {object} props
 *
 * `isStyled` (boolean): true renders '*Input.Styled*'. False, '*Input*'.
 *
 * `useInputHandlersProps?` (object): `props` to pass to '*useInputHandlers*'
 *   hook.
 *
 * `useInputHandlersConfigs?` (object): "configs" to pass to
 *   '*useInputHandlers*' hook.
 *
 * `validationContainerAnchor?` (string): "top", "left", "right", "bottom".
 *   'validation message' bubble's orientation anchor.
 *
 * `messageType?` (string): "primary" or "secondary". Theme stylings for the
 *   'validation message' bubble.
 *
 * `hideBubbles` (boolean): true will prevent validation messages from
 *   rendering (the text bubbles showing failed validation msgs).
 *
 * > **Note:** Use this only to dynamically hide them. If hiding validation
 *   bubbles is the desired permanent behavior, you might be better off using
 *   '*Input.WithValidation*' or '*Input.Styled.WithValidation*'.
 *
 * `classNames?` (object) classNames for all JSXs rendered here. Check their
 *   constitution in *utils.js*.
 *
 * > **Note:** if `isStyled` is true, target key to pass classNames to rendered
 *   '*Input*' is "inputStyled". Otherwise, it is "input".
 *
 * `containerProps?` (object): `props` to spread to outer '*div*'.
 *
 * `inputProps?` (object): `props` to spread to either '*Input*' or
 *   '*Input.Styled*'.
 *
 * `validationContainerProps?` (object): `props` to spread to 'validation
 *   message' bubble '*Container*'.
 *
 * `validationMsgProps?` (object): `props` to spread to 'validation message'
 *   '*Text*'.
 */
export default function InputWithValidationBubbles({
  isStyled,
  useInputHandlersProps,
  useInputHandlersConfigs,
  validationContainerAnchor,
  messageType,
  hideBubbles,
  classNames,
  containerProps,
  inputProps,
  validationContainerProps,
  validationMsgProps,
  validationArrowProps
}) {
  // boolean state to trigger validation message bubble '*div*'
  const [isValMsgActive, setIsValMsgActive] = useState(false)
  // ref pointing to input
  const inputRef = useRef()
  // "useInputHandlers" hook that controls '*InputStyled*'
  const handlers = useInputHandlers(
    inputRef,
    {
      ...useInputHandlersProps,
      onBlur: (e) => setValMsgStAndTriggerCb(true, true, "onBlur", e),
      onFocus: (e) => setValMsgStAndTriggerCb(false, true, "onFocus", e)
    },
    {
      ...useInputHandlersConfigs,
      onSubmit: (...args) => {
        setValMsgStAndTriggerCb(true, false, "onSubmit", ...args)
      },
      onSubmitFail: (...args) => {
        setValMsgStAndTriggerCb(true, false, "onSubmitFail", ...args)
      },
      onValidation: (valObj, ...otherArgs) => {
        setValMsgStAndTriggerCb(
          !valObj.isValid,
          false,
          "onValidation",
          valObj,
          ...otherArgs
        )
      }
    }
  )

  /**
   * Sets "setIsValMsgActive" state with first arg and fires
   * "useInputHandlersProps" callback whose name matches the second arg,
   * passing all other args to that callback.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const setValMsgStAndTriggerCb = (newSt, isPropsCb, cbName, ...otherArgs) => {
    setIsValMsgActive(newSt)
    isPropsCb
      ? useInputHandlersProps[cbName]?.(...otherArgs)
      : useInputHandlersConfigs[cbName]?.(...otherArgs)
  }
  /**
   * Sets focus on input and triggers onClick callback assigned to
   * validationContainerProps, if any. No need to ever reconstruct it
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleValContainerClick = (e) => {
    handlers.focus()
    validationContainerProps.onClick?.(e)
  }

  return (
    <div
      className={classes.container(classNames.container)}
      {...containerProps}
    >
      {/* input linked to "useInputHandlers". Renders '*Input.Styled*' or 
        '*Input*' depending on `isStyled` */}
      {isStyled ? (
        <Input.Styled
          ref={inputRef}
          classNames={classes.inputStyled(classNames.inputStyled)}
          {...{ ...handlers.props, ...inputProps }}
        />
      ) : (
        <Input
          ref={inputRef}
          className={classes.input(classNames.input)}
          {...{ ...handlers.props, ...inputProps }}
        />
      )}
      {
        // if `isValMsgActive` is true and there are errors, render the
        // validation message bubble
        isValMsgActive && !hideBubbles && handlers.validation.messages[0] && (
          <>
            {/* the validation message bubble '*div*' */}
            <Container
              roundBorders
              type={messageType}
              className={classes.validationContainer(
                validationContainerAnchor,
                classNames.validationContainer
              )}
              {...validationContainerProps}
              onClick={handleValContainerClick}
            >
              <Text
                htmlElem="span"
                type={messageType}
                italic
                className={classes.validationMessage(
                  classNames.validationMessage
                )}
                {...validationMsgProps}
              >
                {/* show one validation error msg at a time */}
                {handlers.validation.messages[0]}
              </Text>
            </Container>
            {/* UI arrow pointing to the input */}
            <img
              src={pointer}
              alt="pointer"
              className={classes.validationArrow(
                validationContainerAnchor,
                messageType,
                classNames.pointer
              )}
              {...validationArrowProps}
            />
          </>
        )
      }
    </div>
  )
}

InputWithValidationBubbles.defaultProps = defaultProps
InputWithValidationBubbles.propTypes = propTypes
