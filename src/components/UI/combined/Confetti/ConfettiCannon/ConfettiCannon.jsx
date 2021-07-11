import { memo } from "react"
import {
  classes,
  defaultProps,
  propTypes,
  renderGlitter
} from "./ConfettiCannon.utils"

/**
 * Renders a 'confetti cannon', which 'pops glitter' on the screen.
 *
 * It consists of a wrapper layout container that covers the entire screen and,
 * when `props.show` is true, displays an array of one or more
 * '*Confetti.Glitter*'.
 *
 * A '*Confetti.Glitter*' is a '*Confetti.PaperPiece*' (simulating a small
 * piece of paper) whose displacement animation is controlled by
 * '*Confetti.Guides.X*' and '*Confetti.Guides.Y*' -two container components
 * capable of 'moving' children through 'X' and 'Y' axis respectively, and
 * relative to the parent component (hereby 'relativeWrapper' '*div*').
 *
 * @param {object} props
 *
 * `show` (boolean): `true` will render the component visible, which immediately
 *   triggers all animations in children components (this means each
 *   '*Confetti.Glitter*' will automatically start moving through 'X' and 'Y'
 *   axis and rotating on itself).
 *
 * `quantity?` (number): The amount of '*Confetti.Glitter*' this component
 *   hosts (meaning, how many pieces of paper the cannon will pop).
 * * Defaults to 20.
 *
 * `anchor?` (string): The starting point for the X-axis displacement,
 *   corresponding to the left-most or right-most layout boundary of
 *   '*Confetti.Cannon*'.
 * * Can be one of 'left', 'right'.
 * * Defaults to 'right'.
 *
 * `distance?` (number): The horizontal distance '*Confetti.PaperPiece*' will
 *   travel relative to '*Confetti.Cannon*' width, starting at its `anchor`
 *   horizontal edge.
 * * Can be one of 1, 2, 3, 4, 5, 6, 7, 8, 9.
 * * Each number corresponds to (-10% * itself). 2 is 20%, 8 is 80%.
 * * Defaults to 5.
 *
 * `altitude?` (number): The top-most height '*Confetti.PaperPiece*' will reach
 *   relative to '*Confetti.Cannon*' height, starting at its bottom (0).
 * * Can be one of 1, 2, 3, 4, 5, 6, 7, 8, 9.
 * * Each number corresponds to (-10vh * itself). 2 is -20vh, 8 is -80vh.
 * * Defaults to 5.
 *
 * `color?` (string): The paper piece's background color.
 * * Accepts any string representing a CSS-compatible color.
 * * Defaults to a randomly generated HEX color and fail-safes to '#FFF'.
 *
 * `rotateSpeed?` (string): The velocity the paper piece rotates.
 * * Can be one of 'fastest', 'fast', 'medium', 'slow', 'slowest'.
 * * Defaults to 'medium'.
 *
 * `rotateOrientation?` (string): The direction the paper piece rotates.
 * * Can be one of 'forwards', 'backwards'.
 * * Defaults to 'forwards'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `relativeWrapperProps?` (object): Props to spread in 'relative wrapper'
 *   '*div*'.
 *
 * `guidesProps?` (object): Props to spread in '*Confetti.Guides*'.
 *
 * `paperPieceProps?` (object): Props to spread in '*Confetti.PaperPiece*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper container '*div*'.
 */
function ConfettiCannon({
  show,
  quantity,
  anchor,
  distance,
  altitude,
  color,
  rotateSpeed,
  rotateOrientation,
  classNames,
  relativeWrapperProps,
  guidesProps,
  paperPieceProps,
  ...otherProps
}) {
  return (
    // only when `show` is true, we render '*ConfettiCannon*', which immediately
    // fires all of its `children` animations
    show && (
      // wrapper container, fixed position that covers the whole screen
      <div
        className={classes.container(classNames.container)}
        role="presentation"
        {...otherProps}
      >
        {/* wrapper for one or more '*ConfettiGlitter*'. Inherits dimensions 
            and serves as a parent with position relative. */}
        <div
          className={classes.relativeWrapper(classNames.relativeWrapper)}
          {...relativeWrapperProps}
        >
          {/* array of one or more '*ConfettiGlitter*' */}
          {renderGlitter(quantity, classNames.glitter, {
            anchor,
            distance,
            altitude,
            rotateOrientation,
            rotateSpeed,
            color,
            guidesProps,
            paperPieceProps
          })}
        </div>
      </div>
    )
  )
}

ConfettiCannon.defaultProps = defaultProps
ConfettiCannon.propTypes = propTypes

export default memo(ConfettiCannon)
