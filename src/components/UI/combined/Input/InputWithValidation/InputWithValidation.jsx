import { useRef } from "react"
import { Input, useInputHandlers } from "hub"
import { classes, defaultProps, propTypes } from "./InputWithValidation.utils"

/**
 * Returns either an '*Input*' or an '*Input.Styled*' component, either of them
 * linked to '*useInputHandlers*' hook.
 *
 * It is designed to be validated. Hence, it should recieve "onSubmit" callback
 * in `useInputHandlersProps`).
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
 */
export default function InputWithValidation({
  isStyled,
  useInputHandlersProps,
  useInputHandlersConfigs,
  classNames,
  containerProps,
  inputProps
}) {
  // ref pointing to input
  const inputRef = useRef()
  // "useInputHandlers" hook that controls '*InputStyled*'
  const handlers = useInputHandlers(
    inputRef,
    useInputHandlersProps,
    useInputHandlersConfigs
  )

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
    </div>
  )
}

InputWithValidation.defaultProps = defaultProps
InputWithValidation.propTypes = propTypes
