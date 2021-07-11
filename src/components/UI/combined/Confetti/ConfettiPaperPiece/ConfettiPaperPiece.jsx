import {
  classes,
  defaultProps,
  propTypes,
  getRandomColor
} from "./ConfettiPaperPiece.utils"

/**
 * Renders a single animated 'glitter' (paper piece).
 *
 * @param {object} props
 * `rotateSpeed?` (string): The velocity the paper piece rotates.
 * * Can be one of 'fastest', 'fast', 'medium', 'slow', 'slowest'.
 * * Defaults to 'medium'.
 *
 * `rotateOrientation?` (string): The direction the paper piece rotates.
 * * Can be one of 'forwards', 'backwards'.
 * * Defaults to 'forwards'.
 *
 * `color?` (string): The paper piece's background color.
 * * Accepts any string representing a CSS-compatible color.
 * * Defaults to a randomly generated HEX color and fail-safes to '#FFF'.
 *
 * `className?` (string): className string to add to rendered '*div*'.
 *
 * `style?` (object): Rendered '*div*' `style`. Destructured to create a new
 *   object with a valid "background-color" if an invalid one was passed.
 *
 * `...otherProps?` (object): Props to spread in rendered '*div*'.
 */
export default function ConfettiPaperPiece({
  rotateSpeed,
  rotateOrientation,
  color,
  className,
  style,
  ...otherProps
}) {
  return (
    <div
      className={classes.container(rotateSpeed, rotateOrientation, className)}
      // if `color` is undefined, use a random color as background-color
      style={{ backgroundColor: color ?? getRandomColor(), ...style }}
      {...otherProps}
    />
  )
}

ConfettiPaperPiece.defaultProps = defaultProps
ConfettiPaperPiece.propTypes = propTypes
