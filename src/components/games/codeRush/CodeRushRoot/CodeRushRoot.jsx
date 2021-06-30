import { CodeRush } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushRoot.utils"

export default function CodeRushRoot({
  timeout,
  code,
  attempt,
  score,
  livesLeft,
  maxLives,
  mode,
  handleGameStart,
  handleGameOver,
  updateAttempt,
  loseLife,
  switchMode,
  classNames,
  codeProps,
  numPadAndStatsProps,
  numPadProps,
  statsProps,
  timerButtonProps,
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Code
        className={classes.code(classNames.code)}
        {...{ code, ...codeProps }}
      />
      <div
        className={classes.numPadAndStats(classNames.numPadAndStats)}
        {...numPadAndStatsProps}
      >
        <CodeRush.NumPad
          onUpdateAttempt={updateAttempt}
          classNames={classes.numPad(classNames.numPad)}
          {...{ code, attempt, ...numPadProps }}
        />
        <CodeRush.Stats
          {...{ mode, switchMode, score, livesLeft, maxLives, ...statsProps }}
        />
      </div>
      <CodeRush.TimerButton
        // easy: 6000, normal: 5000, hard: 4000
        timeout={timeout || (7 - mode) * 1000}
        onGameStart={handleGameStart}
        onLifeLost={loseLife}
        onGameOver={handleGameOver}
        classNames={classes.timerButton(classNames.timerButton)}
        {...{ mode, score, livesLeft, maxLives, ...timerButtonProps }}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
