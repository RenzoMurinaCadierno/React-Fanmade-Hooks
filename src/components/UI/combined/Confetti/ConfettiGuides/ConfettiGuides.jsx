import { Confetti } from "hub"
import { classes, defaultProps } from "./ConfettiGuides.utils"
go on with distances of each anchor + orientation
export default function ConfettiGuides({
  anchor,
  orientation,
  distance,
  altitude,
  classNames,
  guideXProps,
  guideYProps,
  glitterProps
}) {
  return (
    <div
      className={classes.guideX(
        anchor,
        orientation,
        distance,
        classNames.guideX
      )}
      {...guideXProps}
    >
      <div
        className={classes.guideY(altitude, classNames.guideY)}
        {...guideYProps}
      >
        <Confetti.Glitter
          className={classes.glitter(classNames.glitter)}
          {...glitterProps}
        />
      </div>
    </div>
  )
}

ConfettiGuides.defaultProps = defaultProps
