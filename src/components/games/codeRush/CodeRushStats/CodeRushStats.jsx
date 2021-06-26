import { memo } from "react"
import { CodeRush } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushStats.utils"

function CodeRushStats({
  score,
  maxLives,
  livesLeft,
  classNames,
  scoreProps,
  livesProps,
  ...otherProps
}) {
  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <CodeRush.Score score={score} {...scoreProps} />
      <CodeRush.Lives
        // onLifeLost={(a, b) => console.log(a, b)}
        {...{ maxLives, livesLeft }}
        {...scoreProps}
      />
    </div>
  )
}

CodeRushStats.defaultProps = defaultProps
CodeRushStats.propTypes = propTypes

export default memo(CodeRushStats)
