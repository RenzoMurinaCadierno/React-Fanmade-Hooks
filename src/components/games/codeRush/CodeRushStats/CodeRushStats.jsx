import { memo, useEffect, useRef } from "react"
import { CodeRush } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  textProps
} from "./CodeRushStats.utils"

function CodeRushStats({
  score,
  maxLives,
  livesLeft,
  classNames,
  hiScoreProps,
  scoreProps,
  livesProps,
  ...otherProps
}) {
  const hiScore = useRef(0)

  useEffect(() => {
    if (score > hiScore.current) ++hiScore.current
  }, [score])

  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Score
        type="secondary"
        text="High"
        score={score > hiScore.current ? score : hiScore.current}
        {...{ textProps, ...hiScoreProps }}
      />
      <CodeRush.Score
        disabled={!livesLeft}
        {...{ score, textProps, ...scoreProps }}
      />
      <CodeRush.Lives
        disabled={!livesLeft}
        {...{ maxLives, livesLeft, textProps, ...scoreProps }}
      />
    </div>
  )
}

CodeRushStats.defaultProps = defaultProps
CodeRushStats.propTypes = propTypes

export default memo(CodeRushStats)
