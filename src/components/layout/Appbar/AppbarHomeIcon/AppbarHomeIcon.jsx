import { memo } from "react"
import { Icon } from "hub"
import { classes, defaultProps, propTypes } from "./AppbarHomeIcon.utils"

/**
 * Renders a an '*Icon.Expandable*' to use as link to '*HomePage*'.
 *
 * @param {object} props
 *
 * `homeIconSVG?` (string): Path to an svg image to use as '*img*' "src" for
 *   '*Icon.Expandable*' `content`. Defaults to a 'home' icon svg image.
 *
 * `content` (string): '*Icon.Expandable*' `content`. Text to show when icon is
 *   tapped open. Defaults to 'Go home'.
 *
 * `expandDirection?` (string): Direction '*Icon.Expandable*' `content` will
 *   spread towards when tapping its icon. Defaults to 'right', and can be one
 *   of 'left', 'right'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check utils.js for its constitution.
 *
 * `otherIconExpandableProps?` (object): Props to spread in '*Icon.Expandable*'.
 */
function AppbarHomeIcon({
  homeIconSVG,
  expandDirection,
  content,
  classNames,
  ...otherIconExpandableProps
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
      classNames={classes.iconExpandable(classNames.iconExpandable)}
      {...otherIconExpandableProps}
    />
  )
}

AppbarHomeIcon.defaultProps = defaultProps
AppbarHomeIcon.propTypes = propTypes

export default memo(AppbarHomeIcon)
