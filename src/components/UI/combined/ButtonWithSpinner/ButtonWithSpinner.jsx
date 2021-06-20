import { Button, Spinner } from "hub"
import { classes, defaultProps, propTypes } from "./ButtonWithSpinner.utils"

/**
 * Renders a '*Button*' with
 * @param {*} param0
 * @returns
 */
export default function ButtonWithSpinner({
  showSpinner,
  children,
  classNames,
  spinnerProps,
  ...buttonProps
}) {
  return (
    <Button className={classes.button(classNames.button)} {...buttonProps}>
      {showSpinner && (
        <Spinner
          size="xs"
          classNames={classes.spinner(classNames.spinner)}
          {...spinnerProps}
        />
      )}
      {children}
    </Button>
  )
}

ButtonWithSpinner.defaultProps = defaultProps
ButtonWithSpinner.propTypes = propTypes
