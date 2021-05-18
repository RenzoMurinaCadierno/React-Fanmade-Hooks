import { useToggle, ExpandableMenuMainIcon, ExpandableMenuListIcon } from "hub"
import {
  classes,
  defaultIconProps,
  getType,
  getIconExpandDirection,
  expandableMenuPropTypes
} from "./ExpandableMenu.utils"

export default function ExpandableMenu({
  // anchor = "bottom-right",
  anchor = "left",
  spread = "right",
  type = "secondary",
  iconProps = defaultIconProps,
  classNames = {},
  expandableMenuMainIconProps = {},
  expandableMenuListIconProps = {},
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
          icon={iconProps.main.icon}
          content={iconProps.main.content}
          open={isMenuOpen}
          onIconClick={toggleMenuOpen}
          classNames={classes.mainIcon(classNames.mainIcon)}
          {...expandableMenuMainIconProps}
        />
        {iconProps.list.map((prop, i) => (
          <ExpandableMenuListIcon
            key={i}
            type={type}
            icon={prop.icon}
            content={prop.content}
            show={isMenuOpen}
            order={i}
            amountOfIcons={iconProps.list.length}
            spread={spread}
            iconExpandDirection={getIconExpandDirection(anchor)}
            onContentClick={() => console.log(prop.content)}
            classNames={classes.listIcon(classNames.listIcon)}
            {...expandableMenuListIconProps}
          />
        ))}
      </div>
    </>
  )
}

ExpandableMenu.propTypes = expandableMenuPropTypes
