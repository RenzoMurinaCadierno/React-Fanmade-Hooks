import {
  classes,
  defaultProps,
  propTypes,
  getRandomColor
} from "./ConfettiPaperPiece.utils"

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
      style={{ backgroundColor: color ?? getRandomColor(), ...style }}
      {...otherProps}
    />
  )
}

ConfettiPaperPiece.defaultProps = defaultProps
ConfettiPaperPiece.propTypes = propTypes
