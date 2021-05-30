import { memo } from "react"
import { classes, textPropTypes } from "./Text.utils"

/**
 * Renders a container for string-related DOM elements ('span', 'p' and 'h1' to
 * 'h6').
 *
 * @param {object} props
 *
 * `htmlElem?` (string): 'span', 'p', or one between 'h1' and 'h6'.
 * * Defaults to 'p'.
 *
 * `type?` (string): applies primary or secondary theme stylings (and their
 *   variants) to the component. Can be one of "primary", "primary-1",
 *   "primary-2", "secondary", "secondary-1", "secondary-2".
 * * Defaults to "primary".
 *
 * `small?` (boolean): renders the text in small font size (less than 'p').
 *
 * `italic?` (boolean): applies "italic" style.
 *
 * `bold?` (boolean): applies "bold" style.
 *
 * `textShadow?` (boolean): applies a text shadow. Used to contrast from
 *   backgrounds that might conflict with this component's `type` stylings.
 *
 * `className?` (string): incoming className string to add to the component.
 *
 * `onClick?` (function): callback to trigger when clicking on this component.
 */
function Text({
  htmlElem,
  type = "primary",
  small,
  italic,
  bold,
  textShadow,
  className,
  onClick,
  children,
  ...otherProps
}) {
  const Component = htmlElem ?? "p"

  return (
    <Component
      onClick={onClick}
      className={classes.container(
        htmlElem,
        type,
        small,
        italic,
        bold,
        textShadow,
        onClick,
        className
      )}
      {...otherProps}
    >
      {children}
    </Component>
  )
}

Text.propTypes = textPropTypes

export default memo(Text)
