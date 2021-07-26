import { memo } from "react"
import { classes, defaultProps, propTypes } from "./Text.utils"

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
 * `absoluteFill?` (boolean): Adds "position: 'absolute', with "top", "right",
 *   "bottom" and "left" values of 0, which covers the entire space of its
 *   closest parent with "position: 'relative'".
 *
 * `flex?` (boolean): Adds "display: 'flex'", "align-items: 'center' and
 *   "justify-content: 'center" stylings.
 *
 * `noMargin?` (boolean): sets default margin to 0.
 *
 * `textShadow?` (boolean): applies a text shadow. Used to contrast from
 *   backgrounds that might conflict with this component's `type` stylings.
 *
 * `backgroundContrast?` (boolean): applies a dark text shadow. Used to contrast
 *   from bright backgrounds if no `textShadow` is defined.
 *
 * `className?` (string): incoming className string to add to the component.
 *
 * `onClick?` (function): callback to trigger when clicking on this component.
 *
 * `...otherProps?` (object): Props to spread in rendered JSX.
 */
function Text({
  htmlElem,
  type,
  small,
  italic,
  bold,
  absoluteFill,
  flex,
  noMargin,
  textShadow,
  backgroundContrast,
  className,
  onClick,
  children,
  ...otherProps
}) {
  const Component = htmlElem

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
        backgroundContrast,
        absoluteFill,
        flex,
        noMargin,
        onClick,
        className
      )}
      {...otherProps}
    >
      {children}
    </Component>
  )
}

Text.defaultProps = defaultProps
Text.propTypes = propTypes

export default memo(Text)
