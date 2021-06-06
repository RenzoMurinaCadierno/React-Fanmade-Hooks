import { useEffect, useState } from "react"
import { useClassNameToggle } from "hub"
import { classes, defaultProps, propTypes } from "./Badge.utils"

/**
 * Renders a standard circular *'Badge'* UI widget. Accepts anything React can
 * render as its content, has customizable anchor and size, and animates when
 * its content changes, as well as when mounting and unmounting.
 *
 * @param {object} props
 *
 * `show?` (boolean): True will mount the component, false will unmount it.
 *   Defaults to true.
 *
 * `content?` (React.Node): What to render inside the badge. Accepts anything
 *   React can render, but strings, numbers or '*img*'s are preferred.
 *
 * `size?` (string): Component's size relative to its closest parent container
 *   with "position: relative". Can be one of "smallest", "small", "medium",
 *   "large", "largest". Defaults to "medium".
 *
 * `anchor?` (string): Component's anchor positioning relative to its closest
 *   parent container with "position: relative". Defaults to "top-right" and
 *   accepts one of:
 *   * individual 'x' and 'y' axis: "top", "bottom", "left" or "right"
 *   * a combination of one 'x' and one 'y', joined by "-": "top-left",
 *       "bottom-right".
 *   * individual 'x' and 'y' axis, with a distance modifier (being: "far",
 *       "farthest", "close", closest"): "top-far", "right-closest".
 *   * a combinationof one 'x' and one 'y' with a distance modifier:
 *       "top-right-close", "bottom-left-farthest"
 *
 * `type?` (string): Color, background and shadows related to the theme.
 *   Can be one of "primary", "primary-1", "secondary", "secondary-1",
 *   "danger" and "danger-1". Defaults to "primary".
 *
 * `typeBackground?` (boolean): For each `type`, background is set to neutral
 *   opaque by default. Setting this prop to true will apply a background
 *   matching its respective type. Keep in mind `type` must be defined.
 *
 * `fontVariant?` (string): The font size. Can be one of "sm", "p", "h1", "h2",
 *   "h3", "h4", "h5" or "h6". Defaults to "p".
 *
 * `noBorder?` (boolean): True removes border, background color and box
 *   shadows styles. However, it adds a dark opaque text shadow to `content` as
 *   contrast.
 *
 * `animateOn?` (Array | any): a value (or array of values) this
 *   component will listen at. If one of them changes, a "grow-and-shrink"
 *   animation triggers as a visual indicator.
 *
 * `onMount?` (function): callback triggered when this component mounts.
 *
 * `onUnmount?` (function): callback triggered when this component unmounts.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `contentProps?` (object): Props to distribute on '*div*' with className
 *   'content'.
 *
 * `containerProps?` (object): Props to distribute on '*div*' with className
 *   'container'.
 */
export default function Badge({
  show,
  content,
  size,
  anchor,
  type,
  typeBackground,
  fontVariant,
  noBorder,
  animateOn,
  onMount,
  onUnmount,
  classNames,
  contentProps,
  ...containerProps
}) {
  // inner state, which will show the badge and trigger (un)mount animation
  const [isShowing, setIsShowing] = useState(!!show)
  // controls mount animation className
  const [mountCN, triggerMountAnimation] = useClassNameToggle({
    className: classes.animateMount,
    timeout: 175,
    onStart: () => {
      setIsShowing(true)
      onMount?.()
    }
  })
  // controls unmount animation className
  const [unmountCN, triggerUnmountAnimation] = useClassNameToggle({
    className: classes.animateUnmount,
    timeout: 175,
    onFinish: () => {
      setIsShowing(false)
      onUnmount?.()
    }
  })
  // controls `content` animation className, triggered when `content` changes
  const [onChangeCN, triggerOnChangeAnimation] = useClassNameToggle({
    className: classes.animateOnChange,
    timeout: 175
  })

  // when `show` changes, trigger the respective animation
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (show) triggerMountAnimation()
    else triggerUnmountAnimation()
  }, [show])

  // when `animateOn` boolean prop (or any value in it if it is an array)
  // changes, trigger 'on change' animation
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    triggerOnChangeAnimation,
    Array.isArray(animateOn) ? animateOn : [animateOn]
  )

  return (
    isShowing && ( // mount the component only if inner state is true
      <div
        className={classes.container(
          size,
          anchor,
          type,
          typeBackground,
          fontVariant,
          noBorder,
          mountCN,
          unmountCN,
          onChangeCN,
          classNames.container
        )}
        {...containerProps}
      >
        <div className={classes.content(classNames.content)} {...contentProps}>
          {content}
        </div>
      </div>
    )
  )
}

Badge.propTypes = propTypes
Badge.defaultProps = defaultProps
