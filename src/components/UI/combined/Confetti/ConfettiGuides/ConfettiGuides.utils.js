import PropTypes from "prop-types"
// import styles from "./ConfettiGuides.module.css"

export const classes = {
  x: (className) => className ?? "",
  y: (className) => className ?? ""
}

export const defaultProps = { classNames: {}, guidesProps: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["left", "right"]),
  distance: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  altitude: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9]),
  classNames: PropTypes.exact({ x: PropTypes.string, y: PropTypes.string }),
  guidesProps: PropTypes.exact({ x: PropTypes.object, y: PropTypes.object })
}
