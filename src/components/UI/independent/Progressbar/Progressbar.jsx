import {
  classes,
  defaultProps,
  propTypes,
  getProgressStyle,
  getValidRangeValues
} from "./Progressbar.utils"

/**
 * Renders a progressbar and controls its logic given its props.
 *
 * @param {object} props
 *
 * `value?` (number): the initial percentage value as an integer. Must be a
 *   number between `min` and `max`. Defaults to 0.
 *
 * `min?` (number): the value to relate to 0% (empty progressbar), as an
 *   integer. Must be lower than `max`. Defaults to 0.
 *
 * `max?` (number): the value to relate to 100% (full progressbar), as an
 *   integer. Must be higher than `min`. Defaults to 100.
 *
 * `showValue?` (boolean): True will render the current progress value as
 *   a string inside the progressbar UI. Defaults to true.
 *
 * `unit?` (string): the trailing string to render after the percentage
 *   number inside the progressbar UI. Defaults to "%".
 *
 * `text?` (string): a string to render inside progressbar UI instead of the
 *   progress' number value and `unit`.
 *
 * `growFrom?` (string): "left", "right" or "center". The anchor from where
 *   progressbar will start to fill up. Defaults to "left".
 *
 * `disabled` (boolean): "disabled" property. Destructured to control styles.
 *
 * `onClick?` (function): callback to trigger when clicking on this component.
 *
 * `classNames` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function Progressbar({
  value,
  min,
  max,
  showValue,
  unit,
  text,
  growFrom,
  onClick,
  classNames,
  disabled,
  ...otherProps
}) {
  // underscores for name mangling versus props' and utils.js' variables
  const [_min, _value, _max] = getValidRangeValues(value, min, max)

  return (
    <div
      disabled={disabled} // if disabled, gray everything out
      className={classes.container(onClick, classNames?.container)}
      onClick={disabled ? null : onClick}
      {...otherProps}
    >
      {showValue && !text && `${_value} ${unit}`}
      {text}
      <div
        // if disabled, do not apply background filling.
        style={disabled ? {} : getProgressStyle(_value, _min, _max)}
        className={classes.progress(growFrom, classNames?.progress)}
      />
    </div>
  )
}

Progressbar.defaultProps = defaultProps
Progressbar.propTypes = propTypes
