import { useState, memo } from "react"
import { classes, switchPropTypes } from "./Switch.utils"

/**
 * Renders a 'Switch' (standard on/off UI element) and handles its logic.
 *
 * @param {object} props
 *
 * `initialState?` (boolean): true will render the switch's state as "on" at
 *   mount, false as "off". Defaults to false.
 *
 * `isFrozen?` (boolean): true will prevent switch state from toggling.
 *
 * `onSwitch?` (function): callback triggered when switch's state changes.
 *
 * `onSwitchOn?` (function): callback triggered when switch's state is set to
 *   "on".
 *
 * `onSwitchOff?` (function): callback triggered when switch's state is set
 *   to "off".
 *
 * `classNames?` (object): className string for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
function Switch({
  initialState = false,
  isFrozen,
  onSwitch,
  onSwitchOn,
  onSwitchOff,
  classNames = {},
  ...otherProps
}) {
  const [isOn, setIsOn] = useState(initialState)

  function handleClick(e) {
    setIsOn((prevSt) => !prevSt)
    onSwitch?.(e)
    if (isOn) onSwitchOff?.(e)
    else onSwitchOn?.(e)
  }

  return (
    <div
      className={classes.container(isOn, isFrozen, classNames.container)}
      onClick={handleClick}
      {...otherProps}
    >
      <div className={classes.slider(isOn, classNames.slider)}>
        <div className={classes.button(isOn, classNames.button)} />
      </div>
    </div>
  )
}

Switch.propTypes = switchPropTypes

export default memo(Switch)
