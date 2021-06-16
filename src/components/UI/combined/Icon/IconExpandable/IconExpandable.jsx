import { useState } from "react"
import { Icon } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  typeOf
} from "./IconExpandable.utils"

/**
 * Renders a circle-shaped icon with the ability to expand itself to show its
 * content (preferrably type string), upon focusing or tapping it.
 *
 * When expanded, tapping the icon again will shrink it to its original state.
 *
 * @param {object} props
 *
 * `type?` (string): App's theme styling types. Defines the colors and shadows
 *   of the component. It can be one of 'primary', 'primary-1', 'secondary'
 *   and 'secondary-1'.
 *
 * `icon` (string | React.Element): the icon to display as main UI. It can
 *   be a string of up to 2 characters long or a React.Element type 'img'.
 *
 * `content?` (string | React.element): the content to show when the
 *   component is expanded (active). It can be any React.Element, but it is
 *   recommended to be a string as the component is suited for such.
 *
 * `expand?` (boolean): manual 'expanded' state to control whether the
 *   content is showing or not.
 * > **Note:** the component handles its own state, so this prop is optional
 *     and not recommended unless you want to freeze expanded state.
 *
 * `expandDirection?` (string): 'left' or 'right'. Controls the orientation
 *   the content of '*span*' will enlarge towards. Defaults to 'right'.
 *
 * `tabIndex?` (number): Destructured due to it being needed to control
 *   "onFocus" and "onBlur" internal handlers. Defaults to 0 for all icons, but
 *   can be overriden if tab navigation needs to be fine tuned.
 *
 * `onFocus?` (function): parent container's "onFocus" handler.
 *
 * `onBlur?` (function): parent container's "onBlur" handler.
 *
 * `onIconClick?` (function): parent container's "onClick" handler. Named
 *   'onIconClick' and not 'onContainerClick' to be more intuitive (UI displays
 *   an icon, indeed).
 *
 * `onContentClick?` (function): content '*span*'s "onClick" handler.
 *
 * `disabled?` (boolean): disabled prop for everything rendered. Controls the
 *   appearance and the functional availability of all handlers.
 *
 * `classNames?` (object): className strings for everything rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `iconProps?` (object): Props to pass to '*Icon*'.
 *
 * `contentProps?` (object): Props to pass to '*span*' ('*Icon*' content).
 *
 * `barrierProps?` (object): Props to pass to 'barrier' '*div*'.
 *
 * `...otherProps?` (object): Props to pass to wrapper container '*div*'.
 */
function IconExpandable({
  type,
  icon,
  content,
  expand,
  expandDirection,
  tabIndex,
  onFocus,
  onBlur,
  onIconClick,
  onContentClick,
  disabled,
  classNames,
  iconProps,
  contentProps,
  barrierProps,
  ...otherProps
}) {
  const [st, setSt] = useState({ isFocused: false, isExpanded: false })

  /**
   * Shows `content` on focus if `expand` is either undefined or not a boolean.
   */
  const handleFocus = (e) => {
    if (typeOf(expand).is("boolean")) return onFocus?.(e)
    setSt((prevSt) => ({ ...prevSt, isFocused: true, isExpanded: true }))
    onFocus?.(e)
  }

  /**
   * Hides `content` on blur if `expand` is either undefined or not a boolean.
   */
  const handleBlur = (e) => {
    if (typeOf(expand).is("boolean")) return onBlur?.(e)
    setSt((prevSt) => ({ ...prevSt, isExpanded: false }))
    onBlur?.(e)
  }

  /**
   * Shows `content` if the component was not previously focused on, or toggles
   * "st.isExpanded" if it was (thus hiding/showing `content`).
   */
  const handleContainerClick = (e) => {
    if (typeOf(expand).is("boolean")) return onIconClick?.(e)
    setSt((prevSt) => ({
      ...prevSt,
      isFocused: false,
      isExpanded: prevSt.isFocused ? true : !prevSt.isExpanded
    }))
    onIconClick?.(e)
  }

  /**
   * Intercepts clicks on content so that they trigger their respective
   * handlers and they do not propagate to parent container. If they did, they
   * would fire a state update, setting "st.isExpanded" to false. No good.
   */
  const handleContentClick = (e) => {
    e.stopPropagation()
    onContentClick?.(e)
  }

  return (
    <div
      disabled={disabled} // to add disabled styles
      tabIndex={tabIndex ?? 0}
      onFocus={disabled ? null : handleFocus}
      onBlur={disabled ? null : handleBlur}
      onClick={disabled ? null : handleContainerClick}
      className={classes.container(classNames?.container)}
      {...otherProps}
    >
      <Icon
        type={type}
        disabled={disabled} // to add disabled styles
        className={classes.icon(classNames?.icon)}
        {...iconProps}
      >
        {/* if `icon` is a string, use up to 2 chars from it */}
        {typeOf(icon).is("string") && icon.length > 2 ? icon.slice(0, 2) : icon}
        <span
          onClick={disabled || !st.isExpanded ? null : handleContentClick}
          disabled={disabled} // disable content click action
          className={classes.content(
            // use `expand` if defined, local state if not
            expand ?? st.isExpanded,
            expandDirection,
            classNames?.content
          )}
          {...contentProps}
        >
          {content}
        </span>
        {/* invisible '*div*' to capture clicks on the border of the icon to 
         prevent propagation to content's "onClick" handler if content is not
         expanded */}
        <div
          className={classes.barrier(classNames?.barrier)}
          {...barrierProps}
        />
      </Icon>
    </div>
  )
}

IconExpandable.defaultProps = defaultProps
IconExpandable.propTypes = propTypes

export default IconExpandable

// export default memo(IconExpandable)
