import { Confetti } from "hub"
import { classes, defaultProps, propTypes } from "./ConfettiGuides.utils"

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
