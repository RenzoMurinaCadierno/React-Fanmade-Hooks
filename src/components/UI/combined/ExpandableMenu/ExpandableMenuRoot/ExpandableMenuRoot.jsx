import { memo } from "react"
import { useToggle, ExpandableMenu } from "hub"
import {
  classes,
  getDefaultIconProps,
  getIconExpandDirection,
  getIconSpreadDirection,
  getType,
  expandableMenuRootPropTypes
} from "./ExpandableMenuRoot.utils"

/**
 * Renders a round menu icon that, when tapped, displays a list of expandable
 * icons. If the list is being displayed, tapping again will hide that list.
 *
 * '*ExpandableIcon*'s are used for both menu icon ('*ExpandableMenuMainIcon*')
 * and list icons ('*ExpandableMenuListIcon*').
 *
 * Anchor positioning for the menu icon, as well as spread and expand direction
 * for list icons, theme styling and props to spread are all controllable by
 * props.
 *
 * @param {object} props
 *
 * `anchor` (string): The absolute positioning of the component, relative to
 *   its parent. Defaults to 'bottom-right' and can be one of 'center',
 *   'top-left', 'top', 'top-right, 'right', 'bottom-right', 'bottom',
 *   'bottom-left' and 'left'.
 *
 * `spread` (string): The direction '*ExpandableMenuListIcon*'(s) will spread
 *   towards when being rendered visible on screen (that is, when the user opens
 *   the menu). Can be one of 'top', 'right', 'bottom', 'left'. Defaults to one
 *   calculated by "getIconSpreadDirection" given `anchor`.
 *
 * `type?` (string): This app's theme stylings to apply to everything rendered
 *   here. Defaults to 'primary' and can be one of 'primary', 'primary-1',
 *   'secondary', 'secondary-1', 'danger', 'danger-1'.
 *
 * > **Note**: it is advised to use the 'primary' and 'secondary' values and
 *   their variations if possible. Theme color's auto-toggling is only
 *   available on those two.
 *
 * `iconsProps` (object): Object with two keys, 'main' and 'list', and their
 *   values being:
 * > * 'main': a single object containing all props to spread in
 *     '*ExpandableMenuMainIcon*' ('menu toggler' icon). `icon` and `content`
 *     are mandatory.
 * > * 'list': an array of objects, one for each '*ExpandableMenuListIcon*'
 *     ('list item' icon) containing props to spread on them individually.
 *     Like in 'main', `icon` and `content` must be provided on each.
 *
 * > Defaults to the result of "getDefaultIconProps", calculated on current
 *   `spread`.
 *
 * > **Note:** check *utils.js* for a clean example of its shape, at
 *     "getDefaultIconProps".
 *
 * `listIconsExpandDirection?` (string): '*ExpandableMenuListIcon*' inner
 *   '*ExpandableIcon*'s `expandDirection`. It tells each '*ExpandableIcon*'
 *   where to expand when focused on.
 *
 *   > * Can be one of 'left', 'right'.
 *   > * Defaults to one calculated by "getIconExpandDirection" with current
 *     `anchor` as input.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `menuIconProps?` (object): Props to spread in '*ExpandableMenuMainIcon*'.
 *
 * `listIconsProps?` (object): Props to spread to '*ExpandableMenuListIcon*'.
 *
 * > **Note:** Use this object to spread common props in all
 *   '*ExpandableMenuListIcon*', and `iconsProps.list` to spread props meant
 *   to be unique on particular instances of '*ExpandableMenuListIcon*'.
 */
function ExpandableMenuRoot({
  anchor = "bottom-right",
  spread = getIconSpreadDirection(anchor),
  type = "secondary",
  iconsProps = getDefaultIconProps(spread),
  listIconsExpandDirection = getIconExpandDirection(anchor),
  classNames = {},
  menuIconProps = {},
  listIconsProps = {},
  ...otherProps
}) {
  // toggler to 'open menu' ('show list icons')
  const [isMenuOpen, toggleMenuOpen] = useToggle(false)

  const _expandableIconProps = {
    content: iconsProps.main.content,
    icon: iconsProps.main.icon,
    onIconClick: toggleMenuOpen,
    ...menuIconProps.icon
  }

  return (
    // wrapper container
    <div
      className={classes.container(anchor, classNames.container)}
      {...otherProps}
    >
      {/* 'menu icon' (main button, the toggler) */}
      <ExpandableMenu.MainIcon
        type={getType(type, isMenuOpen)}
        open={isMenuOpen}
        classNames={classes.mainIcon(classNames.mainIcon)}
        auraProps={menuIconProps.aura}
        expandableIconProps={_expandableIconProps}
      />
      {/* all 'list icons', displayed when "isMenuOpen" becomes true */}
      {iconsProps.list.map((currentIconProps, i) => (
        <ExpandableMenu.ListIcon
          key={i}
          type={type}
          show={isMenuOpen}
          order={i}
          amountOfIcons={iconsProps.list.length}
          spread={spread}
          iconExpandDirection={listIconsExpandDirection}
          classNames={classes.listIcon(classNames.listIcon)}
          {...listIconsProps}
          {...currentIconProps}
        />
      ))}
    </div>
  )
}

ExpandableMenuRoot.propTypes = expandableMenuRootPropTypes

export default memo(ExpandableMenuRoot)