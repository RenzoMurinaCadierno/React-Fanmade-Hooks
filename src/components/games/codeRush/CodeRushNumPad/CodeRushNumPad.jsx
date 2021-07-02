import { useCallback, useState, useEffect } from "react"
import { PhoneDial } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushNumPad.utils"

export default function CodeRushNumPad({
  code,
  attempt,
  onUpdateAttempt,
  classNames,
  ...otherProps
}) {
  /**
   * State to spread as `buttonProps` in '*PhoneDial*'. Controls props for each
   * individual button, to handle their `type` and trigger `onUpdateAttempt`
   * when tapped.
   */
  const [buttonProps, setButtonProps] = useState({})

  /**
   * Updates "buttonProps" when tapping a '*Button*' in '*PhoneDial*'.
   *
   * Toggles the tapped button's `type` and triggers `onUpdateAttempt` passing
   * its value as argument.
   */
  const updateAttemptAndButtonProps = useCallback(
    (_, name, value) => {
      setButtonProps((prevSt) => ({
        ...prevSt,
        [name]: {
          ...prevSt[name],
          type: prevSt[name]?.type === "secondary" ? "primary" : "secondary"
        }
      }))
      onUpdateAttempt(value)
    },
    [onUpdateAttempt]
  )

  /**
   * When `attempt` array is empty (at game start and game over), clean up
   * "buttonProps".
   */
  useEffect(() => !attempt.length && setButtonProps({}), [attempt])

  return (
    <PhoneDial
      /* code[0].length > 1 on 'game start' and 'game over' messages. */
      genericButtonProps={{ disabled: code[0].length > 1 }}
      onButtonClick={updateAttemptAndButtonProps}
      classNames={classes.numPad(classNames)}
      {...{ buttonProps, ...otherProps }}
    />
  )
}

CodeRushNumPad.defaultProps = defaultProps
CodeRushNumPad.propTypes = propTypes
