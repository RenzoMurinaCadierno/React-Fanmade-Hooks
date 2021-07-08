import { Confetti } from "hub"
import { classes, defaultProps, propTypes } from "./ConfettiContainer.utils"

export default function ConfettiContainer({
  quantity,
  absoluteFill,
  fullScreen,
  classNames,
  guideXProps,
  guideYProps,
  glitterProps,
  ...otherProps
}) {
  const guideProps = { guideXProps, guideYProps, glitterProps }

  return (
    <div
      className={classes.container(
        absoluteFill,
        fullScreen,
        classNames.container
      )}
      {...otherProps}
    >
      {renderGuides(quantity, classNames.guides, guideProps)}
    </div>
  )
}

ConfettiContainer.defaultProps = defaultProps
ConfettiContainer.propTypes = propTypes

function renderGuides(quantity, classNames, guideProps) {
  return new Array(quantity)
    .fill(null)
    .map((_, i) => (
      <Confetti.Guides
        key={i}
        classNames={classes.guides(classNames)}
        {...guideProps}
      />
    ))
}
