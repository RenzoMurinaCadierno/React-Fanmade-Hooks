import { memo, useEffect, useState } from "react"
import { useClassNameToggle, Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCode.utils"

function CodeRushCode({ code, className }) {
  // internal state that syncs with `code` after half its animation time passes
  const [_code, _setCode] = useState(code)

  // animation toggler
  const [codeAnimationCN, triggerCodeAnimation] = useClassNameToggle({
    className: classes.animateCode,
    timeout: 250
  })

  // trigger animation on `code` change, and set inner `_code` to match `code`
  // after half the animation duration passes
  useEffect(() => {
    triggerCodeAnimation()
    const changeCodeTimeout = setTimeout(() => _setCode(code), 125)
    return () => clearTimeout(changeCodeTimeout)
  }, [code])

  /**
   * Game is considered inactive when `code` length is less than 1. Those
   * cases apply when `code` holds 'game start' and 'game over' messages
   */
  const isGameInactive = code.length <= 1

  return (
    <Text
      htmlElem="h5"
      italic={isGameInactive}
      disabled={isGameInactive}
      className={classes.container(className) + " " + codeAnimationCN}
    >
      {_code.join(" ")}
    </Text>
  )
}

CodeRushCode.defaultProps = defaultProps
CodeRushCode.propTypes = propTypes

export default memo(CodeRushCode)
