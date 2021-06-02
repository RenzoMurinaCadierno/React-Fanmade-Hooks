import { useState, useCallback, useRef, forwardRef } from "react"
import { Label, Input, Underline } from "hub"
import { classes } from "./StyledInput.utils"

// NOTE: we cannot add prop-types here, forwardRef does not support it.
// They are written in *utils.js* if you need them, though.

/**
 * Returns an '*Input*' component linked to a '*Label*' one, with an
 * '*Underline*' to form a complete styled input.
 *
 * Keep in mind this input is **not** self-controlled, it only handles its UI
 * functionality. If you want one that manages its own state, use '*Input*',
 * '*StyledInputWithValidation*', or '*InputField*' (this last one is legacy).
 *
 * @param {object} props
 *
 * `id?` (string | number): a unique id to assign as '*Label*'s `htmlFor` and
 *   '*Input*'s "id" property. Defaults to a randomly generated one.
 *
 * `value` (string): '*Input*'s "value". It is required, as well as the
 *   "onChange" handler. Keep in mind this component is not self-controlled.
 *
 * `label` (string): '*Label*'s "children".
 *
 * `disabled?` (boolean): component's "disabled" property.
 *
 * `onFocus?` (function): '*Input*'s "onFocus" callback.
 *
 * `onBlur?` (function): '*Input*'s "onBlur" callback.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `labelProps?` (object): "props" to spread on '*Label*'.
 *
 * `underlineProps?` (object): "props" to spread on '*Underline*'.
 *
 * `otherInputProps?` (object): "props" to spread on '*Input*'.
 *
 * @param {React.ref} ref A React.Reference to the input element.
 */
function StyledInput(
  {
    id,
    value,
    label,
    disabled,
    onFocus,
    onBlur,
    classNames = {},
    labelProps = {},
    underlineProps = {},
    ...otherInputProps
  },
  ref
) {
  // focusing the input will pull the label up, blurring will return it to its
  // original state. We use a boolean for such
  const [isFocused, setIsFocused] = useState(false)
  // use `id`, or create a unique one if undefined
  const inputId = useRef(
    id || "input-field-" + Math.floor(Math.random() * 100000)
  ).current

  const handleFocus = useCallback(
    (e) => {
      // set focus state to true and trigger callback
      setIsFocused(true)
      onFocus?.(e)
    },
    [setIsFocused, onFocus]
  )

  const handleBlur = useCallback(
    (e) => {
      // set focus state to false and trigger callback
      setIsFocused(false)
      onBlur?.(e)
    },
    [setIsFocused, onBlur]
  )

  return (
    <div className={classes.container(classNames.container)}>
      <Label
        htmlFor={inputId}
        targetInputType="text"
        // keep label up if '*input*' is focused or value !== ""
        isActive={isFocused || !!value}
        disabled={disabled}
        className={classes.label(classNames.label)}
        {...labelProps}
      >
        {label}
      </Label>
      <Input
        id={inputId}
        ref={ref}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={classes.input(classNames.input)}
        {...otherInputProps}
      />
      <Underline
        isFocused={isFocused} // on focus, apply animated underline effect
        disabled={disabled}
        className={classNames.underline}
        {...underlineProps}
      />
    </div>
  )
}

export default forwardRef(StyledInput)
