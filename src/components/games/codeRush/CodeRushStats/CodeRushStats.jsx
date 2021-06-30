import { memo, useEffect, useRef } from "react"
import { CodeRush } from "hub"
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
  maxLives,
  livesLeft,
  classNames,
  hiScoreProps,
  scoreProps,
  livesProps,
  levelProps,
  penaltyProps,
  modeProps,
  ...otherProps
}) {
  const hiScore = useRef(0)
  const timePenaltyValue = getTimePenaltyValue(score, mode, livesLeft)

  useEffect(() => {
    if (score > hiScore.current) ++hiScore.current
  }, [score])
  // add level while score increases
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
        value={score > hiScore.current ? score : hiScore.current}
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

export default memo(CodeRushStats)
