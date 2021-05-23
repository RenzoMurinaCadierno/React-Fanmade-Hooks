import { ExpandableIcon, Aura } from "hub"
import {
  classes,
  expandableMenuMainIconPropTypes
} from "./ExpandableMenuMain.utils"

/**
 * Renders the icon that toggles the expandable menu on/off, that is, the one
 * responsible of changing the state that shows or hides
 * '*ExpandableMenuListIcon*'(s).
 *
 * It also renders an '*Aura*' surrounding the icon.
 *
 * @param {object} props
 *
 * `type?` (string): This app's theme stylings to apply to both '*Aura*' and
 *   '*ExpandableIcon*'. Defaults to 'primary' and can be one of 'primary',
 *   'primary-1', 'primary-2', 'secondary', 'secondary-1', 'secondary-2',
 *   'danger', 'danger-1', 'danger-2'.
 *
 * `open` (boolean): true shows all hidden '*ExpandableMenuListIcon*'(s)
 *   declared in parent component ('*ExpandableMenuRoot*'), false hides them
 *   again.
 *
 * > **Note:** When rendered by '*ExpandableMenuRoot*', '*ExpandableIcon*' here
 *   will automatically toggle styles depending on the state of this prop.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Props to spread in '*Aura*'.
 *
 * `...expandableIconProps?` (object): Props to spread in '*ExpandableIcon*'.
 */
export default function ExpandableMenuMainIcon({
  type = "primary",
  open = false,
  classNames = {},
  auraProps = {},
  ...expandableIconProps
}) {
  return (
    <Aura
      isActive={!open}
      type={type}
      classNames={classes.aura(classNames.aura)}
      {...auraProps}
    >
      <ExpandableIcon
        type={type}
        expand={false}
        classNames={classes.icon(classNames.icon, open)}
        {...expandableIconProps}
      />
    </Aura>
  )
}

ExpandableMenuMainIcon.propTypes = expandableMenuMainIconPropTypes
