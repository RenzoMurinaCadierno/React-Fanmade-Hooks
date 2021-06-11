import { memo } from "react"
import { Icon } from "hub"
import { classes, defaultProps, propTypes } from "./AppbarHomeIcon.utils"

/**
 * Renders a an '*IconExpandable*' to use as link to '*HomePage*'.
 *
 * @param {object} props
 *
 * `homeIconSVG?` (string): Path to an svg image to use as '*img*' "src" for
 *   '*IconExpandable*' `content`. Defaults to a 'home' icon svg image.
 *
 * `content` (string): '*IconExpandable*' `content`. Text to show when icon is
 *   tapped open. Defaults to 'Go home'.
 *
 * `expandDirection?` (string): Direction '*IconExpandable*' `content` will
 *   spread towards when tapping its icon. Defaults to 'right', and can be one
 *   of 'left', 'right'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check utils.js for its constitution.
 *
 * `otherExpandableIconProps?` (object): Props to spread in '*IconExpandable*'.
 */
function AppbarHomeIcon({
  homeIconSVG,
  expandDirection,
  content,
  classNames,
  ...otherExpandableIconProps
}) {
  return (
    <Icon.Expandable
      icon={
        <img
          src={homeIconSVG}
          alt="go home"
          className={classes.img(classNames.img)}
        />
      }
      content={content}
      expandDirection={expandDirection}
      classNames={classes.expandableIcon(classNames.expandableIcon)}
      {...otherExpandableIconProps}
    />
  )
}

AppbarHomeIcon.defaultProps = defaultProps
AppbarHomeIcon.propTypes = propTypes

export default memo(AppbarHomeIcon)
