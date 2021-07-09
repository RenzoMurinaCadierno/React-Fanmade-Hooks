import PropTypes from "prop-types"
// import styles from "./ConfettiCannon.module.css"

export const classes = {
  guides: (classNames = {}) => ({
    x: classNames.x ?? "",
    y: classNames.y ?? ""
  }),
  paperPiece: (className) => className
}

export const defaultProps = { classNames: {}, guidesProps: {} }

export const propTypes = {
  anchor: PropTypes.oneOf(["left", "right"]),
  altitude: PropTypes.oneOf(["lowest", "low", "medium", "high", "highest"]),
  color: PropTypes.string,
  distance: PropTypes.oneOf(["shortest", "short", "medium", "far", "farthest"]),
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
  glitterProps: PropTypes.object
}
