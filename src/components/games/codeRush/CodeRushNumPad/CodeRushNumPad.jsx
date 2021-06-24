import { useCallback, useState, useEffect } from "react"
import { PhoneDial } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushNumPad.utils"

export default function CodeRushNumPad({
  code,
  attempt,
  disabled,
  setAttempt,
  classNames,
  ...otherProps
}) {
  // console.log("render")

  const [buttonProps, setButtonProps] = useState({})

  const updateAttemptAndButtonProps = useCallback((_, name, value) => {
    setButtonProps((prevSt) => ({
      ...prevSt,
      [name]: {
        ...prevSt[name],
        type: prevSt[name]?.type === "secondary" ? "primary" : "secondary"
      }
    }))
    setAttempt((prevSt) =>
      prevSt.includes(value)
        ? prevSt.filter((digit) => digit !== value)
        : [...prevSt, value]
    )
  }, [])

  useEffect(() => !attempt.length && setButtonProps({}), [attempt])

  return (
    <PhoneDial
      // onButtonClick={onPhoneButtonClick}
      // buttonProps={buttonProps}
      genericButtonProps={{ disabled: code[0].length > 1 && !attempt.length }}
      onButtonClick={updateAttemptAndButtonProps}
      classNames={classes.numPad(classNames)}
      // {...otherProps}
      {...{ buttonProps, ...otherProps }}
    />
  )
}

CodeRushNumPad.defaultProps = defaultProps
CodeRushNumPad.propTypes = propTypes
