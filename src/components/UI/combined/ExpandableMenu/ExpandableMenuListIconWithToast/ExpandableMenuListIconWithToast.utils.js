import PropTypes from "prop-types"
import styles from "./ExpandableMenuListIconWithToast.module.css"

export const classes = {
  listIcon: (classNames = {}) => ({
    expandableIcon: {
      ...classNames?.icon,
      container: (classNames?.icon?.container ?? "") + " " + styles.Icon
    },
    toast: classNames?.toast
  })
}

export const defaultProps = { spread: "top", classNames: {} }

export const propTypes = {
  show: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  amountOfIcons: PropTypes.number.isRequired,
  spread: PropTypes.string,
  iconExpandDirection: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string,
    barrier: PropTypes.string
  }),
  otherProps: PropTypes.object
}

/**
 * Returns an object to spread on '*ExpandableIcon*' `style`, populated with
 * either visible or hidden stylings, depending on `show` state.
 *
 * @param {number} order Current icon's position as an incremental integer
 *   starting from 0 (0, 1, 2, 3, ...).
 * @param {string} spread Direction every icon spread towards when `show` is
 *   true (when they become visible). Can be one of 'top', 'right', 'bottom',
 *   'left'.
 * @param {boolean} show true applies visible stylings for the icon, false adds
 *   hidden stylings to it.
 * @param {number} amountOfIcons The total amount of icons rendered in the
 *   list (normally in '*ExpandableMenuRoot*'). Used to determine each icon's
 *   "z-index", which comes in play when `spread` is either 'left' or 'right'
 *   (as they will overlay with each other at the same level if "z-index" is
 *   not present).
 */
export function getStyle(order, spread, show, amountOfIcons) {
  const translationAxis = spread === "right" || spread === "left" ? "X" : "Y"
  const topZeroIfAxisIsX = translationAxis === "X" ? { top: 0 } : {}
  const sign = spread === "left" || spread === "top" ? "-" : "+"

  return show
    ? {
        transform: `translate${translationAxis}(${sign + 150 * order}%)`,
        [spread]: "-160%",
        ...topZeroIfAxisIsX, // fix top = 0 (align to menu icon) for 'left' and 'right'
        opacity: 1,
        zIndex: amountOfIcons - order // overlay icons on 'left' and 'right'
      }
    : {
        transform: `translate${translationAxis}(0)`,
        [spread]: 0,
        ...topZeroIfAxisIsX,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none"
      }
}
