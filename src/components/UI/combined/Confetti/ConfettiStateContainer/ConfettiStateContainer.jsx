import { memo, useEffect, useState } from "react"
import { Confetti } from "hub"
import { propTypes } from "./ConfettiStateContainer.utils"

/**
 * Controls '*Confetti.Cannon*' `show`, setting it to true once this component's
 * inner active state becomes truthy, and resets it to false after generic
 * confetti animation timeout of 2500ms expires.
 *
 * This component also fires `onStart` when animation starts, and `onFinish`
 * when animation timeout ends.
 *
 * @param {object} props
 *
 * `show` (boolean): A state that, when switches to truthy, it sets inner
 *   active state to `true`, which renders '*Confetti.Cannon*' JSX in DOM,
 *   triggering its 'popping confetti' animation. Inner state will
 *   automatically toggle back to `false` once generic animation timeout
 *   expires (2500 milliseconds).
 *
 * `onStart?` (function): Callback that triggers once inner state toggles to
 *   `true` (on animation start, when '*Confetti.Cannon*' renders in DOM).
 *
 * `onFinish?` (function): Callback that triggers once inner state toggles to
 *   `false` (on animation finish, when '*Confetti.Cannon*' removes itself from
 *   DOM).
 *
 * **_Note:_** It is advised to set outer `show` state to false using
 *   `onFinish`, so that both inner and outer states are in sync.
 *
 * `...otherProps?` (object): Props to spread in '*Confetti.Cannon*'. `show` is
 *   not passed, as it is controlled by this component.
 */
function ConfettiStateContainer({ show, onStart, onFinish, ...otherProps }) {
  // controls '*Confetti.Cannon*' `show`, toggling to true when this component's
  // `show` becomes true, and resets to false after confetti animation expires
  // (2500 ms).
  const [isActive, setIsActive] = useState(false)

  /**
   * When `show` changes, if it is truthy and "isActive" is not (a previous
   * animation is not in progress), then set "isActive" to true. This renders
   * the JSX in '*Confetti.Cannon*', launching a new animation.
   *
   * Such case also triggers `onStart` if defined.
   */
  useEffect(() => {
    if (show && !isActive) {
      setIsActive(true)
      typeof onStart === "function" && onStart()
    }
  }, [show])

  /**
   * When "isActive" toggles due to useEffect above, if it is `true`, set a
   * timeout to reset it back to `false` after 2500 ms. This ensures that JSX
   * in '*Confetti.Cannon*' unmounts from DOM after animation timeout expires.
   *
   * After that timeout, `onFinish` is triggered, if defined.
   */
  useEffect(() => {
    let hideTimeoutId

    if (isActive) {
      hideTimeoutId = setTimeout(() => {
        setIsActive(false)
        typeof onFinish === "function" && onFinish()
      }, 2500)
    }

    return () => clearTimeout(hideTimeoutId)
  }, [isActive])

  // render '*Confetti.Cannon*' with controlled `show`
  return <Confetti.Cannon {...otherProps} show={isActive} />
}

ConfettiStateContainer.propTypes = propTypes

export default memo(ConfettiStateContainer)
