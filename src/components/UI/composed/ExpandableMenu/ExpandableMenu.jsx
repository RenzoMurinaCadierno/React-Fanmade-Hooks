import { useToggle, ExpandableMenuMainIcon, ExpandableMenuListIcon } from "hub"
import {
  classes,
  getDefaultIconProps,
  getIconExpandDirection,
  getIconSpreadDirection,
  getType,
  expandableMenuPropTypes
} from "./ExpandableMenu.utils"

export default function ExpandableMenu({
  anchor = "bottom-right",
  spread = getIconSpreadDirection(anchor),
  type = "secondary",
  iconsProps = getDefaultIconProps(spread),
  listIconsExpandDirection = getIconExpandDirection(anchor),
  classNames = {},
  menuIconProps = {},
  listIconsProps = {},
  ...otherProps
}) {
  const [isMenuOpen, toggleMenuOpen] = useToggle(false)

  return (
    <>
      <div
        className={classes.container(anchor, classNames.container)}
        {...otherProps}
      >
        <ExpandableMenuMainIcon
          type={getType(type, isMenuOpen)}
          icon={iconsProps.main.icon}
          content={iconsProps.main.content}
          open={isMenuOpen}
          onIconClick={toggleMenuOpen}
          classNames={classes.mainIcon(classNames.mainIcon)}
          auraProps={menuIconProps.aura}
          {...menuIconProps.icon}
        />
        {iconsProps.list.map((currentIconProps, i) => (
          <ExpandableMenuListIcon
            key={i}
            type={type}
            show={isMenuOpen}
            order={i}
            amountOfIcons={iconsProps.list.length}
            spread={spread}
            iconExpandDirection={listIconsExpandDirection}
            onContentClick={() => console.log(currentIconProps)}
            classNames={classes.listIcon(classNames.listIcon)}
            {...listIconsProps}
            {...currentIconProps}
          />
        ))}
      </div>
    </>
  )
}

ExpandableMenu.propTypes = expandableMenuPropTypes
