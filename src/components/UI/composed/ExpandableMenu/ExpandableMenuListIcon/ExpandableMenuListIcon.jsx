import { ExpandableIcon } from "hub"
import { classes, getStyle } from "./ExpandableMenuListIcon.utils"

export default function ExpandableMenuListIcon({
  show,
  order,
  amountOfIcons,
  spread = "top",
  iconExpandDirection,
  classNames = {},
  ...otherProps
}) {
  return (
    <ExpandableIcon
      expandDirection={iconExpandDirection}
      classNames={classes.icon(classNames.icon)}
      style={getStyle(order, spread, show, amountOfIcons)}
      {...otherProps}
    />
  )
}
