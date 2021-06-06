import { classes, defaultProps, propTypes } from "./Icon.utils"

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
export default function Icon({ children, type, className, ...otherProps }) {
  return (
    <div className={classes.container(type, className)} {...otherProps}>
      {children}
    </div>
  )
}

Icon.propTypes = propTypes
Icon.defaultProps = defaultProps
