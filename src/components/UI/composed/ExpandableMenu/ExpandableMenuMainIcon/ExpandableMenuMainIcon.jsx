import { ExpandableIcon, Aura } from "hub"
import { classes } from "./ExpandableMenuMain.utils"

export default function ExpandableMenuMainIcon({
  type = "primary",
  open = false,
  classNames = {},
  auraProps = {},
  ...otherExpandableIconProps
}) {
  // console.log("render")
  return (
    <Aura isActive={!open} type={type} {...auraProps}>
      <ExpandableIcon
        type={type}
        expand={false}
        classNames={classes.icon(classNames.icon, open)}
        {...otherExpandableIconProps}
      />
    </Aura>
  )
}
