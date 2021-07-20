import { classes, propTypes, constants } from "./Orientation.utils"

/**
 * Returns a `children` capable of anchoring to the top, bottom, left or right
 * of its closest parent with `position: relative`.
 *
 * It is also able to rotate upside-down on all positions, and sideways if it
 * is anchored to left or right.
 *
 * @param {object} props
 *
 * `children` (React.Node): `children`.
 *
 * `anchor?` (string): The absolute position to anchor `children`, relative to its
 *   closest parent with `position: relative`.
 * * Can be one of 'top', 'right', 'bottom', 'left'.
 *
 * `rotate` (string): Controls `children` rotation.
 * * Can be one of 'forwards', 'reverse'.
 * * If `anchor` is 'top' or 'bottom', `children` will be flipped-upside down
 *   regardless `rotate` value.
 * * If `anchor` is 'left' or 'right', defining `rotate` will render `children`
 *   vertically. Leaving `rotate` undefined renders it horizontally.
 *   * `rotate === 'forwards'` makes `children` face the edge of the device.
 *   * `rotate === 'backwards'` makes `children` face the center of the screen.
 *
 * `className?` (string): className to attach to wrapper container '*div*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper container '*div*'.
 */
export default function Orientation({
  children,
  anchor,
  rotate,
  className,
  ...otherProps
}) {
  return (
    // wrapper container. Handles rotation and anchor
    <div
      className={classes.container(anchor, rotate, className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}

// Orientation.defaultProps = defaultProps
Orientation.propTypes = propTypes

// add used constants as namespace if needed
Orientation.constants = constants
