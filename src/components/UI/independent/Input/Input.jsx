import { forwardRef } from "react"
import { classes } from "./Input.utils"

/**
 * Renders an input type text or the likes, to be used alongside '*Label*'.
 *
 * @param {object} props
 *
 * `className` (string): className string to append to '*input*'.
 *
 * `...otherProps?` (object): Props to spread in '*input*'.
 */
function Input({ className, ...otherProps }, ref) {
  return (
    <input ref={ref} className={classes.container(className)} {...otherProps} />
  )
}

export default forwardRef(Input)
