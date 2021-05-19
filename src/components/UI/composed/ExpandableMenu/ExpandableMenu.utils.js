import PropTypes from "prop-types"
import styles from "./ExpandableMenu.module.css"
import pointer from "assets/icons/pointer.svg"
import facebook from "assets/icons/facebook.svg"
import linkedin from "assets/icons/linkedin.svg"
import twitter from "assets/icons/twitter.svg"

export const classes = {
  container: (anchor, className) =>
    (className ?? "") +
    (anchor ? styles[anchor.toLowerCase()] : "") +
    " " +
    styles.Container,
  mainIcon: (classNames) => classNames,
  listIcon: (classNames) => classNames
}

const spreadOrientations = {
  top: ["bottom", "bottom-right", "bottom-left"],
  bottom: ["top", "top-right", "top-left"],
  right: ["left", "center"],
  left: ["right"]
}

const anchorPropTypesOneOf = Object.values(spreadOrientations).flat()

export const expandableMenuPropTypes = {
  anchor: PropTypes.oneOf(anchorPropTypesOneOf)
}

const pointerRotations = { top: 90, bottom: -90, right: 180, left: 0 }

export function getDefaultIconProps(spread) {
  return {
    main: {
      icon: (
        <img
          src={pointer}
          alt="menu"
          style={{ transform: `rotate(${pointerRotations[spread] ?? 90}deg)` }}
        />
      ),
      content: "pointer"
    },
    list: [
      {
        icon: <img src={facebook} alt="facebook" />,
        content: "facebook"
      },
      {
        icon: <img src={linkedin} alt="linkedin" />,
        content: "linkedin"
      },
      {
        icon: <img src={twitter} alt="twitter" />,
        content: "twitter"
      }
    ]
  }
}

export function getIconSpreadDirection(anchor) {
  for (const spreadName in spreadOrientations) {
    if (spreadOrientations[spreadName].includes(anchor)) return spreadName
  }
  return "top"
}

const anchorsThatExpandIconsToLeft = ["right", "top-right", "bottom-right"]

export function getIconExpandDirection(anchor) {
  return anchorsThatExpandIconsToLeft.includes(anchor) ? "left" : "right"
}

export function getType(typeProp, isOpen) {
  switch (typeProp) {
    case "primary":
      return isOpen ? "secondary" : "primary"
    case "secondary":
      return isOpen ? "primary" : "secondary"
    default:
      return typeProp
  }
}
