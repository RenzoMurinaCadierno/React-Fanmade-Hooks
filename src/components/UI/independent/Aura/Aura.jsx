import { classes, defaultProps, propTypes } from "./Aura.utils"

/**
 * Creates an "aura" effect on the wrapped component.
 *
 * It renders with full visibility at the center point of its closest parent
 * component with "position: relative" CSS property, and expands outwards
 * while blurring out.
 *
 * @param {object} props
 *
 * `children` (React.Element | string | number): Only one instance of Number,
 *   String or React.Element.
 *   * **Note:** '*Aura*' effect can render improperly if more than one element
 *      is present in `children`.
 *
 * `isActive?` (boolean): False disables the effect. Defaults to true.
 *
 * `type?` (string): Controls background-color of the aura effect. Defaults to
 *   'primary'. Can be one of 'primary', 'primary-1', 'primary-2', 'secondary',
 *   'secondary-1', 'secondary-2', 'danger', 'danger-1', 'danger-2'.
 *   * **Note:** `type` is bound to this app's theme, but can be changed
 *      declaring "background-color" rule in "style" object, inside
 *      `auraProps`.
 *
 * `blink?` (string): The time aura effect stays visible during its iteration
 *   interval. The longer it stays visible, the shorter the pause before the
 *   next iteration. Can be one of 'short', 'normal', 'long'. Defaults to
 *   'normal'.
 *
 * `size?` (string): Aura effect's size. Can be one of 'small', 'normal',
 *   'large'. Defaults to 'normal'.
 *
 * `interval?` (string): Full animation iteration's duration (that is, aura
 *   effect + pause before next iteration). Can be one of 'short', 'normal',
 *   'long'. Defaults to 'normal'.
 *
 * `inheritBoxShape?` (boolean): By default, aura renders with "border-radius"
 *   of 50% (circle shaped). Setting this prop to true will inherit parent's
 *   "border-radius", shaping the aura like its parent's rect.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `auraProps?` (object): Additional props to pass to aura effect's
 *   '*div*'.
 *
 * `otherProps?` (object): Additional props to pass to wrapper container's
 *   '*div*'.
 */
export default function Aura({
  children,
  isActive,
  type,
  blink,
  size,
  interval,
  inheritBoxShape,
  classNames,
  auraProps,
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      {children}
      <div
        className={classes.aura(
          isActive,
          type,
          blink,
          size,
          interval,
          inheritBoxShape,
          classNames.aura
        )}
        {...auraProps}
      />
    </div>
  )
}

Aura.defaultProps = defaultProps
Aura.propTypes = propTypes
