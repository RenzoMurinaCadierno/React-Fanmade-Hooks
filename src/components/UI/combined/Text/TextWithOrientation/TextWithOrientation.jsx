import { Text } from "hub"
import { classes, defaultProps, propTypes } from "./TextWithOrientation.utils"

/**
 * Returns a '*Text*' capable of anchoring to the top, bottom, left or right
 * of its closest parent with `position: relative`.
 *
 * It is also able to rotate upside-down on all positions, and sideways if it
 * is anchored to left or right.
 *
 * @param {object} props
 *
 * `children` (React.Node): '*Text*' `children`. Preferrably a `string`.
 *
 * `anchor?` (string): The absolute position to anchor '*Text*', relative to its
 *   closest parent with `position: relative`.
 * * Can be one of 'top', 'right', 'bottom', 'left'.
 * * Defaults to 'bottom'.
 *
 * `rotate` (string): Controls '*Text*' rotation.
 * * Can be one of 'forwards', 'reverse'.
 * * If `anchor` is 'top' or 'bottom', '*Text*' will be flipped-upside down
 *   regardless `rotate` value.
 * * If `anchor` is 'left' or 'right', defining `rotate` will render '*Text*'
 *   vertically. Leaving `rotate` undefined renders it horizontally.
 *   * `rotate === 'forwards'` makes '*Text*' face the edge of the device.
 *   * `rotate === 'backwards'` makes '*Text*' face the center of the screen.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `textProps?` (object): Props to spread in '*Text*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper container '*div*'.
 */
export default function TextWithLayout({
  children,
  anchor,
  rotate,
  classNames,
  textProps,
  ...otherProps
}) {
  return (
    // wrapper container. Handles rotation and anchor
    <div
      className={classes.container(anchor, rotate, classNames.container)}
      {...otherProps}
    >
      {/* '*Text*' */}
      <Text className={classes.text(classNames.text)} {...textProps}>
        {children}
      </Text>
    </div>
  )
}

TextWithLayout.defaultProps = defaultProps
TextWithLayout.propTypes = propTypes
