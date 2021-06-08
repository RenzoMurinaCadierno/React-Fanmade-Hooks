import { Icon } from "hub"
import { classes, getStyle } from "./ExpandableMenuListIconWithToast.utils"

export default function ExpandableMenuListIconWithToast({
  children,
  order,
  spread,
  show,
  amountOfIcons,
  iconExpandDirection,
  classNames,
  toastProps,
  ...expandableIconProps
}) {
  return (
    <Icon.Expandable.WithToast
      classNames={classes.listIcon(classNames)}
      expandableIconProps={{
        expandDirection: iconExpandDirection,
        style: getStyle(order, spread, show, amountOfIcons),
        ...expandableIconProps
      }}
      toastProps={toastProps}
    >
      {toastProps.children}
    </Icon.Expandable.WithToast>
  )
}
