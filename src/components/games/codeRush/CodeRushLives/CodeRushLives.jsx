import { useEffect } from "react"
import { useClassNameToggle, Text } from "hub"
import {
  classes,
  defaultProps,
  propTypes,
  renderLives
} from "./CodeRushLives.utils"

export default function CodeRushLives({
  imgSrc,
  imgAlt,
  livesLeft,
  maxLives,
  onLifeLost,
  classNames,
  textProps,
  livesContainerProps,
  lifeProps,
  ...otherProps
}) {
  const [animateLifeLostCN, triggerLifeLostCN] = useClassNameToggle({
    className: classes.animateLifeLost,
    timeout: 350
  })

  useEffect(() => livesLeft !== maxLives && triggerLifeLostCN(), [livesLeft])

  return (
    <figure className={classes.container(classNames.container)} {...otherProps}>
      <figcaption>
        <Text
          htmlElem="h5"
          italic
          type="primary-3"
          className={classes.text(classNames.text)}
          {...textProps}
        >
          Lives
        </Text>
      </figcaption>
      <div
        className={
          classes.livesContainer(classNames.livesContainer) +
          " " +
          animateLifeLostCN
        }
        {...livesContainerProps}
      >
        {renderLives(
          maxLives,
          livesLeft,
          imgSrc,
          imgAlt,
          classes.life(classNames.life),
          lifeProps
        )}
      </div>
    </figure>
  )
}

CodeRushLives.defaultProps = defaultProps
CodeRushLives.propTypes = propTypes
