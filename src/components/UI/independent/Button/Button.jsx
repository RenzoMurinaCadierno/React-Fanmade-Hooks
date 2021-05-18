import { useEffect, useState, useCallback, useRef, memo } from "react"
import { classes } from "./Button.utils"

/**
 * Renders a functional button UI.
 *
 * @param {object} props
 *
 * `children?` (React.Node): anything React can render, though a string is
 *   recommended.
 *
 * `disabled?` (boolean): button's disabled property.
 *
 * `type?` (string): primary or secondary app's global style theme. Can be one
 *   of "primary", "primary-1", "secondary", "secondary-1", "danger" or
 *   "danger-1". Defaults to "primary".
 *
 * `coloredBg?` (boolean): true adds a trasluscent background that matches the
 *   button type, false leaves the background transparent. Defaults to false.
 *
 * `onClick?` (function): callback assigned to the button's click.
 *
 * `className?` (string): incoming className string to add to '*button*'.
 */
function Button({
  children,
  disabled,
  type,
  coloredBg,
  onClick,
  className,
  ...otherProps
}) {
  // state to add/remove classNames that animate the button
  const [growState, setGrowState] = useState(false)
  // we handle `onClick` in useEffect, which cannot recieve the event object
  // from click handler. As a workaround, we partially save it in a ref
  const eventTarget = useRef(null)

  const handleClick = useCallback(
    (e) => {
      // save the event object in ref to pass it to `onClick` in useEffect
      eventTarget.current = e
      // set state to true, which triggers useEffect
      setGrowState(true)
    },
    [setGrowState]
  )

  // eslint will warn us to add `onClick` to dependencies, but we cannot do it.
  // If we did and `onClick` changes, it will re-trigger this useEffect
  // instantly, thus firing "setGrowState" inside and causing an infinite loop.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let growTimeout
    if (growState) {
      growTimeout = setTimeout(() => {
        // set state back to false, which removes grow animation className
        setGrowState(false)
      }, 100)
      // fire `onClick`. Event target was saved previously by "handleClick"
      onClick?.(eventTarget.current)
      // reset "eventTarget" it so no residual data is kept between renders
      eventTarget.current = null
    }
    return () => clearTimeout(growTimeout)
  }, [growState])

  return (
    <button
      disabled={disabled}
      onClick={disabled ? null : handleClick}
      className={classes.container(growState, type, coloredBg, className)}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default memo(Button)
