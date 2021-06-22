import { Button, ProgressBackground } from "hub"
import { classes, defaultProps, propTypes } from "./ButtonWithProgress.utils"

/**
 * Renders a '*Button*' which hosts a '*Spinner*' and a '*ProgressBackground*'.
 *
 * Serves as a button with customizable loading indicators, ideal when tapping
 * on it fires a resource-intensive or asynchronous task.
 *
 * @param {object} props
 *
 * `children?` (React.Node): '*Button*' `children`. Renders alongside
 *   '*Spinner*' and '*ProgressBackground*' if defined. Can be left undefined to
 *   just use the spinner or background as '*Button*' `children`.
 *
 * `type?` (string): This app's theme types, to apply as color, background,
 *   borders and shadows to all components rendered here.
 * * Defaults to 'primary'.
 * * Can be one of 'primary', 'primary-1', 'secondary', 'secondary-1', 'danger',
 *    'danger-1'.
 *
 * `showProgress?` (boolean): `true` renders '*ProgressBackground*'.
 *
 * `showSpinner?` (boolean): `true` renders '*Spinner*'.
 *
 * `min?` (number): '*ProgressBackground*' `min`, the lowest progress limit.
 *   Cannot be higher than `value` or `max`.
 *
 * > **Note:** Remember to define `min`, `value` and `max` all at the same time,
 *   otherwise, '*ProgressBackground*' will not properly work.
 *
 * `value?` (number): '*ProgressBackground*' `value`, the current progress value.
 *   Cannot be lower than `min` or higher than `max`.
 *
 * > **Note:** same one as `min`.
 *
 * `max?` (number): '*ProgressBackground*' `max`, the highest progress limit.
 *   Cannot be lower than `value` or `min`.
 *
 * > **Note:** same one as `min`.
 *
 * `shrink` (boolean): '*ProgressBackground*' `shrink`. `true` will start with
 *   `width: "100%"` and decrease as `value` increases, like an 'inverted'
 *   progressbar. `false` starts at `width: "0%"` and grows up to 100%.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `containerProps? (object): Props to spread in container '*div*'.
 *
 * `progressProps?` (object): Props to spread in container
 *   '*ProgressBackground*'.
 *
 * `...otherProps?` (object): Props to spread in '*Button.WithSpinner*'.
 */
export default function ButtonWithProgress({
  children,
  type,
  showProgress,
  showSpinner,
  min,
  value,
  max,
  shrink,
  classNames,
  containerProps,
  progressProps,
  ...otherProps
}) {
  return (
    <div
      className={classes.container(classNames.container)}
      {...containerProps}
    >
      <Button.WithSpinner
        classNames={classes.buttonWithProgress(classNames)}
        {...{ type, showSpinner, ...otherProps }}
      >
        {children}
        <ProgressBackground
          show={showProgress}
          className={classes.progress(classNames.progress)}
          {...{ min, value, max, shrink, ...progressProps }}
        />
      </Button.WithSpinner>
    </div>
  )
}

ButtonWithProgress.defaultProps = defaultProps
ButtonWithProgress.propTypes = propTypes
