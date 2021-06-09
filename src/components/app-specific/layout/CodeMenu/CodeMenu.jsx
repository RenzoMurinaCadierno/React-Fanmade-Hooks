import { ExpandableMenu } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getIconsProps
} from "./CodeMenu.utils"

/**
 * Renders an '*ExpandableMenu*' that serves as a menu that links to hook's
 * file in Github repository, and to copy hook's code to clipboard.
 *
 * Both icons trigger a '*Toast*'. The former to ask for user confirmation
 * before attempting to open a new tab, and the latter to inform if the copy
 * was successful.
 *
 * @param {object} props
 *
 * `url?` (string): Link to open in a new tab when tapping '*Toast*' content,
 *   inside 'go to code' '*ExpandableMenu.ListIcon*'.
 *
 * `plainCode?` (string) The hook's whole code as a string, to be copied by
 *   'copy code' '*ExpandableMenu.ListIcon*'. This string in found in
 *   'PATH_TO_HOOK_FOLDER/utils/plain.js'.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `...expandableMenuProps?` (object): Props to spread in '*ExpandableMenu*'.
 */
export default function CodeMenu({
  url,
  plainCode,
  classNames,
  ...expandableMenuProps
}) {
  return (
    <ExpandableMenu
      // anchor prop is passed in "defaultProps" as 'top-right'
      iconsProps={getIconsProps(url, plainCode)}
      classNames={classes.codeMenu(classNames)}
      {...expandableMenuProps}
    />
  )
}

CodeMenu.defaultProps = defaultProps
CodeMenu.propTypes = propTypes
