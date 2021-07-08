import {
  classes,
  defaultProps,
  propTypes,
  getRandomColor
} from "./ConfettiGlitter.utils"

export default function ConfettiGlitter({
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

ConfettiGlitter.defaultProps = defaultProps
ConfettiGlitter.propTypes = propTypes
