import { ExpandableIcon } from "hub"
import { classes } from "./ExpandableMenuMain.utils"

export default function ExpandableMenuMainIcon({
  type = "primary",
  open = false,
  classNames = {},
  ...otherProps
}) {
  return (
    <>
      <ExpandableIcon
        type={type}
        expand={false}
        classNames={classes.icon(classNames.icon, open)}
        {...otherProps}
      />
      <div className={classes.aura(classNames.aura, open, type)} />
    </>
  )
}
