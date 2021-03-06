import PropTypes from "prop-types"
import { Layout, Text } from "hub"
// import styles from './TextWithRandomizedLayout.module.css'

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
  texts: [
    "Now with NaN% less bugs",
    "Async javrules!ascript",
    "Next time, a UI/UX library",
    "Fonts are a thing!?",
    "StrictMode worse than wife",
    "Warning: eye-bleeding code",
    "Lost job to DELETE FROM",
    "7 months of joyful crying",
    "//, best bug fixer",
    "console.log count: 7518",
    "Meetings can be mails",
    "Lost track of coffee cups",
    "99.9% free of Easter eggs",
    '1 ";": $1 weekend.-',
    "I miss tutorial hell",
    "Standard background ftw",
    "... --- ...",
    "undefined"
  ],
  delayBetweenIterations: 5000
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

/**
 * Returns a random element in `arr`.
 *
 * @param {Array} arr The array to return an element from.
 */
export function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Class used to generate and return random props to spread in '*Layout*' and
 * '*Text*', in order to create erratic animation, orientation and stylings for
 * falvor text.
 */
export class PropsRandomizer {
  constructor(animationProps, orientationProps) {
    this.otherLayoutProps = { animationProps, orientationProps }
    /**
     * Object with each animation phase as key and their respective values as
     * array of strings.
     */
    this.animationPhasesObj = getArrayOfValuesFromObject(
      Layout.Animation.constants.animationNames
    )

    const { anchors, rotations } = Layout.Orientation.constants

    /**
     * Array of sub-arrays, each with layout orientation's anchors as first
     * element, and a sub array of acceptable rotations as second element.
     */
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

    /**
     * All valid '*Text*' types but "danger" variants.
     */
    this.textTypes = Object.values(Text.constants.types).reduce(
      (acc, str) => (str.includes("danger") ? acc : [...acc, str]),
      []
    )
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

  getOneRandomTextType = () => getRandomValueFromArray(this.textTypes)

  /**
   * Returns an object shaped:
   *
   * * `textProps` (object): containing `type` and `text`, both with one valid
   *   random value, to ne spreaded in '*Text*'.
   *
   * * `layoutProps` (object): containing `animationProps` and
   *   `orientationProps` both with one valid random value, to be spreaded in
   *   '*Layout*'.
   *
   * > **Note:** `animationProps` and `orientationProps` passed when
   *   instantiating this object will be spreaded here. If any of those match
   *   keys in `animationProps.animationNames`, `orientationProps.rotation` or
   *   `orientationProps.anchor`, then the matching keys generated by this
   *   object will be overriden by the passed ones.
   */
  getRandomProps = (texts = []) => ({
    layoutProps: {
      animationProps: {
        ...this.getOneRandomValueForEachAnimationPhase(),
        ...this.otherLayoutProps.animationProps
      },
      orientationProps: {
        ...this.getOneRandomValueForEachOrientation(),
        ...this.otherLayoutProps.orientationProps
      }
    },
    textProps: {
      type: getRandomValueFromArray(this.textTypes),
      text: getRandomValueFromArray(texts)
    }
  })
}
