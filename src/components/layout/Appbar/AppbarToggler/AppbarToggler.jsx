import { classes, appbarTogglerPropTypes } from "./AppbarToggler.utils"

/**
 * Renders a 3-dotted 'toggler' UI at the top-left of the screen.
 *
 * @param {object} props
 *
 * `isActive?` (boolean): true will apply 'primary' theme stylings, false adds
 *   'secondary' ones.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `togglerDisplayProps?` (object): Props to spread in 'toggler' '*div*' (the
 *   3-dotted UI inside container '*div*').
 *
 * `...otherProps?` (object): Props to spread in container '*div*'.
 */
export default function AppbarToggler({
  isActive,
  classNames = {},
  togglerDisplayProps = {},
  ...otherProps
}) {
  return (
    // wrapper container, keeps styles consistent in children '*div*'
    <div className={classes.container(classNames.container)} {...otherProps}>
      {/* The 3 dots as a '*div*', ::before and ::after */}
      <div
        className={classes.toggler(isActive, classNames.toggler)}
        {...togglerDisplayProps}
      />
    </div>
  )
}

AppbarToggler.propTypes = appbarTogglerPropTypes
