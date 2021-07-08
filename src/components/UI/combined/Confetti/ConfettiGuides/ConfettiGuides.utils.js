import PropTypes from "prop-types"
import styles from "./ConfettiGuides.module.css"

export const classes = {
  guideX: (anchor, orientation, distance, className) =>
    (className ?? "") +
    " " +
    (anchor ? styles["anchor-" + anchor.toLowerCase()] : "") +
    " " +
    (orientation ? styles["orientation-" + orientation.toLowerCase()] : "") +
    " " +
    (distance ? styles["distance-" + distance.toLowerCase()] : "") +
    " " +
    styles.GuideX,
  guideY: (altitude, className) =>
    (className ?? "") +
    " " +
    (altitude ? styles["altitude-" + altitude.toLowerCase()] : "") +
    " " +
    styles.GuideY,
  glitter: (className) => (className ?? "") + " " + styles.Glitter
}

export const defaultProps = {
  anchor: "left",
  orientation: "right",
  distance: "short",
  altitude: "medium",
  classNames: {},
  guideXProps: {},
  guideYProps: {},
  glitterProps: {}
}

export const propTypes = {
  anchor: PropTypes.oneOf(["left", "center", "right"]),
  orientation: PropTypes.oneOf(["left", "center", "right"]),
  distance: PropTypes.oneOf(["shortest", "short", "medium", "far", "farthest"]),
  altitude: PropTypes.oneOf(["lowest", "low", "medium", "high", "highest"]),
  color: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    glitter: PropTypes.string
  }),
  guideXProps: PropTypes.object,
  guideYProps: PropTypes.object,
  glitterProps: PropTypes.object
}
