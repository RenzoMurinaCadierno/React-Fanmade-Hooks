import { Button, Spinner } from "hub"
import { classes, defaultProps, propTypes } from "./ButtonWithSpinner.utils"

/**
 * Renders a '*Button*' with
 * @param {*} param0
 * @returns
 */
export default function ButtonWithSpinner({
  showSpinner,
  spinnerAnchor,
  children,
  classNames,
  spinnerProps,
  ...buttonProps
}) {
  return (
    <Button
      className={classes.button(spinnerAnchor, classNames.button)}
      {...buttonProps}
    >
      {showSpinner && (
        <Spinner
          size="xs"
          classNames={classes.spinner(
            !!children,
            spinnerAnchor,
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
