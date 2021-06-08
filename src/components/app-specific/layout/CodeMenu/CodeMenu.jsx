import { ExpandableMenu } from "hub"
import { classes, getIconsProps } from "./CodeMenu.utils"

export default function CodeMenu({
  url,
  plainCode,
  classNames,
  ...expandableMenuProps
}) {
  return (
    <ExpandableMenu
      anchor="top-right"
      iconsProps={getIconsProps(url, plainCode)}
      classNames={classes.codeMenu(classNames)}
      {...expandableMenuProps}
    />
  )
}
