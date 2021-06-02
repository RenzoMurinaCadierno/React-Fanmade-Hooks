import { useRef, useState, useCallback } from "react"
import { Container, Input, Text, useInputHandlers } from "hub"
import {
  classes,
  styledInputWithValidationPropTypes
} from "./StyledInputWithValidation.utils"

/**
 * Returns a '*StyledInput*' component linked to '*useInputHandlers*' hook.
 *
 * It is designed to be validated. Hence, it should recieve "onSubmit" callback
 * in `useInputHandlersProps`).
 *
 * If input's validation fails, the first validation message is shown at
 * orientation specified in `validationContainerAnchor` relative to input.
 *
 * @param {object} props
 *
 * `useInputHandlersProps?` (object): "props" to pass to '*useInputHandlers*'
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
 * `classNames?` (object) classNames for all JSXs rendered here. Check their
 *   constitution in *utils.js*.
 *
 * `containerProps?` (object): "props" to spread to outer '*div*'.
 *
 * `styledInputProps?` (object): "props" to spread to '*Input.Styled*'.
 *
 * `validationContainerProps?` (object): "props" to spread to '*Container*'.
 *
 * `validationMsgProps?` (object): "props" to spread to '*Text*'.
 */
export default function StyledInputWithValidation({
  useInputHandlersProps = {},
  useInputHandlersConfigs = {},
  validationContainerAnchor = "top",
  messageType = "secondary",
  classNames = {},
  containerProps = {},
  styledInputProps = {},
  validationContainerProps = {},
  validationMsgProps = {}
}) {
  // boolean state to trigger validation message bubble '*div*'
  const [isValMsgActive, setIsValMsgActive] = useState(false)
  // ref pointing to input
  const inputRef = useRef()
  // "useInputHandlers" hook that controls '*StyledInput*'
  const handlers = useInputHandlers(
    inputRef,
    {
      ...useInputHandlersProps,
      onBlur: (e) => setValMsgStAndTriggerCb(true, "onBlur", e),
      onFocus: (e) => setValMsgStAndTriggerCb(false, "onFocus", e)
    },
    useInputHandlersConfigs
  )

  /**
   * Sets "setIsValMsgActive" state with first arg and fires
   * "useInputHandlersProps" callback whose name matches the second arg,
   * passing all other args to that callback.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const setValMsgStAndTriggerCb = useCallback((newSt, cbName, ...otherArgs) => {
    setIsValMsgActive(newSt)
    useInputHandlersProps[cbName]?.(...otherArgs)
  }, [])

  /**
   * Sets focus on input and triggers onClick callback assigned to
   * validationContainerProps, if any. No need to ever reconstruct it
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleValContainerClick = useCallback((e) => {
    handlers.focus()
    validationContainerProps.onClick?.(e)
  }, [])

  return (
    <div
      className={classes.container(classNames.container)}
      {...containerProps}
    >
      {/* input linked to "useInputHandlers" */}
      <Input.Styled
        ref={inputRef}
        classNames={classes.styledInput(classNames.styledInput)}
        {...handlers.props}
        {...styledInputProps}
      />
      {
        // if `isValMsgActive` is true and there are errors, render the
        // validation message bubble
        isValMsgActive && handlers.validation.messages[0] && (
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
            <Container
              htmlElem="span"
              type={messageType}
              className={classes.validationContainerArrow(
                validationContainerAnchor,
                classNames.validationContainerArrow
              )}
            />
          </>
        )
      }
    </div>
  )
}

StyledInputWithValidation.propTypes = styledInputWithValidationPropTypes
