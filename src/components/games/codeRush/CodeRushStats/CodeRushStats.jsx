import { CodeRush } from "hub"
import { memo } from "react"
import {
  classes,
  defaultProps,
  propTypes,
  textProps,
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
  hiScoreProps,
  scoreProps,
  livesProps,
  levelProps,
  penaltyProps,
  modeProps,
  ...otherProps
}) {
  const timePenaltyValue = getTimePenaltyValue(
    score,
    mode,
    livesLeft,
    timePenalty
  )
    change level and lives order, continue with vh css
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Counter
        text="Score"
        value={score}
        disabled={!livesLeft}
        classNames={classes.score(classNames.score)}
        {...{ textProps, ...scoreProps }}
      />
      <CodeRush.Counter
        text="High"
        value={hiScores[mode]}
        type="secondary"
        transitionDirection="reverse"
        classNames={classes.highScore(classNames.highScore)}
        {...{ textProps, ...hiScoreProps }}
      />
      <CodeRush.Lives
        disabled={!livesLeft}
        {...{ maxLives, livesLeft, textProps, ...scoreProps }}
      />
      <CodeRush.Counter
        text="Level"
        value={getLevelValue(score, mode, livesLeft)}
        transitionDirection="reverse"
        disabled={!livesLeft}
        classNames={classes.level(classNames.level)}
        {...{ textProps, ...levelProps }}
      />
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
