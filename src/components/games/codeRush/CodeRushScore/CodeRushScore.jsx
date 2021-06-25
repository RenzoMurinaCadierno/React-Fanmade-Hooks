import { useEffect } from "react"
import { useClassNameToggle } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushScore.utils"

export default function CodeRushScore({ score, classNames }) {
  const [scoreAnimationCN, triggerScoreAnimation] = useClassNameToggle({
    className: classes.scoreAnimation,
    timeout: 250
  })

  useEffect(() => score && triggerScoreAnimation(), [score])

  return (
    <div className={classes.container(classNames.container)}>
      <span className={classes.text(classNames.text)}>Score</span>
      <span
        className={classes.value(classNames.value) + " " + scoreAnimationCN}
      >
        {score}
      </span>
    </div>
  )
}

CodeRushScore.defaultProps = defaultProps
CodeRushScore.propTypes = propTypes
