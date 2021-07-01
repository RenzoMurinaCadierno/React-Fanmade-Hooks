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
    onUpdateAttempt(value)
  }, [])

  useEffect(() => !attempt.length && setButtonProps({}), [attempt])

  return (
    <PhoneDial
      genericButtonProps={{ disabled: code[0].length > 1 }}
      onButtonClick={updateAttemptAndButtonProps}
      classNames={classes.numPad(classNames)}
      {...{ buttonProps, ...otherProps }}
    />
  )
}

CodeRushNumPad.defaultProps = defaultProps
CodeRushNumPad.propTypes = propTypes
