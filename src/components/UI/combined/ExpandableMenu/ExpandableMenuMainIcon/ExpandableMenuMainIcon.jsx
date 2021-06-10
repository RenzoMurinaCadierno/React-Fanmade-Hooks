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
 * `type?` (string): This app's theme stylings to apply to '*Icon.WithAura*'.
 *   Defaults to 'primary' and can be one of 'primary', 'primary-1',
 *   'secondary', 'secondary-1', 'danger', 'danger-1'.
 *
 * `open` (boolean): true shows all hidden '*ExpandableMenuListIcon*'(s)
 *   declared in parent component ('*ExpandableMenuRoot*'), false hides them
 *   again.
 *
 * > **Note:** When rendered by '*ExpandableMenuRoot*', '*Icon.WithAura*' here
 *   will automatically toggle styles depending on the state of this prop.
 *
 * `rotateOnOpen` (boolean): true will perform a 180deg rotation on
 *   '*Icon.Expandable.WithAura*' when menu is opened (`open` is true).
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Props to spread in '*Icon.WithAura* inner '*Aura*'.
 *
 * `iconProps?` (object): Props to spread in '*Icon.WithAura*' inner '*Icon*'.
 *
 */
export default function ExpandableMenuMainIcon({
  children,
  type,
  open,
  rotateOnOpen,
  classNames,
  auraProps,
  ...iconProps
}) {
  const computedAuraProps = { isActive: !open, type, ...auraProps }

  return (
    <Icon.WithAura
      type={type}
      auraProps={computedAuraProps}
      classNames={classes.icon(open, rotateOnOpen, classNames)}
      {...iconProps}
    >
      {children}
    </Icon.WithAura>
  )
}

ExpandableMenuMainIcon.defaultProps = defaultProps
ExpandableMenuMainIcon.propTypes = propTypes
