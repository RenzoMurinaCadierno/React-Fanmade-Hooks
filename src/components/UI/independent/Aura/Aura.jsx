import { classes, auraPropTypes } from "./Aura.utils"

export default function Aura({
  children,
  isActive = true,
  type = "secondary",
  blink = "short",
  size = "large",
  interval = "short",
  isCircle = true, // if container is box but you want a circle, like to be rendered bedsides a circular sibling to function as aura to that sibling that occupies the whole container
  classNames = {},
  otherAuraProps = {},
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      {children}
      <div
        className={classes.aura(
          isActive,
          type,
          blink,
          size,
          interval,
          isCircle,
          classNames.aura
        )}
        {...otherAuraProps}
      />
    </div>
  )
}

Aura.propTypes = auraPropTypes
