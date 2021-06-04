import { forwardRef } from "react"
import { classes } from "./Icon.utils"

/**
 * Renders a circle-shaped icon with a React.Element at the center of it.
 *
 * A single React.Element type '*img*' is recommended, as styles are suited for
 * it. It accepts anything, but in such case you should control styles by
 * `className`.
 *
 * @param props
 *
 * `children?` (React.Element): anything React can render, but it is strongly
 *   recommended to use an element type '*img*' since this component's stylings
 *   are suited for such.
 *
 * `type?` (string): main or secondary generic stylings to apply to everything
 *   rendered here. Can be one of "primary", "primary-1", "secondary",
 *   "secondary-1", "danger", "danger-1". Defaults to "primary".
 *
 * `className?` (string): incoming className to append to wrapper '*div*'.
 *
 * `...otherProps?` (object): Props to spread in wrapper '*div*'.
 */
function Icon({ children, type = "primary", className, ...otherProps }, ref) {
  return (
    <div
      ref={ref}
      className={classes.container(type, className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}

export default forwardRef(Icon)
