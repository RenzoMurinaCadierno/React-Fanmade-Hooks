import { Confetti } from "hub"
import { classes, defaultProps, propTypes } from "./ConfettiGlitter.utils"

/**
 * Renders a '*Confetti.PaperPiece*' wrapped in '*Confetti.Guides*', which
 * results in a paper piece animated on itself and through the 'X' and 'Y' axis
 * relative to its parent, '*Confetti.Cannon*'.
 *
 * An array of this components is what to render in '*Confetti.Cannon*' to
 * create the effect of glitter popping on-screen.
 *
 * @param {object} props
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
 * `guidesProps?` (object): Props to spread in '*Confetti.Guides.X*' and
 *   '*Confetti.Guides.Y*'.
 * * It is an object shaped `{ x: XProps<object>, y: YProps<object> }`
 *
 * `paperPieceProps?` (object): Props to spread in '*Confetti.PaperPiece*'.
 */
export default function ConfettiGlitter({
  anchor,
  distance,
  altitude,
  color,
  rotateSpeed,
  rotateOrientation,
  classNames,
  guidesProps,
  paperPieceProps
}) {
  return (
    <Confetti.Guides
      classNames={classes.guides(classNames.guides)}
      {...{ anchor, distance, altitude, guidesProps }}
    >
      <Confetti.PaperPiece
        className={classes.paperPiece(classNames.paperPiece)}
        {...{ color, rotateSpeed, rotateOrientation, ...paperPieceProps }}
      />
    </Confetti.Guides>
  )
}

ConfettiGlitter.defaultProps = defaultProps
ConfettiGlitter.propTypes = propTypes
