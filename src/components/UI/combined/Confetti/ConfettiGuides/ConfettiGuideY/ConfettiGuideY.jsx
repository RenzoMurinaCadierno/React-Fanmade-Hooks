import { classes, defaultProps, propTypes } from "./ConfettiGuideY.utils"

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
