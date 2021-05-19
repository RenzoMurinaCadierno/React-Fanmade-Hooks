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
    <>
      <ExpandableIcon
        type={type}
        expand={false}
        classNames={classes.icon(classNames.icon, open)}
        {...otherProps}
      />
      <Aura isActive={!open} type={type} forceCircularShape />
      {/* <div className={classes.aura(classNames.aura, open, type)} /> */}
    </>
  )
}
