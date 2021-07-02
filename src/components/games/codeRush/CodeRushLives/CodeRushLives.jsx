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
  // 'life lost' animation className toggler
  const [animateLifeLostCN, triggerLifeLostCN] = useClassNameToggle({
    className: classes.animateLifeLost,
    timeout: 350
  })

  /**
   * Any time a life is lost, trigger animation. A life lost triggers when
   * `livesLeft` changes while it does not equal `maxLives` (at game start or
   * at game inactive).
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => livesLeft !== maxLives && triggerLifeLostCN(), [livesLeft])

  return (
    // wrapper container
    <figure className={classes.container(classNames.container)} {...otherProps}>
      {/* 'Lives' title */}
      <figcaption>
        <Text
          htmlElem="h5"
          italic
          noMargin
          type="primary-3"
          className={classes.text(classNames.text)}
          {...textProps}
        >
          Lives
        </Text>
      </figcaption>
      {/* 'lives' container */}
      <div
        className={
          classes.livesContainer(classNames.livesContainer) +
          " " +
          animateLifeLostCN
        }
        {...livesContainerProps}
      >
        {/* either: (1) individual 'life' '*img*'(s) when `livesLeft` <= 3, or
          (2) single 'life' '*img*' plus '*Text*' with multiplier (e.g.: x5) */}
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
