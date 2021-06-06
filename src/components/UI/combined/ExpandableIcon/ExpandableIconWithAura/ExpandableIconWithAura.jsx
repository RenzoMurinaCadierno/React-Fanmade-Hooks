import { Icon, Aura } from "hub"
import {
  classes,
  defaultProps,
  propTypes
} from "./ExpandableIconWithAura.utils"

/**
 * Renders an '*ExpandableIcon*' with an '*Aura*' surrounding it.
 *
 * @param {object} props
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Props to spread in '*Aura*'.
 *
 * `expandableIconProps` (object): Props to spread in '*Icon.Expandable*'.
 */
export default function ExpandableIconWithAura({
  classNames,
  auraProps,
  expandableIconProps
}) {
  return (
    <Aura classNames={classes.aura(classNames.aura)} {...auraProps}>
      <Icon.Expandable
        classNames={classes.expandableIcon(classNames.expandableIcon)}
        {...expandableIconProps}
      />
    </Aura>
  )
}

ExpandableIconWithAura.defaultProps = defaultProps
ExpandableIconWithAura.propTypes = propTypes
