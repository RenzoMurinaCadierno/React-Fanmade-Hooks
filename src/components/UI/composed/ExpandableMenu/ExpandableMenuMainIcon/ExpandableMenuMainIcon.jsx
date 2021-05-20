import { ExpandableIcon, Aura } from "hub"
import { classes } from "./ExpandableMenuMain.utils"

export default function ExpandableMenuMainIcon({
  type = "primary",
  open = false,
  classNames = {},
  ...otherProps
}) {
  // console.log("render")
  return (
    <Aura isActive={!open} type={"primary"}>
      <ExpandableIcon
        type={type}
        expand={false}
        classNames={classes.icon(classNames.icon, open)}
        {...otherProps}
      />
    </Aura>
  )
}
