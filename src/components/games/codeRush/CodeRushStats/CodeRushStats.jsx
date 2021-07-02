import { CodeRush } from "hub"
import { memo } from "react"
import {
  classes,
  defaultProps,
  propTypes,
  smallCounterProps,
  getDefaultModeProps,
  getLevelValue,
  getTimePenaltyValue,
  getModeValue
} from "./CodeRushStats.utils"

function CodeRushStats({
  mode,
  switchMode,
  score,
  hiScores,
  maxLives,
  livesLeft,
  timePenalty,
  classNames,
  hiScoresProps,
  scoreProps,
  livesProps,
  levelProps,
  penaltyProps,
  modeProps,
  ...otherProps
}) {
  /**
   * Gets the string value for 'penalty' '*CodeRush.Counter*' `value`.
   * We substract it here since its value is needed to calculate `disabled`.
   */
  const timePenaltyValue = getTimePenaltyValue(
    score,
    mode,
    livesLeft,
    timePenalty
  )

  return (
    // wrapper container
    <div className={classes.container(classNames.container)} {...otherProps}>
      {/* 'score' counter */}
      <CodeRush.Counter
        text="Score"
        value={score}
        disabled={!livesLeft}
        classNames={classes.score(classNames.score)}
        {...{ ...scoreProps }}
      />
      {/* 'high score' counter */}
      <CodeRush.Counter
        text="High"
        value={hiScores[mode]}
        type="secondary"
        classNames={classes.highScore(classNames.highScore)}
        {...hiScoresProps}
      />
      {/* 'lives left' display */}
      <CodeRush.Lives
        disabled={!livesLeft}
        {...{ maxLives, livesLeft, ...scoreProps }}
      />
      {/* 'level' counter */}
      <CodeRush.Counter
        text="Level"
        value={getLevelValue(score, mode, livesLeft)}
        disabled={!livesLeft}
        classNames={classes.level(classNames.level)}
        {...levelProps}
      />
      {/* 'time penalty' counter */}
      <CodeRush.Counter
        text="Penalty"
        value={timePenaltyValue}
        type="danger"
        transitionAxis="y"
        transitionDirection="reverse"
        disabled={!livesLeft || timePenaltyValue === "0ms"}
        classNames={classes.penalty(classNames.penalty)}
        {...{ ...smallCounterProps, ...penaltyProps }}
      />
      {/* 'mode' (difficulty) counter */}
      <CodeRush.Counter
        text="Mode"
        value={getModeValue(mode)}
        type="secondary"
        transitionAxis="y"
        disabled={livesLeft}
        onClick={livesLeft ? null : switchMode}
        classNames={classes.mode(classNames.mode)}
        {...{ ...getDefaultModeProps(mode), ...modeProps }}
      />
    </div>
  )
}

CodeRushStats.defaultProps = defaultProps
CodeRushStats.propTypes = propTypes

// `memo` prevents an extra render on each '*PhoneDial*' button click
export default memo(CodeRushStats)
