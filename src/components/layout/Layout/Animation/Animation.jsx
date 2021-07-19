import { useState, useEffect } from "react"
import { useValueToggle } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getOnOffAndTimeout
} from "./Animation.utils"

/**
 *
 * @param {object} props
 *
 * `children` (React.Node): Anything React can render.
 *
 * `mount` (string): animation to be played when component mounts.
 * * Can be one of 'top', 'right', 'bottom', 'left', 'grow', 'shrink'.
 * * Defaults to 'left'.
 * * If left undefined, animation state automatically skips to 'idle'.
 *
 * `mount` (string): animation played when component mounts.
 * * Can be one of 'top', 'right', 'bottom', 'left', 'grow', 'shrink'.
 * * Defaults to 'right'.
 * * If left undefined, animation state automatically skips to 'idle'.
 *
 * `idle` (string): animation played after 'mount' animation finished (if
 *   `mount` is defined), or when component mounts (if it is not).
 * * Can be one of 'scale', 'fade', 'scale-fade'.
 * * Defaults to 'scale'.
 * * If left undefined, animation state automatically skips to 'unmount'.
 *
 * `unmount` (string): animation played when component unmounts.
 * * Fires either:
 *   * at 'mount' animation finish if `idle` is undefined,
 *   * after `timeout` if `idle` is defined,
 *   * at mount phase if both `mount` and `idle` are undefined.
 * * Can be one of 'top', 'right', 'bottom', 'left', 'grow', 'shrink'.
 * * Defaults to 'right'.
 * * If defined, `children` will unmount from DOM when 'unmount' animation
 *    finishes.
 * * If undefined, no animation is played at unmount and component will
 *    stay rendered in DOM.
 */
go on commenting, test everything and start combining with orientation
export default function Animation({
  children,
  mount,
  idle,
  unmount,
  timeout,
  onMountStart,
  onMountFinish,
  onIdleStart,
  onUnmountStart,
  onUnmountFinish,
  className,
  ...otherProps
}) {
  // controls animation-handler '*div*' and `children` render
  const [show, setShow] = useState(false)

  /**
   * 'mount' animation className and toggler.
   * > Fires at mount phase if `mount` is defined.
   * > Sets "show" to true when triggered and fires 'idle' or 'unmount'
   *   animations (if any is defined) upon finish.
   */
  const [mountCN, triggerMountCN, isMountTriggered] = useValueToggle({
    ...getOnOffAndTimeout(mount, "mount", 250),
    onStart: () => {
      setShow(true)
      onMountStart?.()
    },
    onFinish: () => {
      if (idle) triggerIdleCN()
      else if (unmount) triggerUnmountCN()
      onMountFinish?.()
    }
  })

  /**
   * 'idle' animation className, toggler and state flag.
   * > Plays indefinetly after 'mount' animation finished (if it was defined),
   *   or at mount phase otherwise.
   * > Sets "show" to true when triggered if 'mount' animation is undefined.
   * > Triggers second "useEffect" below on "isIdleTriggered" change.
   */
  const [idleCN, triggerIdleCN, isIdleTriggered] = useValueToggle({
    ...getOnOffAndTimeout(idle, "idle", 9999999999999),
    onStart: () => {
      if (!mount) setShow(true)
      onIdleStart?.()
    }
  })

  /**
   * 'unmount' animation className, toggler and state flag.
   * > Fires either:
   *   (1) at 'mount' animation finish if `idle` is undefined,
   *   (2) after `timeout` if `idle` is defined (controlled by second
   *     "useEffect" below),
   *   (3) at mount phase if both `mount` and `idle` are undefined.
   * > Sets "show" to true when triggered if both `mount` and `idle` are
   *   undefined.
   * > Sets "show" to false on animation finish.
   */
  const [unmountCN, triggerUnmountCN, isUnmountTriggered] = useValueToggle({
    ...getOnOffAndTimeout(unmount, "unmount", 250),
    onStart: () => {
      if (!mount && !idle) setShow(true)
      onUnmountStart?.()
    },
    onFinish: () => {
      setShow(false)
      onUnmountFinish?.()
    }
  })

  /**
   * At mount phase, fire the first defined life-cycle animation found.
   * If all of them are undefined, render nothing.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (mount) triggerMountCN()
    else if (idle) triggerIdleCN()
    else if (unmount) triggerUnmountCN()
  }, [])

  /**
   * When triggering 'idle' animation if `unmount` is defined, schedule
   * "triggerUnmountCN" to fire after `timeout` ms. We do this here since the
   * reference to "setTimeout" on 'idle' animation "onStart" is lost on
   * re-renders, and thus, it cannot be cleared when not needed.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const timeoutId =
      isIdleTriggered && unmount ? setTimeout(triggerUnmountCN, timeout) : null

    return () => clearTimeout(timeoutId)
  }, [isIdleTriggered])

  return (
    // render 'animation-handler' '*div*' and its children when `show` is true.
    show && (
      <div
        // note that only one animation className is active at any given time.
        // "idleCN" has 'unlimited' timeout, so its CSS "animation" rule will
        // collide with the one in "unmountCN" when the latter toggles on.
        // Thus, if "isUnmountTriggered" is true, we ignore "idleCN".
        className={
          classes.container(className) +
          (mount ? mountCN : "") +
          (idle && isUnmountTriggered ? "" : idleCN) +
          (unmount ? unmountCN : "")
        }
        {...otherProps}
      >
        {children}
      </div>
    )
  )
}

Animation.defaultProps = defaultProps
Animation.propTypes = propTypes
