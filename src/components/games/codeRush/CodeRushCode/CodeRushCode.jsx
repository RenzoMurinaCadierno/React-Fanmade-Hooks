import { memo } from "react"
import { Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCode.utils"

function CodeRushCode({ code, className }) {
  const isGameInactive = code.length <= 1

  return (
    <Text
      htmlElem={isGameInactive ? "h5" : "h4"}
      italic={isGameInactive}
      disabled={isGameInactive}
      className={classes.container(className)}
    >
      {(isGameInactive ? "" : "Code: ") + code.join(" ")}
    </Text>
  )
}

CodeRushCode.defaultProps = defaultProps
CodeRushCode.propTypes = propTypes

export default memo(CodeRushCode)
