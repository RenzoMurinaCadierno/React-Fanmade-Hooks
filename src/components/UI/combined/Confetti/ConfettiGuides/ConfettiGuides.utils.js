import PropTypes from "prop-types"
// import styles from "./ConfettiGuides.module.css"

export const classes = {
  x: (className) => className,
  y: (className) => className
}

export const defaultProps = {
  anchor: "left",
  distance: "farthest",
  altitude: "medium",
  classNames: {},
  guidesProps: {}
}

export const propTypes = {
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf(["shortest", "short", "medium", "far", "farthest"]),
  altitude: PropTypes.oneOf(["lowest", "low", "medium", "high", "highest"]),
  classNames: PropTypes.exact({
    x: PropTypes.string,
    y: PropTypes.string
  }),
  guidesProps: PropTypes.exact({
    x: PropTypes.object,
    y: PropTypes.object
  })
}
