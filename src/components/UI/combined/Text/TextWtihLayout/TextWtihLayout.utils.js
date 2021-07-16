import PropTypes from "prop-types"
import styles from "./TextWtihLayout.module.css"

export const classes = {
  container: (anchor, rotate, className) =>
    (className ?? "") + " " + (anchor ? getAnchorClasses(anchor) : ""),
  text: (className) => className
}

export const defaultProps = {
  classNames: {},
  textProps: {},
  containerStyles: {}
}

export const propTypes = {
  children: PropTypes.node.isRequired,
  anchor: PropTypes.oneOf([
    "center",
    "top",
    "right",
    "bottom",
    "left",
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left"
  ]),
  rotate: validateRotate,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    text: PropTypes.string
  }),
  textProps: PropTypes.object,
  containerStyles: PropTypes.object
}

function validateRotate(prop, propName, cmpName) {
  const rotate = prop[propName]

  if (rotate === undefined) return

  if (!Number.isInteger(rotate) || rotate < -180 || rotate > 180) {
    return new Error(
      `Invalid prop ${propName} supplied to ${cmpName}.\n\nExpected an integer between -180 and 180, inclusive.\n`
    )
  }
}

function getAnchorClasses(anchor) {
  const [anchor1, anchor2] = anchor.split("-")

  return anchor2 ? styles[anchor1] + " " + styles[anchor2] : styles[anchor1]
}

function getTranslation(rotate, anchor) {
  // -180 (-100, -50) , -90 (-50, 0), 0 any (0,0), 90 (-50, -100),  180 (-100, -50)
  // -100 -50 0 -50 -100
  // -50 0 -50 -100 -50
}
find an easier way of doing this
export function getContainerStyle(rotate, anchor, otherStyles) {
  let translation = ""

  if (rotate && anchor) {
    const [anchor1, anchor2] = anchor.split("-")
    if (anchor2) getTranslation(rotate, anchor2)
    else if (anchor1 === "left" || anchor1 === "right") {
      getTranslation(rotate, anchor1)
    }
  }

  return rotate
    ? {
        // transform: `rotate(${rotate}deg) translate(-50%, -0%)`,
        transform: `translate(-40%, -50%) rotate(${rotate}deg) `,
        ...otherStyles
      }
    : otherStyles
}
