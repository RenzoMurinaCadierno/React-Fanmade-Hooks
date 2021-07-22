import PropTypes from "prop-types"
import { Layout } from "hub"

function getArrayOfValuesFromObject(object) {
  return Object.entries(object).reduce(
    (acc, [key, valueObject]) => ({
      ...acc,
      [key]: Object.values(valueObject)
    }),
    {}
  )
}

export const defaultProps = {
  texts: ["holi biti", "lala", "nono", "a a a"],
  delayBetweenIterations: 1000
}

export const propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string),
  delayBetweenIterations: validateDelayBetweenIterations
}

/**
 * Validates `props.delayBetweenIterations` being an integer higher than 0.
 */
function validateDelayBetweenIterations(props, propName, cmpName) {
  const delayBetweenIterations = props[propName]

  if (delayBetweenIterations === undefined) return

  if (
    !Number.isInteger(delayBetweenIterations) ||
    delayBetweenIterations <= 0
  ) {
    throw new TypeError(
      `Invalid value \`${delayBetweenIterations}\` supplied to \`${propName}\` at \`${cmpName}\`.\n\nExpected an integer higher than 0.\n`
    )
  }
}
go on commenting vvv
export function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export class RandomLayoutProps {
  constructor() {
    this.animationPhasesObj = getArrayOfValuesFromObject(
      Layout.Animation.constants.animationNames
    )

    const { anchors, rotations } = Layout.Orientation.constants

    this.orientationEntries = Object.values(anchors).reduce((acc, anchor) => {
      // ignore text rendering at screen's center (render only at sides)
      if (anchor === anchors.CENTER) return acc

      // top and bottom anchors be rotated upside-down, or not rotated.
      if (anchor === anchors.TOP || anchor === anchors.BOTTOM) {
        return [...acc, [anchor, [null, rotations.FORWARDS]]]
      }

      // left and right anchors can rotate on both directions
      return [...acc, [anchor, [rotations.FORWARDS, rotations.BACKWARDS]]]
    }, [])
  }

  getOneRandomValueForEachAnimationPhase = () => {
    let animationPhasesProps = {}

    for (const key in this.animationPhasesObj) {
      animationPhasesProps[key] = getRandomValueFromArray(
        this.animationPhasesObj[key]
      )
    }

    return animationPhasesProps
  }

  getOneRandomValueForEachOrientation = () => {
    const [anchor, validRotations] = getRandomValueFromArray(
      this.orientationEntries
    )

    return { anchor, rotate: getRandomValueFromArray(validRotations) }
  }

  /**
   * Returns random `mount`, `idle` and `unmount` animation props, and `anchor`
   * and `rotation` orientation props.
   *
   * The returned object is meant to be spreaded in '*Layout*'.
   */
  getRandomProps = () => ({
    animationProps: this.getOneRandomValueForEachAnimationPhase(),
    orientationProps: this.getOneRandomValueForEachOrientation()
  })
}
