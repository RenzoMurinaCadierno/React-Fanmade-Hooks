import { Button, Spinner } from "hub"
import { memo } from "react"
import { classes, defaultProps, propTypes } from "./ButtonWithSpinner.utils"

/**
 * Renders a '*Button*' which hosts a '*Spinner*'.
 *
 * Serves as a button with a customizable loading indicator, ideal when tapping
 * on it fires a resource-intensive or asynchronous task.
 *
 * @param {object} props
 *
 * `children?` (React.Node): '*Button*' `children`. Renders alongside
 *   '*Spinner*' if defined. Can be left undefined to just use the spinner
 *   as '*Button*' `children`.
 *
 * `showSpinner?` (boolean): `true` renders '*Spinner*'.
 *
 * `spinnerAnchor?` (string): '*Spinner*' absolute position relative to its
 *   '*Button*' parent.
 * * Defaults to 'left'.
 * * Can be one of 'top', 'right', 'bottom, 'left'.
 *
 * `type?` (string): This app's theme types, to apply as color, background,
 *   borders and shadows to all components rendered here.
 * * Defaults to 'primary'.
 * * Can be one of 'primary', 'primary-1', 'secondary', 'secondary-1', 'danger',
 *    'danger-1'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `spinnerProps?` (object): Props to spread in '*Spinner*'.
 *
 * `...otherProps?` (object): Props to spread in '*Button*'.
 */
function ButtonWithSpinner({
  children,
  showSpinner,
  spinnerAnchor,
  type,
  classNames,
  spinnerProps,
  ...otherProps
}) {
  return (
    <Button
      className={classes.button(spinnerAnchor, classNames.button)}
      type={type}
      {...otherProps}
    >
      {showSpinner && (
        <Spinner
          size="xs"
          type={type}
          classNames={classes.spinner(
            !!children, // centers spinner if children is falsy
            spinnerAnchor, // anchors spinner if children is truthy
            classNames.spinner
          )}
          {...spinnerProps}
        />
      )}
      {children}
    </Button>
  )
}

ButtonWithSpinner.defaultProps = defaultProps
ButtonWithSpinner.propTypes = propTypes

export default memo(ButtonWithSpinner)
