import { memo, useEffect, useRef } from "react"
import { CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  textProps,
  defaultPenaltyProps,
  getLevelValue,
  getTimePenalty
} from "./CodeRushStats.utils"

function CodeRushStats({
  difficulty,
  score,
  maxLives,
  livesLeft,
  classNames,
  hiScoreProps,
  scoreProps,
  livesProps,
  levelProps,
  penaltyProps,
  ...otherProps
}) {
  const hiScore = useRef(0)
  const timePenalty = getTimePenalty(score, difficulty)

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
        {...{ textProps, ...scoreProps }}
      />
      <CodeRush.Counter
        text="High"
        value={score > hiScore.current ? score : hiScore.current}
        type="secondary"
        transitionDirection="reverse"
        {...{ textProps, ...hiScoreProps }}
      />
      <CodeRush.Lives
        disabled={!livesLeft}
        {...{ maxLives, livesLeft, textProps, ...scoreProps }}
      />
      <CodeRush.Counter
        text="Level"
        value={getLevelValue(score, difficulty)}
        transitionDirection="reverse"
        disabled={!livesLeft}
        {...{ textProps, ...levelProps }}
      />
      <div />
      <CodeRush.Counter
        text="Penalty"
        value={getTimePenalty(score, difficulty)}
        type="danger"
        transitionAxis="y"
        disabled={!livesLeft || timePenalty === "0ms"}
        {...{ ...defaultPenaltyProps, ...penaltyProps }}
      />
    </div>
  )
}
disabled lives animate, they should not! filler div, what to add?
CodeRushStats.defaultProps = defaultProps
CodeRushStats.propTypes = propTypes

export default memo(CodeRushStats)
