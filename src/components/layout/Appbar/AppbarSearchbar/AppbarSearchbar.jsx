import { InputField } from "hub"
import defaultSearchSVG from "assets/icons/search.svg"
import { classes, appbarSearchbarPropTypes } from "./AppbarSearchbar.utils"

/**
 * Renders an '*Inputfield*' that functions as a search bar for hook names in
 * '*Appbar*', as well as its search icon '*img*'.
 *
 * @param {object} props
 *
 * `onChange` (function): '*InputField*' "onChange" handler.
 *
 * `searchIcon?` (string): Path to an svg image to use as search icon's '*img*'
 *   "src".
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `searchIconProps?` (object): Props to spread in search icon's '*img*'.
 *
 * `inputFieldProps?` (object): Props to spread in '*InputField*'.
 *
 * `...otherProps?` (object): Props to spread in container '*div*'.
 */
export default function AppbarSearchbar({
  onChange,
  searchIcon,
  classNames = {},
  searchIconProps = {},
  inputFieldProps = {},
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <img
        src={searchIcon ?? defaultSearchSVG} // magnifying glass icon
        alt="search"
        className={classes.searchIcon(classNames.searchIcon)}
        {...searchIconProps}
      />
      <InputField // search input field
        label="Search"
        role="search"
        onChange={onChange}
        classNames={classes.inputField(classNames.inputField)}
        {...inputFieldProps}
      />
    </div>
  )
}

AppbarSearchbar.propTypes = appbarSearchbarPropTypes
