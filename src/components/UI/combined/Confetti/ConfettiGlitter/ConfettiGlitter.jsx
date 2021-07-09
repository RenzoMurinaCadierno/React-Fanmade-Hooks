import { Confetti } from "hub"
import { useEffect, useState } from "react"
import { classes, defaultProps, propTypes } from "./ConfettiGlitter.utils"

export default function ConfettiGlitter({
  anchor,
  distance,
  altitude,
  color,
  order,
  rotateSpeed,
  rotateOrientation,
  classNames,
  guidesProps,
  paperPieceProps
}) {
  // console.log(anchor, distance, altitude, color)
  const [show, setShow] = useState(true)
  // useEffect(() => setTimeout(() => setShow(true), delay), [])
  return (
    show && (
      <Confetti.Guides
        classNames={classes.guides(classNames.guides)}
        {...{ anchor, distance, altitude, ...guidesProps }}
      >
        <Confetti.PaperPiece
          className={classes.paperPiece(classNames.paperPiece)}
          {...{ color, rotateSpeed, rotateOrientation, ...paperPieceProps }}
        />
      </Confetti.Guides>
    )
  )
}

ConfettiGlitter.defaultProps = defaultProps
ConfettiGlitter.propTypes = propTypes

// import { Confetti } from "hub"
// import { classes, defaultProps, propTypes } from "./ConfettiGlitter.utils"

// export default function ConfettiGlitter({
//   anchor,
//   distance,
//   altitude,
//   color,
//   delay,
//   rotateSpeed,
//   rotateOrientation,
//   classNames,
//   guidesProps,
//   paperPieceProps
// }) {
//   return (
//     <Confetti.Guides
//       classNames={classes.guides(classNames.guides)}
//       {...{ anchor, distance, altitude, ...guidesProps }}
//     >
//       <Confetti.PaperPiece
//         className={classes.paperPiece(classNames.paperPiece)}
//         {...{ color, rotateSpeed, rotateOrientation, ...paperPieceProps }}
//       />
//     </Confetti.Guides>
//   )
// }

// ConfettiGlitter.defaultProps = defaultProps
// ConfettiGlitter.propTypes = propTypes
