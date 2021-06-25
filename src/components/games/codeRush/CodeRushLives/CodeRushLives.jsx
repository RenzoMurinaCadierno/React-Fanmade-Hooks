import { classes, defaultProps, propTypes } from "./CodeRushLives.utils"

export default function CodeRushLives({
  imgSrc,
  imgAlt,
  maxLives,
  livesLeft,
  classNames,
  textProps,
  livesContainerProps,
  lifeProps,
  ...otherProps
}) {
  const livesArray = new Array(maxLives)
    .fill(null)
    .map((_, i) => (
      <img
        key={i}
        src={imgSrc}
        alt={imgAlt}
        disabled={i > livesLeft}
        className={classes.life(classNames.life)}
        {...lifeProps}
      />
    ))

  return (
    <div className={classes.container(classNames.container)} {...otherProps}>
      <span className={classes.text(classNames.text)} {...textProps}>
        Lives
      </span>
      <div
        className={classes.livesContainer(classNames.livesContainer)}
        {...livesContainerProps}
      >
        {livesArray}
      </div>
    </div>
  )
}

CodeRushLives.defaultProps = defaultProps
CodeRushLives.propTypes = propTypes
