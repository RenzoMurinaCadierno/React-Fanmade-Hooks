import { memo, useEffect, useState } from "react"
import { useClassNameToggle, Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCode.utils"

function CodeRushCode({ code, className }) {
  const [_code, _setCode] = useState(code)

  const [codeAnimationCN, triggerCodeAnimation] = useClassNameToggle({
    className: classes.animateCode,
    timeout: 250
  })

  useEffect(() => {
    triggerCodeAnimation()
    const changeCodeTimeout = setTimeout(() => _setCode(code), 125)
    return () => clearTimeout(changeCodeTimeout)
  }, [code])

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
