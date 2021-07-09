import { classes, defaultProps, propTypes } from "./ConfettiGuideX.utils"

export default function ConfettiGuideX({
  anchor,
  distance,
  children,
  className,
  ...otherProps
}) {
  // console.log(distance)
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
