import { forwardRef } from "react"
import { classes } from "./Input.utils"

/**
 * Renders an input type text or the likes, to be used alongside '*Label*'
 * component.
 */
export default forwardRef(function Input({ className, ...otherProps }, ref) {
  return (
    <input ref={ref} className={classes.container(className)} {...otherProps} />
  )
})
