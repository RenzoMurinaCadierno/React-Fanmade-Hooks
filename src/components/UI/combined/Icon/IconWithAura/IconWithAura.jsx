import { Icon, Aura } from "hub"
import { classes, defaultProps, propTypes } from "./IconWithAura.utils"

/**
 * Renders either and '*Icon*' or an '*Icon.Expandable*', both with an '*Aura*'
 * surrounding it.
 *
 * @param {object} props
 *
 * `isExpandable?` (boolean): `true` will render an '*Icon.Expandable*', `false`
 *   calls for an '*Icon*'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Props to spread in '*Aura*'.
 *
 * `...iconProps` (object): Props to spread in either '*Icon*' or
 *   '*Icon.Expandable*'.
 */
export default function IconWithAura({
  isExpandable,
  classNames,
  auraProps,
  ...iconProps
}) {
  return (
    <Aura classNames={classes.aura(classNames.aura)} {...auraProps}>
      {isExpandable ? (
        <Icon.Expandable
          classNames={classes.iconExpandable(classNames.iconExpandable)}
          {...iconProps}
        />
      ) : (
        <Icon className={classes.icon(classNames.icon)} {...iconProps} />
      )}
    </Aura>
  )
}

IconWithAura.defaultProps = defaultProps
IconWithAura.propTypes = propTypes
