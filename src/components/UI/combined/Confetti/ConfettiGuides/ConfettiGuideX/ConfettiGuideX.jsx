import { classes, defaultProps, propTypes } from "./ConfettiGuideX.utils"

/**
 * Renders an X-axis guide, which serves to animate '*Confetti.PaperPiece*'
 * horizontally.
 *
 * This component 'moves' the paper piece across the X-axis, starting from the
 * right or left layout of '*Confetti.Cannon*' (assigned in `props.anchor`),
 * displacing towards the opposite anchor until it reaches the distance related
 * to `props.distance` relative to the total width of '*Confetti.Cannon*'.
 *
 * @param {object} props
 * `anchor?` (string): The starting point for the displacement, corresponding
 *   to the left-most or right-most layout boundary of '*Confetti.Cannon*'.
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
 * `children` (React.Node): Anything React can render and that can have its
 *   margin-right and margin-left controlled by this component, though it is
 *   designed to host an instance of '*Confetti.Guides.Y*'.
 *
 * `className?` (string): className to attatch to rendered '*div*'.
 *
 * `...otherProps?` (object): Props to spread in rendered '*div*'.
 */
export default function ConfettiGuideX({
  anchor,
  distance,
  children,
  className,
  ...otherProps
}) {
  return (
    <div
      className={classes.container(anchor, distance, className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}

ConfettiGuideX.defaultProps = defaultProps
ConfettiGuideX.propTypes = propTypes
