import PropTypes from "prop-types"
import styles from "./ConfettiPaperPiece.module.css"

export const classes = {
  container: (rotateSpeed, rotateOrientation, className) =>
    (className ?? "") +
    " " +
    (rotateSpeed ? styles["rotate-speed-" + rotateSpeed] : "") +
    " " +
    (rotateOrientation
      ? styles["rotate-orientation-" + rotateOrientation]
      : "") +
    " " +
    styles.Container
}

export const defaultProps = {
  rotateSpeed: "medium",
  rotateOrientation: "forwards",
  style: {}
}

export const propTypes = {
  rotateSpeed: PropTypes.oneOf([
    "slowest",
    "slow",
    "medium",
    "fast",
    "fastest"
  ]),
  rotateOrientation: PropTypes.oneOf(["forwards", "reverse"]),
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

const colors = ["yellow", "green", "red", "blue", "white", "orange", "purple"]

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
