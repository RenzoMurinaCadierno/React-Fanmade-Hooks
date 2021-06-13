import { useCallback, useState, useRef } from "react"
import { Input } from "hub"
import { classes, defaultProps, propTypes } from "./AppbarSearchbar.utils"

const fakeEmptySyntheticEventObject = { target: { value: "" } }

/**
 * Renders an '*Input*' that functions as a search bar for hook names in
 * '*Appbar*', as well as its search icon '*img*'.
 *
 * @param {object} props
 *
 * `onChange` (function): '*Input*' "onChange" handler.
 *
 * `searchIcon?` (string): Path to an svg image to use as 'search' icon's '*img*'
 *   "src".
 *
 * `clearIcon?` (string): Path to an svg image to use as 'clear' icon's '*img*'
 *   "src".
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `iconProps?` (object): Props to spread in search icon's '*img*'.
 *
 * `inputProps?` (object): Props to spread in '*Input*'.
 *
 * `...otherProps?` (object): Props to spread in container '*div*'.
 */
export default function AppbarSearchbar({
  onChange,
  searchIcon,
  clearIcon,
  classNames,
  iconProps,
  inputProps,
  ...otherProps
}) {
  // '*Input*' `ref`. Needed to clear it imperatively since it is
  // uncontrolled
  const inputRef = useRef()
  // state to control rendered '*img*' and its `onClick` handler
  const [isInputEmpty, setIsInputEmpty] = useState(true)

  /**
   * Toggles "isInputEmpty" depending on '*Input*' `value`. It also
   * triggers `onChange`.
   */
  const handleChange = (e) => {
    if (!e.target.value || (e.target.value && isInputEmpty)) {
      setIsInputEmpty((prevSt) => !prevSt)
    }
    onChange?.(e)
  }

  /**
   * Clears '*Input*' and sets "isInputEmpty" to false. It also triggers
   * `handleChange` passing a fake empty synthetic event object an argument.
   */
  const clearInput = () => {
    inputRef.current.value = ""
    handleChange(fakeEmptySyntheticEventObject)
  }

  return (
    // wrapper container
    <div className={classes.container(classNames.container)} {...otherProps}>
      {/* magnifying glass or clear icon */}
      <img
        src={isInputEmpty ? searchIcon : clearIcon}
        alt="search"
        onClick={isInputEmpty ? null : clearInput}
        className={classes.icon(isInputEmpty, classNames.icon)}
        {...iconProps}
      />
      {/* search input field */}
      <Input.Styled
        ref={inputRef}
        label="Search"
        role="search"
        onChange={handleChange}
        classNames={classes.input(classNames.input)}
        {...inputProps}
      />
    </div>
  )
}

AppbarSearchbar.defaultProps = defaultProps
AppbarSearchbar.propTypes = propTypes
