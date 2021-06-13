import { memo } from "react"
import { classes, defaultProps, propTypes } from "./Label.utils"

/**
 * **WORK IN PROGRESS** (currently accepts inputs type 'text' and the like).
 *
 * Renders an animated label to use in input components.
 *
 * It places itself as a placeholder text in the input while it is not focused,
 * and shrinks and moves to the top of it when input is focused.
 *
 * @param {object} props
 *
 * `children` (string): label's text.
 *
 * `isActive` (boolean): must be linked to input's "focus" property. False adds
 *   styles that place the label as the input's "placeholder". True lifts it up
 *   and shrinks it, letting the user type on the input.
 *
 * `targetInputType?` (string): the input "type" property this label is assigned
 *   to. Defaults to "text".
 *
 * `className?` (string): className string to add to rendered '*label*'.
 */
function Label({
  children,
  isActive,
  targetInputType,
  className,
  ...otherProps
}) {
  return (
    <label
      className={classes.container(isActive, targetInputType, className)}
      {...otherProps}
    >
      {children}
    </label>
  )
}

Label.defaultProps = defaultProps
Label.propTypes = propTypes

export default memo(Label)
