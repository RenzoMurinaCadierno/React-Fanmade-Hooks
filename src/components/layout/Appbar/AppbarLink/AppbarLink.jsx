import { classes, appbarLinkPropTypes } from "./AppbarLink.utils"

/**
 * Renders a valid component to use as navigation link to a hook example page.
 *
 * This component's only purpose is to appear as children of '*AppbarSection*',
 * which in term will take an array of '*AppbarLink*'s to render as a list,
 * constructing a menu UI to each hook example page.
 *
 * @param {object} props
 *
 * `isActive` (boolean): true will add 'active' stylings, applied when the
 *   component is hovered over, or when 'search' navigation input has a value
 *   that matches a fragment of `hookName`.
 *
 * `children` (React.Node): anything React can render, though a string is
 *   advised in order to be filterable by 'search' navigation input.
 *
 * `className` (string): incoming className string to add to JSX rendered here.
 */
export default function AppbarLink({
  isActive,
  children,
  className,
  ...otherProps
}) {
  return (
    <nav
      className={classes.container(
        isActive,
        typeof children === "string" && children.length > 16,
        // false,
        className
      )}
      {...otherProps}
    >
      {children}
    </nav>
  )
}

AppbarLink.propTypes = appbarLinkPropTypes
