import PropTypes from "prop-types"
import styles from "./Toast.module.css"

export const classes = {
  container: (animation, position, className) =>
    (className ?? "") +
    " " +
    (animation === "open"
      ? styles[(position.toLowerCase() || "bottom") + "-open"]
      : animation === "close"
      ? styles[(position.toLowerCase() || "bottom") + "-close"]
      : "") +
    " " +
    (position ? styles[position.toLowerCase()] : styles.bottom) +
    " " +
    styles.Container,
  content: (className) => (className ?? "") + " " + styles.Content,
  toggler: (className) => (className ?? "") + " " + styles.Toggler
}

export const toastPropTypes = {
  show: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(["center", "bottom", "left", "top", "right"]),
  timeout: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    toggler: PropTypes.string
  })
}
