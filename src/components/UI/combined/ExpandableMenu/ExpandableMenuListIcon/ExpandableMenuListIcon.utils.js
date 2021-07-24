import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./ExpandableMenuListIcon.module.css"

export const classes = {
  icon: (classNames = {}) => ({
    ...classNames,
    container: styles.Icon + cn.get(classNames?.container)
  }),
  iconWithToast: (classNames = {}) => ({
    iconExpandable: {
      ...classNames,
      container: styles.Icon + cn.get(classNames?.container)
    },
    toast: classNames?.toast
  })
}

export const defaultProps = { spread: "top", classNames: {} }

const iconExpandableClassNamesExactShape = PropTypes.exact({
  container: PropTypes.string,
  icon: PropTypes.string,
  content: PropTypes.string,
  barrier: PropTypes.string
})

const toastClassNamesExactShape = PropTypes.exact({
  container: PropTypes.string,
  content: PropTypes.string,
  toggler: PropTypes.string
})

export const propTypes = {
  show: PropTypes.bool.isRequired,
  order: PropTypes.number.isRequired,
  amountOfIcons: PropTypes.number.isRequired,
  spread: PropTypes.string,
  iconExpandDirection: PropTypes.string,
  toastProps: PropTypes.object,
  classNames: PropTypes.oneOfType([
    // classNames for '*Icon.Expandable*'
    iconExpandableClassNamesExactShape,
    // classNames for '*Icon.Expandable.WithToast*'
    PropTypes.exact({
      iconExpandable: iconExpandableClassNamesExactShape,
      toast: toastClassNamesExactShape
    })
  ]),
  iconProps: PropTypes.object
}

/**
 * Returns true if `toastProps` is a valid object to pass to
 * '*Icon.Expandable.WithToast*'.
 *
 * Such case will make '*ExpandableMenuListIcon*' render that children
 * component. Otherwise, '*Icon.Expandable*' will take its place.
 *
 * @param {object} toastProps '*ExpandableMenuListIcon*' `toastProps`
 */
export function isIconWithToast(toastProps) {
  return (
    toastProps && typeof toastProps === "object" && toastProps instanceof Object
  )
}

/**
 * Returns an object to spread on either rendered '*Icon*' `style`, populated
 * with either visible or hidden stylings, depending on `show`.
 *
 * @param {number} order Current icon's position as an incremental integer
 *   starting from 0 (0, 1, 2, 3, ...).
 *
 * @param {string} spread Direction every icon spread towards when `show` is
 *   true (when they become visible). Can be one of 'top', 'right', 'bottom',
 *   'left'.
 *
 * @param {boolean} show true applies visible stylings for the icon, false adds
 *   hidden stylings to it.
 *
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
