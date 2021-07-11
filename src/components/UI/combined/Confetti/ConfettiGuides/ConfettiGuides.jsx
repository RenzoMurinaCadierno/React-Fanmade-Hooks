import { Confetti } from "hub"
import { classes, defaultProps, propTypes } from "./ConfettiGuides.utils"

/**
 * Renders a wrapper containing 'X' and 'Y' axis guides which serve to animate
 * the horizontal and vertical displacement of `props.children`.
 *
 * This component is designed to 'move' a '*Confetti.PaperPiece*' relative to
 * '*Confetti.Cannon*', from left-to-right or right-to-left, and from bottom to
 * top and back to bottom.
 *
 * Regardless the horizontal displacement's direction or the intended vertical
 * height, the resulting movement is always shaped like a concave parabola.
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
 * `children` (React.Node): Anything React can render and that can have its
 *   margin-right, margin-left and translation through Y-axis controlled by
 *   this component. Though it is designed to host an instance of
 *   '*Confetti.PaperPiece*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `guidesProps?` (object): Props to spread in '*Confetti.Guides.X*' and
 *   '*Confetti.Guides.Y*'.
 * * It is an object shaped `{ x: XProps<object>, y: YProps<object> }`
 */
export default function ConfettiGuides({
  anchor,
  distance,
  altitude,
  children,
  classNames,
  guidesProps
}) {
  const { x, y } = guidesProps

  return (
    <Confetti.Guides.X
      className={classes.x(classNames.x)}
      {...{ anchor, distance, ...x }}
    >
      <Confetti.Guides.Y
        className={classes.y(classNames.y)}
        {...{ altitude, ...y }}
      >
        {children}
      </Confetti.Guides.Y>
    </Confetti.Guides.X>
  )
}

ConfettiGuides.defaultProps = defaultProps
ConfettiGuides.propTypes = propTypes
