import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./ConfettiPaperPiece.module.css"

export const classes = {
  container: (rotateSpeed, rotateOrientation, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(rotateSpeed, styles["rotate-speed-" + rotateSpeed]) +
    cnp.if(rotateOrientation, styles["rotate-orientation-" + rotateOrientation])
}

export const defaultProps = {
  rotateSpeed: "medium",
  rotateOrientation: "forwards"
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

/**
 * An array with 0-9 and A-F characters.
 */
const hexValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F"
]
/**
 * Generates and returns a random HEX color value.
 */
export function getRandomColor() {
  let color = "#"

  while (color.length < 7) {
    color += hexValues[Math.floor(Math.random() * hexValues.length)]
  }

  return color
}
