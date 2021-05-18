import { classes, underlinePropTypes } from "./Underline.utils"

/**
 * Renders a '*span*' that serves as an underline effect. Normally used to matk
 * a base bottom line for invisible inputs.
 *
 * @param {object} props
 *
 * `isFocused?` (boolean): true will trigger an animation to indicate the
 *   element is being focused.
 *
 * `className?` (string): className string to add to rendered '*span*'.
 */
export default function Underline({ isFocused, className, ...otherProps }) {
  return (
    <span className={classes.container(className, isFocused)} {...otherProps} />
  )
}

Underline.propTypes = underlinePropTypes
