import { classes } from "./Aura.utils"

export default function Aura({
  isActive = true,
  type = "secondary",
  forceCircularShape, // if container is box but you want a circle, like to be rendered bedsides a circular sibling to function as aura to that sibling that occupies the whole container
  noBorder,
  className,
  ...otherProps
}) {
  return (
    // <div className={classes.wrapper}>
    <div
      className={classes.container(
        isActive,
        type,
        forceCircularShape,
        noBorder,
        className
      )}
      {...otherProps}
    />
  )
  // </div>
}

make aura the component wrapping children so that it can be set to z-index
<Aura> {shildren{ </Aura>

<div class="wrapper">
    <div class="parent">
        <div class="child">
            ...
        </div>
    </div>
</div>

CSS:

.wrapper {
    position: relative;
    z-index: 0;
}

.child {
    position: relative;
    z-index: -1;
}
