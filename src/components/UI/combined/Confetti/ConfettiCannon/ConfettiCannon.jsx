import { Confetti } from "hub"
import { classes, defaultProps, propTypes } from "./ConfettiCannon.utils"

export default function ConfettiCannon({
  quantity,
  anchor,
  distance,
  altitude = "lowest",
  color,
  rotateSpeed,
  rotateOrientation,
  absoluteFill,
  fullScreen,
  classNames,
  relativeWrapperProps,
  guidesProps,
  paperPieceProps,
  ...otherProps
}) {
  return (
    <div
      className={classes.container(
        absoluteFill,
        fullScreen,
        classNames.container
      )}
      {...otherProps}
    >
      <div className={classes.relativeWrapper} {...relativeWrapperProps}>
        {renderGlitter(quantity, classNames.glitter, {
          anchor,
          distance,
          altitude,
          color,
          rotateOrientation,
          rotateSpeed,
          guidesProps,
          paperPieceProps
        })}
      </div>
    </div>
  )
}

ConfettiCannon.defaultProps = defaultProps
ConfettiCannon.propTypes = propTypes

const anchors = ["left", "right"]
const altitudes = ["lowest", "low", "medium", "high", "highest"]
const colors = ["red", "blue", "yellow", "green", "white"]
const distances = ["shortest", "short", "medium", "far", "farthest"]
const rotateOrientations = ["forwards", "reverse"]
const rotateSpeeds = ["slowest", "slow", "medium", "fast", "fastest"]

function renderGlitter(quantity = 25, classNames = {}, glitterProps) {
  return new Array(quantity).fill(null).map((_, i) => {
    return (
      <Confetti.Glitter
        key={i}
        order={i}
        anchor={anchors[Math.floor(Math.random() * anchors.length)]}
        altitude={altitudes[Math.floor(Math.random() * altitudes.length)]}
        distance={distances[Math.floor(Math.random() * distances.length)]}
        color={colors[Math.floor(Math.random() * colors.length)]}
        rotateOrientation={
          rotateOrientations[
            Math.floor(Math.random() * rotateOrientations.length)
          ]
        }
        rotateSpeed={
          rotateSpeeds[Math.floor(Math.random() * rotateSpeeds.length)]
        }
        classNames={classes.glitter(classNames)}
        // {...glitterProps}
      />
    )
  })
}

// const {
//   anchor,
//   distance,
//   altitude,
//   color,
//   rotateOrientation,
//   rotateSpeed,
//   guidesProps,
//   paperPieceProps
// } = glitterProps
