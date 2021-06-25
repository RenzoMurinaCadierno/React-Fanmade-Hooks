import { CodeRush } from "hub"
import { classes, defaultProps, propTypes } from "./CodeRushStats.utils"

export default function CodeRushStats({ classNames }) {
  return (
    <div className={classes.container(classNames.container)}>
      <CodeRush.Score />
      <CodeRush.Lives />
    </div>
  )
}

CodeRushStats.defaultProps = defaultProps
CodeRushStats.propTypes = propTypes
