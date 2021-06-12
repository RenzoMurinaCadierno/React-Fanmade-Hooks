import { useState, useCallback, useRef, forwardRef } from "react"
import { Label, Input, Underline } from "hub"
import { classes } from "./InputField.utils"

/**
 * ***LEGACY*** --- '*Input.WithValidation*' is its replacement.
 *
 * Renders an invisible input with a label and an underline to create a style
 * matching this app's default.
 *
 * This input has "submit" capabilities if `props.onSubmit` is defined, and is
 * self-controlled unless `props.selfControlled` is false (in which case it
 * must to recieve `props.value` and `props.onChange`).
 *
 * @param {object} props
 *
 * `id?` (string | number): '*Input*'s id property. Self generates if
 *   undefined.
 *
 * `value?` (string): '*Input*'s value property. Pass it only if
 *   `selfControlled` is false.
 *
 * `label` (string): '*Label*'s children (text).
 *
 * `disabled?` (boolean): component's disabled state.
 *
 * `selfControlled?` (boolean): true will tell this component to handle its own
 *   state and changes on it, false means you will do so manually by passing
 *   `value` and `onChange`. Defaults to true.
 *
 * `onFocus?` (function): callback to trigger when this component is focused on.
 *
 * `onBlur?` (function): callback to trigger when this component loses focus.
 *
 * `onSubmit?` (function): if left undefined (default), the component will be
 *   wrapped on a '*div*' and behave as a normal input. Otherwise, the
 *   component will be wrapped on a '*form*' element, and thus will be capable
 *   of intercepting "Enter" or "Return" key presses, triggering this prop as a
 *   callback.
 *
 * `style?` (object): "style" property to pass to outer '*div*' or '*form*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * @param {React.ref?} ref A reference to rendered '*Input*'. If undefined,
 *   this component will create one on its place.
 */
function InputField(
  {
    id,
    value,
    label,
    disabled,
    selfControlled = true,
    onFocus,
    onBlur,
    onSubmit,
    style,
    classNames = {},
    ...otherInputProps
  },
  ref
) {
  // focusing the input will pull the label up, blurring will return it to its
  // place. We use track its state with a boolean
  const [isFocused, setIsFocused] = useState(false)
  // is `onSubmit` defined? Use a '*form*' element to wrap the component if so,
  // which will catch the callback. Otherwise, just use a '*div*'
  const OuterComponent = useRef(onSubmit ? "form" : "div").current
  // if '*input*' is self controlled, we use an input with its own value and
  // "onChange" handler, otherwise, just a regular '*input*' (mind we will need
  // to pass `value` and `onChange` in this last case)
  const InputComponent = useRef(
    selfControlled ? Input.WithState : Input
  ).current
  // use `id` or create a unique one if none
  const inputId = useRef(
    id || "input-field-" + Math.floor(Math.random() * 100000)
  ).current
  // to handle focusing and blurring, we need a ref. Either use `ref`, or
  // "fallbackRef" if undefined
  const fallbackRef = useRef()
  const inputRef = ref ?? fallbackRef

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

  /**
   * trigger on submission provided `onSubmit` callback is defined.
   * Pass the event object as param, as well as the reference to the input in
   * case it is needed
   */
  const handleSubmit = useCallback(
    (e) => onSubmit?.(e, inputRef.current),
    [onSubmit, inputRef]
  )

  return (
    // wrapper container. '*form*' if `onSubmit` is defined, '*div*' otherwise
    <OuterComponent
      onSubmit={handleSubmit}
      className={classes.container(classNames.container)}
      style={style}
    >
      {/* label attached to input */}
      <Label
        htmlFor={inputId}
        targetInputType="text"
        // label will stay up (thus not blocking input value) if "isFocused" is
        // true, or if input's value !== "", regardless `selfControlled`
        isActive={
          isFocused || value || (selfControlled && !!inputRef?.current?.value)
        }
        disabled={disabled}
        className={classes.label(classNames.label)}
      >
        {label}
      </Label>
      {/* '*Input*' if (!`selfControlled`), '*Input.WithState*' otherwise */}
      <InputComponent
        id={inputId}
        ref={inputRef}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className={classes.input(classNames.input)}
        {...otherInputProps}
      />
      <Underline
        isFocused={isFocused}
        disabled={disabled}
        className={classNames.underline}
      />
    </OuterComponent>
  )
}

// well, now we know forwardRef does not support PropTypes & defaultProps...
// They are written in utils.js if you wish to check them, though
//
// InputField.propTypes = propTypes
// InputField.defaultProps = defaultProps

export default forwardRef(InputField)
