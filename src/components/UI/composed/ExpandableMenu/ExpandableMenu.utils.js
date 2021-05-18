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
  listIcon: (classNames) => classNames,
  animateMenu: styles.AnimateMenu
}

const anchorsThatExpandIconsToLeft = ["bottom", "bottom-left", "bottom-right"]
anchors that spread icons to left right bottom top

export const expandableMenuPropTypes = {
  anchor: PropTypes.oneOf([
    ...anchorsThatExpandIconsToLeft,
    "top",
    "top-left",
    "top-right",
    "left",
    "right",
    "bottom",
    "top",
    "center"
  ])
}

const pointerStyle = { transform: "rotate(90deg)" }

export const defaultIconProps = {
  main: {
    icon: <img src={pointer} alt="ispointer" style={pointerStyle} />,
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

export function getIconExpandDirection(anchor) {
  return anchorsThatExpandIconsToLeft.includes(anchor) ? "left" : "right"
}
