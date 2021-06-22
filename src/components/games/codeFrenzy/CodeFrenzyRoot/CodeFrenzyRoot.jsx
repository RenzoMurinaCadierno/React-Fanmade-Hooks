import { CodeFrenzy } from "hub"
import { classes, defaultProps, propTypes } from "./CodeFrenzyRoot.utils"

export default function CodeFrenzyRoot({
  classNames,
  codeProps,
  numPadProps,
  timerButtonProps,
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeFrenzy.Code
        className={classes.code(classNames.code)}
        {...codeProps}
      />
      <CodeFrenzy.NumPad
        classNames={classes.numPad(classNames.numPad)}
        {...numPadProps}
      />
      <CodeFrenzy.TimerButton
        classNames={classes.timerButton(classNames.timerButton)}
        {...timerButtonProps}
      />
    </div>
  )
}

CodeFrenzyRoot.defaultProps = defaultProps
CodeFrenzyRoot.propTypes = propTypes
