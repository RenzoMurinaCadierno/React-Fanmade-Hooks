import { CodeRush } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushRoot.utils"

// '*useLatency*' hook example is in '*CodeRush.TimerButton*'

export default function CodeRushRoot({
  timeout,
  code,
  attempt,
  score,
  hiScores,
  livesLeft,
  maxLives,
  timePenalty,
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
    // wrapper container
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Code
        className={classes.code(classNames.code)}
        {...{ code, ...codeProps }}
      />
      {/* NumPad and Stats container */}
      <div
        className={classes.numPadAndStats(classNames.numPadAndStats)}
        {...numPadAndStatsProps}
      >
        {/* NumPad, the '*PhoneDial*' to type the code */}
        <CodeRush.NumPad
          onUpdateAttempt={updateAttempt}
          classNames={classes.numPad(classNames.numPad)}
          {...{ code, attempt, ...numPadProps }}
        />
        {/* JSX containing all 'stats' counters (level, lives, score, ...) */}
        <CodeRush.Stats
          {...{
            mode,
            switchMode,
            score,
            hiScores,
            livesLeft,
            maxLives,
            timePenalty,
            ...statsProps
          }}
        />
      </div>
      {/* Timer (latency) button. Holds '*useLatency*' hook example */}
      <CodeRush.TimerButton
        // if no timeoout, it defaults to easy: 6000, normal: 5000, hard: 4000
        timeout={timeout || (7 - mode) * 1000}
        onGameStart={handleGameStart}
        onLifeLost={loseLife}
        onGameOver={handleGameOver}
        classNames={classes.timerButton(classNames.timerButton)}
        {...{
          mode,
          score,
          livesLeft,
          maxLives,
          timePenalty,
          ...timerButtonProps
        }}
      />
    </div>
  )
}

CodeRushRoot.defaultProps = defaultProps
CodeRushRoot.propTypes = propTypes
