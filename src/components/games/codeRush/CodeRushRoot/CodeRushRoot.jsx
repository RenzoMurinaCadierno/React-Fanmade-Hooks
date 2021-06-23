import { useState, useEffect, useCallback } from "react"
import { CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  getCode,
  haveExactValues
} from "./CodeRushRoot.utils"

export default function CodeRushRoot({
  classNames,
  codeProps,
  numPadProps,
  timerButtonProps,
  ...otherProps
}) {
  const [code, setCode] = useState([])
  const [attempt, setAttempt] = useState([])

  const setNewCodeAndClearAttempt = useCallback(() => {
    setCode(getCode())
    setAttempt([])
  }, [])

  useEffect(() => {
    if (haveExactValues(attempt, code)) setNewCodeAndClearAttempt()
  }, [attempt])

  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Code
        className={classes.code(classNames.code)}
        {...{ code, ...codeProps }}
      />
      <CodeRush.NumPad
        classNames={classes.numPad(classNames.numPad)}
        // {...numPadProps}
        {...{ code, attempt, setAttempt, ...numPadProps }}
      />
      <CodeRush.TimerButton
        classNames={classes.timerButton(classNames.timerButton)}
        timeout={2000}
        {...timerButtonProps}
        // onClick={() => setCode(getCode())}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
