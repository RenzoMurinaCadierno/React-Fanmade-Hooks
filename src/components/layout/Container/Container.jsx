import React, { useRef, memo } from "react"
import { classes, containerPropTypes } from "./Container.utils"

/**
 * Renders a generic wrapper container with default and optional styling.
 *
 * @param {object} props
 *
 * `htmlElem?` (string): html element to render as wrapper. Defaults to "div".
 *
 * `type?` (string): This app's theme types. Can be one of "primary",
 *   "secondary" or "danger". Defaults to "primary".
 *
 * `flexDirection?` (string): A valid value for "flex-direction" CSS property.
 *   If defined, it will add that styling.
 *
 * `alignItems?` (string): A valid value for "align-items" CSS property. If
 *   defined, it will add that styling.
 *
 * `justifyContent?` (string): A valid value for "justify-content" CSS property.
 *   If defined, it will add that styling.
 *
 * `roundBorders?` (boolean): true will add round corners to all borders of the
 *   container.
 *
 * `circle?` (boolean): true will style the container with "border-radius: 50%",
 *   causing it to look like a circle.
 *
 * `className?` (string): incoming className string to add to wrapper component.
 *
 * `children?` (React.Node): anything React can render, to display as children.
 */
function Container({
  htmlElem = "div",
  type,
  flexDirection,
  alignItems,
  justifyContent,
  roundBorders,
  circle,
  className,
  children,
  ...otherProps
}) {
  const Component = useRef(htmlElem)

  return (
    <Component.current
      className={classes.container(
        type,
        flexDirection,
        alignItems,
        justifyContent,
        roundBorders,
        circle,
        className
      )}
      {...otherProps}
    >
      {children}
    </Component.current>
  )
}

Container.propTypes = containerPropTypes

export default memo(Container)
