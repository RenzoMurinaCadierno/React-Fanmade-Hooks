import PropTypes from "prop-types"
import styles from "./ConfettiCannon.module.css"

export const classes = {
  container: (absoluteFill, fullScreen, className) =>
    (className ?? "") +
    " " +
    (absoluteFill ? styles.AbsoluteFill : "") +
    " " +
    (fullScreen ? styles.FullScreen : "") +
    " " +
    styles.Container,
  relativeWrapper: styles.RelativeWrapper,
  glitter: (classNames) => classNames
}

export const defaultProps = {
  // absoluteFill: true,
  fullScreen: true,
  classNames: {}
}

export const propTypes = {
  absoluteFill: PropTypes.bool,
  anchor: PropTypes.oneOf(["left", "right"]),
  altitude: PropTypes.oneOf(["lowest", "low", "medium", "high", "highest"]),
  color: PropTypes.string,
  distance: PropTypes.oneOf(["shortest", "short", "medium", "far", "farthest"]),
  fullScreen: PropTypes.bool,
  quantity: PropTypes.number,
  rotateOrientation: PropTypes.oneOf(["forwards", "reverse"]),
  rotateSpeed: PropTypes.oneOf([
    "slowest",
    "slow",
    "medium",
    "fast",
    "fastest"
  ]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    glitter: PropTypes.exact({
      guides: PropTypes.exact({
        x: PropTypes.string,
        y: PropTypes.string
      }),
      paperPiece: PropTypes.string
    })
  }),
  guidesProps: PropTypes.exact({
    x: PropTypes.object,
    y: PropTypes.object
  }),
  paperPieceProps: PropTypes.object
}
