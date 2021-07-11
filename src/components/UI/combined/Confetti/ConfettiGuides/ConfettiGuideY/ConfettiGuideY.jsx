import { classes, defaultProps, propTypes } from "./ConfettiGuideY.utils"

/**
 * Renders a Y-axis guide, which serves to animate '*Confetti.PaperPiece*'
 * vertically.
 *
 * This component 'moves' the paper piece across the Y-axis, starting from the
 * bottom layout of '*Confetti.Cannon*', ascending until it reaches the height
 * related to `props.altitude`, and then descends back to bottom.
 *
 * @param {object} props
 * `altitude?` (number): The top-most height '*Confetti.PaperPiece*' will reach
 *   relative to '*Confetti.Cannon*' height, starting at its bottom (0).
 * * Can be one of 1, 2, 3, 4, 5, 6, 7, 8, 9.
 * * Each number corresponds to (-10vh * itself). 2 is -20vh, 8 is -80vh.
 * * Defaults to 5.
 *
 * `children` (React.Node): Anything React can render and that can translate
 *   through Y-axis, though it is designed to host an instance of
 *   '*Confetti.PaperPiece*'.
 *
 * `className?` (string): className to attatch to rendered '*div*'.
 *
 * `...otherProps?` (object): Props to spread in rendered '*div*'.
 */
export default function ConfettiGuideY({
  altitude,
  children,
  className,
  ...otherProps
}) {
  return (
    <div className={classes.container(altitude, className)} {...otherProps}>
      {children}
    </div>
  )
}

ConfettiGuideY.defaultProps = defaultProps
ConfettiGuideY.propTypes = propTypes
