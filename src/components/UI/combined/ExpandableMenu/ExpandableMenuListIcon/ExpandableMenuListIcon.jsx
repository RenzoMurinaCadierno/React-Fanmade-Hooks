import { Icon } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  isIconWithToast,
  getStyle
} from "./ExpandableMenuListIcon.utils"
check all files and comments in icons except iconwithtoast/aura. Then cmpDesc
then Compose Inputs
/**
 * Renders a list icon to be displayed when '*ExpandableMenuMainIcon*' toggler
 * switches its `open` state to true.
 *
 * Its `show` property must be synchronized to the opposite state of `open` on
 * the associated '*ExpandableMenuMainIcon*'.
 *
 * Moreover, when several '*ExpandableMenuListIcon*'s are rendered sequentially,
 * they must follow an incremental integer `order` starting from 0, being 0 the
 * icon closest to '*ExpandableMenuMainIcon*', 1 the follow-up, and so on.
 *
 * The total amount of rendered icons must be provided to `amountOfIcons` for
 * "z-index" managing, so components do not overlay against each other.
 *
 * Defining `toastProps` as a valid object will render an
 * '*ExpandableIconWithToast*', passing `toastProps` as its inner '*Toast*'
 * `props`. If left undefined or if it is not a valid object, this component
 * will render an '*ExpandableIcon*' instead.
 *
 * @param {object} props
 *
 * `show` (boolean): True applies 'visible' stylings to the icons, rendering
 *   them visually on screen. False applies 'hide' stylings.
 *
 * `order` (number): The order in which current '*ExpandableMenuListIcon*' is
 *   rendered on screen. Must be defined and accepts an incremental integer
 *   starting from 0 (0, 1, 2, 3, ...). 0 correlates to the icon closest to
 *   '*ExpandableMenuMainIcon*' (toggler), and the highest integer to the
 *   furthest icon.
 *
 * `amountOfIcons` (number): The total amount of '*ExpandableMenuListIcon*' to
 *   be rendered on screen. Used to calculate the "z-index" to apply to each
 *   item as `style` so that they do not overlay with each other when being
 *   expanded horizontally.
 *
 * `spread` (string): The absolute direction the icon will spread towards when
 *   being rendered visible on screen (that is, when `show` becomes true).
 *   Can be one of 'top', 'right', 'bottom', 'left'. Defaults to 'top'
 *
 * `iconExpandDirection?` (string): '*Icon.Expandable*' `expandDirection`. Can
 *   be one of 'left' or 'right'.
 *
 * `toastProps?` (object): Props to spread in '*Icon.Expandable.WithToast*'.
 *   If defined and valid, the aforementioned component will be this one's
 *   return value. Otherwise, this component will render an '*Icon.Expandable*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `...iconProps?` (object): Props to spread in '*Icon.Expandable*' or
 *   '*Icon.Expandable.WithToast*'.
 */
export default function ExpandableMenuListIcon({
  show,
  order,
  amountOfIcons,
  spread,
  iconExpandDirection,
  classNames,
  toastProps,
  ...iconProps
}) {
  // flag to determine which '*Icon.Expandable*' to render (with or w/o toast)
  const _isIconWithToast = isIconWithToast(toastProps)
  // props shared by both '*Icon.Expandable*' and '*Icon.Expandable.WithToast*'
  const sharedIconProps = {
    expandDirection: iconExpandDirection,
    style: getStyle(order, spread, show, amountOfIcons),
    classNames:
      classes[_isIconWithToast ? "iconWithToast" : "icon"](classNames),
    ...iconProps
  }
  // if `toastProps` is defined and valid, render '*Icon.Expandable.WithToast*'.
  // Otherwise, '*Icon.Expandable*'
  return _isIconWithToast ? (
    <Icon.Expandable.WithToast toastProps={toastProps} {...sharedIconProps} />
  ) : (
    <Icon.Expandable {...sharedIconProps} />
  )
}

ExpandableMenuListIcon.defaultProps = defaultProps
ExpandableMenuListIcon.propTypes = propTypes
