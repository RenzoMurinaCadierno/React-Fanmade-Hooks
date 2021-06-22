import { memo } from "react"
import { classes, defaultProps, propTypes } from "./Spinner.utils"

/**
 * Renders a spinner, with configurable sizes and theme types.
 *
 * @param {object} props
 *
 * `size?` (string): Controls the spinner's size. Defaults to 'md' and can be
 *   one of 'xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'.
 *
 * > **Note:** If you wish to pass custom 'width' and 'height' dimensions to
 *   the spinner, do so by setting `style` as one spreadable prop in
 *   `otherProps`.
 * > * Set width with **width** style.
 * > * Set height with **paddingBottom**, as 'height' is fixed to 0 to simulate
 *   aspect-ratio with the padding-bottom trick.
 *
 * > ```javascript
 *   // Example (renders a 100px/100px spinner):
 *   <Spinner
 *     style={{ width: '100px', paddingBottom: '100px' }}
 *   />
 *
 * `type?` (string): The color to apply to the spinner, related to this app's
 *   theme. Defaults to 'primary' and can be one of 'primary', 'primary-1',
 *   'primary-2', 'primary-3', 'secondary', 'secondary-1', 'secondary-2',
 *   'secondary-3', 'danger', 'danger-1', 'danger-2', 'danger-3',
 *
 * `classNames?` (object): className strings for all JSXs rendered here.
 *   Check *utils.js* for its constitution.
 */
function Spinner({ size, type, classNames, dotProps, ...otherProps }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
      className={classes.container(size, classNames.container)}
      {...otherProps}
    >
      <div className={classes.dot(type, classNames.dot)} {...dotProps} />
      <div className={classes.dot(type, classNames.dot)} {...dotProps} />
      <div className={classes.dot(type, classNames.dot)} {...dotProps} />
      <div className={classes.dot(type, classNames.dot)} {...dotProps} />
    </div>
  )
}

Spinner.defaultProps = defaultProps
Spinner.propTypes = propTypes

export default memo(Spinner)
