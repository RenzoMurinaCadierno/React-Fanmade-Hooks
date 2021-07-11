import PropTypes from "prop-types"
// import styles from "./ConfettiCannon.module.css"

export const classes = {
  guides: (classNames) => classNames,
  paperPiece: (className) => className
}

export const defaultProps = { classNames: {}, guidesProps: {} }

export const propTypes = {
  anchor: PropTypes.oneOf(["left", "right"]),
  altitude: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  color: PropTypes.string,
  distance: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  rotateOrientation: PropTypes.oneOf(["forwards", "reverse"]),
  rotateSpeed: PropTypes.oneOf([
    "slowest",
    "slow",
    "medium",
    "fast",
    "fastest"
  ]),
  classNames: PropTypes.exact({
    guides: PropTypes.exact({
      x: PropTypes.string,
      y: PropTypes.string
    }),
    paperPiece: PropTypes.string
  }),
  guidesProps: PropTypes.exact({
    x: PropTypes.object,
    y: PropTypes.object
  }),
  paperPieceProps: PropTypes.object
}
