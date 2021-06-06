import { useCallback, useState, useRef } from "react"
import { InputField } from "hub"
import { classes, defaultProps, propTypes } from "./AppbarSearchbar.utils"

const fakeEmptySyntheticEventObject = { target: { value: "" } }

/**
 * Renders an '*Inputfield*' that functions as a search bar for hook names in
 * '*Appbar*', as well as its search icon '*img*'.
 *
 * @param {object} props
 *
 * `onChange` (function): '*InputField*' "onChange" handler.
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
 * `inputFieldProps?` (object): Props to spread in '*InputField*'.
 *
 * `...otherProps?` (object): Props to spread in container '*div*'.
 */
export default function AppbarSearchbar({
  onChange,
  searchIcon,
  clearIcon,
  classNames,
  iconProps,
  inputFieldProps,
  ...otherProps
}) {
  // '*InputField*' `ref`. Needed to clear it imperatively since it is
  // uncontrolled
  const inputRef = useRef()
  // state to control rendered '*img*' and its `onClick` handler
  const [isInputEmpty, setIsInputEmpty] = useState(true)

  /**
   * Toggles "isInputEmpty" depending on '*InputField*' `value`. It also
   * triggers `onChange`.
   */
  const handleChange = useCallback(
    (e) => {
      if (!e.target.value || (e.target.value && isInputEmpty)) {
        setIsInputEmpty((prevSt) => !prevSt)
      }
      onChange?.(e)
    },
    [isInputEmpty, onChange]
  )

  /**
   * Clears '*InputField*' and sets "isInputEmpty" to false. It also triggers
   * `handleChange` passing a fake empty synthetic event object an argument.
   */
  const clearInput = useCallback(() => {
    inputRef.current.value = ""
    handleChange(fakeEmptySyntheticEventObject)
  }, [handleChange])

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
      <InputField
        ref={inputRef}
        label="Search"
        role="search"
        onChange={handleChange}
        classNames={classes.inputField(classNames.inputField)}
        {...inputFieldProps}
      />
    </div>
  )
}

AppbarSearchbar.defaultProps = defaultProps
AppbarSearchbar.propTypes = propTypes
