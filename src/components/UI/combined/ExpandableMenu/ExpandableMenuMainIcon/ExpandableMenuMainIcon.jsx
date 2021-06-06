import { Icon } from "hub"
import { classes, defaultProps, propTypes } from "./ExpandableMenuMain.utils"

/**
 * Renders the icon that toggles the expandable menu on/off, that is, the one
 * responsible of changing the state that shows or hides
 * '*ExpandableMenuListIcon*'(s).
 *
 * It also renders an '*Aura*' surrounding the icon.
 *
 * @param {object} props
 *
 * `type?` (string): This app's theme stylings to apply to '*Icon.Expandable*'.
 *   Defaults to 'primary' and can be one of 'primary', 'primary-1',
 *   'secondary', 'secondary-1', 'danger', 'danger-1'.
 *
 * `open` (boolean): true shows all hidden '*ExpandableMenuListIcon*'(s)
 *   declared in parent component ('*ExpandableMenuRoot*'), false hides them
 *   again.
 *
 * > **Note:** When rendered by '*ExpandableMenuRoot*', '*Icon.Expandable*' here
 *   will automatically toggle styles depending on the state of this prop.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Props to spread in '*Icon.Expandable.WithAura*'s
 *   '*Aura*'.
 *
 * `expandableIconProps?` (object): Props to spread in
 *   '*Icon.Expandable.WithAura*'s '*ExpandableIcon*'.
 */
export default function ExpandableMenuMainIcon({
  type,
  open,
  classNames,
  auraProps,
  expandableIconProps
}) {
  const _auraProps = {
    isActive: !open,
    type,
    ...auraProps
  }

  const _expandableIconProps = {
    type,
    expand: false,
    ...expandableIconProps
  }

  return (
    <Icon.Expandable.WithAura
      auraProps={_auraProps}
      expandableIconProps={_expandableIconProps}
      classNames={classes.icon(open, classNames)}
    />
  )
}

ExpandableMenuMainIcon.defaultProps = defaultProps
ExpandableMenuMainIcon.propTypes = propTypes
