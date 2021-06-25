import { memo } from "react"
import { Text } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushCode.utils"

function CodeRushCode({ code, className }) {
  return (
    <Text htmlElem="h4" className={classes.container(className)}>
      {(code.length > 1 ? "Code: " : "") + code.join(" ")}
    </Text>
  )
}

CodeRushCode.defaultProps = defaultProps
CodeRushCode.propTypes = propTypes

export default memo(CodeRushCode)
