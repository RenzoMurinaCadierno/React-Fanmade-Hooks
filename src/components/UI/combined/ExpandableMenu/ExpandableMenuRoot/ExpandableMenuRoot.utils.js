import PropTypes from "prop-types"
import styles from "./ExpandableMenuRoot.module.css"
import pointer from "assets/icons/pointer.svg"
import mail from "assets/icons/mail.svg"
import linkedin from "assets/icons/linkedin.svg"
import github from "assets/icons/github.svg"
import cnp from "styles/classNameProcessor"

export const classes = {
  container: (anchor, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(anchor, styles[anchor?.toLowerCase()]),
  mainIcon: (classNames) => classNames,
  listIcon: (classNames) => classNames
}

export const defaultProps = {
  // 'spread', 'listIconsExpandDirection' must be defined as defaults on
  // component's function signature, as they need each other's values to be
  // initialized. Cannot be done here as 'this' will be undefined when trying
  // to access values before initialization.
  anchor: "bottom-right",
  type: "secondary",
  classNames: {},
  menuIconProps: {},
  listIconsProps: {}
}

/**
 * An object whose keys are all four possible `spread` values assignable to
 * '*ExpandableMenuListIcon*'(s), and values each possible `anchor` for
 * '*ExpandableMenuRoot*' exclusively related to that key.
 *
 * It can be understood as: "these anchor [values] for root icon will provoke
 * its list icons to spread on their [key]'s direction".
 *
 * Used to calculate each '*ExpandableMenuListIcon*' default `spread`, as well
 * as this component's "PropTypes".
 */
const spreadOrientations = {
  top: ["bottom", "bottom-right", "bottom-left"],
  bottom: ["top", "top-right", "top-left"],
  right: ["left", "center"],
  left: ["right"]
}

const anchorPropTypesOneOf = Object.values(spreadOrientations).flat()
const spreadPropTypesOneOf = Object.keys(spreadOrientations).flat()
const iconPropsShape = PropTypes.shape({
  icon: PropTypes.element,
  content: PropTypes.any,
  toastProps: PropTypes.object
})

export const propTypes = {
  anchor: PropTypes.oneOf(anchorPropTypesOneOf),
  spread: PropTypes.oneOf(spreadPropTypesOneOf),
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  iconsProps: PropTypes.exact({
    main: iconPropsShape,
    list: PropTypes.arrayOf(iconPropsShape)
  }),
  listIconsExpandDirection: PropTypes.oneOf(["left", "right"]),
  classNames: PropTypes.exact({
    container: PropTypes.string,
    mainIcon: PropTypes.object,
    listIcon: PropTypes.object
  }),
  menuIconProps: PropTypes.object,
  listIconsProps: PropTypes.object,
  otherProps: PropTypes.object
}

/**
 * "Pointer" svg image default rotation for each `spread` direction.
 */
const pointerRotations = { top: 90, bottom: -90, right: 180, left: 0 }

/**
 * Returns an object to use as default props for both menu icon components
 * rendered in '*ExpandableMenuRoot*'.
 *
 * It contains two keys: 'main' and 'list'. Their values being:
 *
 * * 'main': a single object containing `icon` and `content` to spread in
 *     '*ExpandableMenuMainIcon*'.
 * * 'list': an array of objects, one for each '*ExpandableMenuListIcon*' to
 *     render sequentially. Besides `icon` and `content`, `contentProps` is
 *     present, which will be spread in the inner 'content' '*div*' inside
 *     '*Icon.Expandable*'. This assigns a `data-id` to that content '*div*' for
 *     synthetic event to bubble up and resolve "onClick" handlers.
 *
 * @param {string} spread '*ExpandableMenuRoot*' `spread`. Necessary to rotate
 *   the arrow icon rendered as content in '*ExpandableMenuMainIcon*' for it to
 *   point towards the direction '*ExpandableMenuListIcon*'(s) will spread when
 *   menu is toggled open.
 */
export function getDefaultIconProps(spread) {
  return {
    main: {
      icon: (
        <img
          src={pointer}
          alt="menu"
          style={{ transform: `rotate(${pointerRotations[spread] ?? 90}deg)` }}
        />
      )
    },
    list: [
      {
        icon: <img src={mail} alt="mail" />,
        content: "Contact",
        contentProps: { "data-id": "mail" }
      },
      {
        icon: <img src={linkedin} alt="linkedin" />,
        content: "LinkedIn",
        contentProps: { "data-id": "linkedin" }
      },
      {
        icon: <img src={github} alt="github" />,
        content: "Repository",
        contentProps: { "data-id": "github" }
      }
    ]
  }
}

/**
 * Returns the default value for '*ExpandableMenuListIcon*' `spread`, that is,
 * the direction towards each icon will spread when they become visible (when
 * `show` === true).
 *
 * @param {string} anchor '*ExpandableMenuRoot*' `anchor`.
 */
export function getIconSpreadDirection(anchor) {
  for (const spreadName in spreadOrientations) {
    if (spreadOrientations[spreadName].includes(anchor)) return spreadName
  }
  return "top"
}

const anchorsThatExpandIconsToLeft = ["right", "top-right", "bottom-right"]

/**
 * Returns the default value for '*ExpandableMenuListIcon*' `expandDirection`.
 *
 * It will be 'right' for each `anchor` except for the ones closest to the
 * right of the screen, which will be 'left'.
 *
 * @param {string} anchor '*ExpandableMenuRoot*' `anchor`.
 */
export function getIconExpandDirection(anchor) {
  return anchorsThatExpandIconsToLeft.includes(anchor) ? "left" : "right"
}

/**
 * Given the current `type`, it returns the opposite if menu toggler is open,
 * or the `type` as is it is closed.
 *
 * > E.g.:
 *
 * > * **>>** `typeProp` === 'primary'; `isOpen` === true
 * > * **<<** 'secondary'
 *
 * > * **>>** `typeProp` === 'primary'; `isOpen` === false
 * > * **<<** 'primary'
 *
 * > * **>>** `typeProp` === 'secondary-1'; `isOpen` === true
 * > * **<<** 'primary-1'
 *
 * @param {string} typeProp Current type, related to app's theme. Can be one of
 *   'primary', 'primary-1', 'secondary', 'secondary-1',.
 *
 * @param {boolean} isOpen Menu toggler's boolean state ("isMenuOpen").
 *
 * @returns The current type if `isOpen` is false, or the opposite type if it
 *   is true.
 */
export function getType(typeProp, isOpen) {
  const [typeName, variation] = typeProp?.split("-")

  switch (typeName) {
    case "primary":
      return concatType(isOpen ? "secondary" : "primary", variation)
    case "secondary":
      return concatType(isOpen ? "primary" : "secondary", variation)
    default:
      return typeName ?? typeProp
  }
}

/**
 * Returns a valid `type`, resulting of the concatenation of `typeName` and
 * `variation` ('primary', 'secondary-1', ...).
 *
 * If `variation` is falsy, it returns `typeName` as is.
 *
 * @param {string} typeName App's main theme. Can be one of 'primary' or
 *   'secondary'.
 *
 * @param {string?} variation Theme variation. Can be one of '0', '1', '2' or
 *   a falsy value.
 */
function concatType(typeName, variation) {
  if (variation) return typeName + "-" + variation
  return typeName
}
