import { useEffect, useState } from "react"
import { useClassNameToggle, Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCounter.utils"

export default function CodeRushCounter({
  text,
  value,
  type,
  transitionAxis,
  transitionDirection,
  classNames,
  textProps,
  valueProps,
  ...otherProps
}) {
  const [_value, _setValue] = useState(value)

  const [valueAnimationCN, triggerValueAnimation] = useClassNameToggle({
    className: classes.valueAnimation(transitionAxis, transitionDirection),
    timeout: 250
  })

  useEffect(() => {
    triggerValueAnimation()
    const changeScoreTimeout = setTimeout(() => _setValue(value), 125)
    return () => clearTimeout(changeScoreTimeout)
  }, [value])

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
        noMargin
        className={classes.value(classNames.value) + " " + valueAnimationCN}
        {...valueProps}
      >
        {_value}
      </Text>
    </div>
  )
}

CodeRushCounter.defaultProps = defaultProps
CodeRushCounter.propTypes = propTypes
