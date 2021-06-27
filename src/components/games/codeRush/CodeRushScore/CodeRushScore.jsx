import { useEffect, useState } from "react"
import { useClassNameToggle, Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushScore.utils"

export default function CodeRushScore({
  text,
  score,
  type,
  classNames,
  textProps,
  valueProps,
  ...otherProps
}) {
  const [_score, _setScore] = useState(score)

  const [scoreAnimationCN, triggerScoreAnimation] = useClassNameToggle({
    className: classes.scoreAnimation,
    timeout: 250
  })

  useEffect(() => {
    triggerScoreAnimation()
    const changeScoreTimeout = setTimeout(() => _setScore(score), 125)
    return () => clearTimeout(changeScoreTimeout)
  }, [score])

  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <Text
        htmlElem="h5"
        italic
        type={type + "-3"}
        className={classes.text(classNames.text)}
        {...textProps}
      >
        {text}
      </Text>
      <Text
        htmlElem="h6"
        type={type + "-1"}
        className={classes.value(classNames.value) + " " + scoreAnimationCN}
        {...valueProps}
      >
        {score}
      </Text>
    </div>
  )
}

CodeRushScore.defaultProps = defaultProps
CodeRushScore.propTypes = propTypes
