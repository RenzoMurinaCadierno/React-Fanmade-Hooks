import { useCallback } from "react"
import { Button } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  NAMES,
  VALUES,
  BUTTONS
} from "./PhoneDial.utils"

/**
 * Renders an array of '*Button*' components representing a classic cellphone
 * dial.
 *
 * @param {object} props
 *
 * `onButtonClick?` (function): callback triggered on any rendered button
 *   click, provided that `buttonProps.onClick` for that button is not defined
 *   (see `buttonProps` below).
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 *
 * `buttonProps?` (object): an object with keys representing each phone
 *   button's character ('one' to 'nine', 'hash' and 'star'), and values as
 *   props to spread on the respective buttons they represent.
 *
 * > E.g.: { six: { onClick: (e) => console.log(e) }, star: { disabled: true } }
 *
 * * **Note:** Defining "onClick" for a specific button in `buttonProps` will
 *     override `onButtonClick.onClick` for that button instance.
 *
 * `genericButtonProps?` (object): props to spread on each rendered '*Button*'.
 *
 * * **Note:** `buttonProps` are higher in specificity, which means props
 *   defined there for individual button instances will override the respective
 *   ones here for that button instance only.
 */
export default function PhoneDial({
  onButtonClick,
  classNames,
  buttonProps,
  genericButtonProps,
  ...otherProps
}) {
  // console.log("render")

  const handleButtonClick = useCallback(
    (e) => {
      // "name" is the word ('one', 'star'), "value" is the representation ('1',
      // '*')
      const { name, value } = e.target.dataset
      // if we assigned `buttonProps.onClick` to that specific button instance,
      // use it. Pass event object, "name" and "value" in case they are needed
      if (buttonProps[name]?.onClick) {
        buttonProps[name].onClick(e, name, value)
      } else if (onButtonClick) {
        // otherwise, if there is a generic `onButtonClick` for all buttons,
        // use that one. Pass the same args as above
        onButtonClick?.(e, name, value)
      }
    },
    [onButtonClick, buttonProps]
  )

  return (
    <div className={classes.container(classNames?.container)} {...otherProps}>
      {BUTTONS.map(([btnName, btnRepr]) => (
        // "btnName" is the name ('two', 'hash'), "btnRepr" is the
        // representation ('2', '#')
        <Button
          key={btnName}
          type="primary"
          className={classes.button(classNames?.button)}
          {...genericButtonProps}
          {...buttonProps[btnName]}
          data-value={btnRepr} // placing these last three props below...
          data-name={btnName} // ...`buttonProps` will ensure they will NOT...
          onClick={handleButtonClick} // ...be overriden by them.
        >
          {btnRepr}
        </Button>
      ))}
    </div>
  )
}

PhoneDial.constants = { NAMES, VALUES, BUTTONS }
PhoneDial.defaultProps = defaultProps
PhoneDial.propTypes = propTypes
