import { Icon } from "hub"
import {
  classes,
  expandableMenuListIconPropTypes,
  getStyle
} from "./ExpandableMenuListIcon.utils"

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
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `...otherProps?` (object): Props to spread in '*Icon.Expandable*'.
 */
export default function ExpandableMenuListIcon({
  show,
  order,
  amountOfIcons,
  spread = "top",
  iconExpandDirection,
  classNames = {},
  ...otherProps
}) {
  return (
    <Icon.Expandable
      expandDirection={iconExpandDirection}
      classNames={classes.icon(classNames)}
      style={getStyle(order, spread, show, amountOfIcons)}
      {...otherProps}
    />
  )
}

ExpandableMenuListIcon.propTypes = expandableMenuListIconPropTypes
