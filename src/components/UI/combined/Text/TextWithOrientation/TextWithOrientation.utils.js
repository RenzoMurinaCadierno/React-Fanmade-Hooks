import PropTypes from "prop-types"
import styles from "./TextWithOrientation.module.css"

export const classes = {
  orientation: (className) => className,
  text: (className) => (className ?? "") + " " + styles.Text
}

export const defaultProps = { classNames: {}, textProps: {} }

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf(["center", "top", "right", "bottom", "left"]),
  rotate: PropTypes.oneOf(["forwards", "backwards"]),
  classNames: PropTypes.exact({
    orientation: PropTypes.string,
    text: PropTypes.string
  }),
  textProps: PropTypes.object
}
