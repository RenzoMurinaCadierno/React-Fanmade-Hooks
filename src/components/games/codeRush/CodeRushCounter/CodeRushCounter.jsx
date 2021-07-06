import { useEffect, useState } from "react"
import { useValueToggle, Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCounter.utils"

export default function CodeRushCounter({
  text,
  value,
  type, // "primary", "secondary", "danger"
  transitionAxis, // "x", "y"
  transitionDirection, // "forwards", "reverse"
  classNames,
  textProps,
  valueProps,
  ...otherProps
}) {
  /**
   * State to render as 'value' '*Text*' `children`. Matches `value`, but
   * synchronizes with it after half its animation processes.
   */
  const [_value, _setValue] = useState(value)

  /**
   * Animation className toggler
   */
  const [valueAnimationCN, triggerValueAnimation] = useValueToggle({
    on: classes.valueAnimation(transitionAxis, transitionDirection),
    off: "",
    timeout: 250
  })

  /**
   * When `value` changes, fire the animation className, and change "_value" to
   * match `value` when half of the animation is completed. This creates an
   * effect where the previous value moves away from its container from one
   * side and the new one appears from the other side.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
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
        noMargin
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
