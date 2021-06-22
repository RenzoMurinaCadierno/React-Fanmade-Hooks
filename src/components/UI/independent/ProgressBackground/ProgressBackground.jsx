import {
  classes,
  defaultProps,
  propTypes,
  getProgressWidth
} from "./ProgressBackground.utils"

/**
 * Renders a 'progressbar background' that grows or shrinks in size depending
 * on `props`, to be used as a visual indicator for progress.
 *
 * > **_Note:_** While this component can be a direct children to anything that
 *   accepts it, it has `position: 'absolute'`, with `height: '100%'` and
 *   self-controlled `width` (to paint iself). This means **its parent component
 *   must have `position: 'relative'`** and preferably non-intrinsic `height`
 *   and `width`.
 *
 * @param {object} props
 *
 * `show?` (boolean): `true` renders the component. Defaults to `true`.
 *
 * `min` (number): The lowest progress limit. Cannot be higher than `value` or
 *   `max`.
 *
 * `value` (number): The current progress value. Cannot be lower than `min`
 *   or higher than `max`.
 *
 * `max` (number): The highest progress limit. Cannot be lower than `value` or
 *   `min`.
 *
 * `shrink` (boolean): `true` will start with `width: "100%"` and decrease as
 *   `value` increases, like an 'inverted' progressbar. `false` starts at
 *   `width: "0%"` and grows up to 100%.
 *
 * `type` (string): This app's theme types, to apply as background color in this
 *   component.
 * * Defaults to 'primary'.
 * * Can be one of 'primary', 'primary-1', 'primary-2', 'primary-3',
 *   'secondary', 'secondary-1', 'secondary-2', 'secondary-3', 'danger',
 *   'danger-1', 'danger-2', 'danger-3'.
 *
 * `className?` (string): `className` string to add to container '*div*'.
 */
export default function ProgressBackground({
  show,
  min,
  value,
  max,
  shrink,
  type,
  className,
  ...otherProps
}) {
  return (
    show && (
      <div
        className={classes.container(type, className)}
        style={{ width: getProgressWidth(min, value, max, shrink) }}
        {...otherProps}
      />
    )
  )
}

ProgressBackground.defaultProps = defaultProps
ProgressBackground.propTypes = propTypes
