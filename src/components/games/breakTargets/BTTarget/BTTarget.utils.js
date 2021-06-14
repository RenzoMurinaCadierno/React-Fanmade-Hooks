import PropTypes from "prop-types"
import styles from "./BTTarget.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  target: (type, isDestroyed, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type] : "") +
    " " +
    (isDestroyed ? styles.Destroyed : "") +
    " " +
    styles.Target,
  content: (type, isDestroyed, className) =>
    (className ?? "") +
    " " +
    (type ? styles[type] : "") +
    " " +
    (isDestroyed ? styles.Destroyed : "") +
    " " +
    styles.Content,
  animateTargetDestroyed: styles.AnimateTargetDestroyed,
  animateScore: styles.AnimateScore
}

export const defaultProps = {
  content: "",
  type: "primary",
  x: 50,
  y: 50,
  appearTimeout: 150,
  destroyAnimationTimeout: 300,
  accuracyTimeout: 2000,
  classNames: {},
  contentProps: {}
}

export const propTypes = {
  content: validateContent,
  type: PropTypes.oneOf(["primary", "secondary"]),
  x: validateSpawnCoords,
  y: validateSpawnCoords,
  appearTimeout: PropTypes.number,
  destroyAnimationTimeout: PropTypes.number,
  accuracyTimeout: PropTypes.number,
  selfDestruct: PropTypes.bool,
  destroyOnAccuracyTimeout: PropTypes.bool,
  showOnBreak: validateBreakTargetContent,
  onSpawn: PropTypes.func,
  onHit: PropTypes.func,
  onDestroy: PropTypes.func,
  onSelfDestruct: PropTypes.func,
  onAccuracyTimeout: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    target: PropTypes.string,
    content: PropTypes.string
  }),
  contentProps: PropTypes.object
}

/**
 * PropType check will fail if `content` is not a string or is not an object
 * with keys ranging from 0 to 100, and values as numbers or strings
 */
function validateContent(props, propName, componentName) {
  const content = props[propName]
  const typeOfContent = typeof content
  if (!content || typeOfContent === "string") return
  if (typeOfContent !== "object" && !Array.isArray(content)) {
    return new TypeError(
      `Invalid prop \`${propName}\` of type \`${typeOfContent}\` with value \`${content}\` supplied to \`${componentName}\`. Expected a string or a plain JS object.`
    )
  }
  for (let key in content) {
    const parsedKey = +key
    if (isNaN(parsedKey) || parsedKey > 100 || parsedKey < 0) {
      return new RangeError(
        `Invalid key \`${key}\` of type \`${typeof key}\` in prop \`${propName}\` supplied to \`${componentName}\`. Expected a number from 0 to 100, inclusive. Can also be a string that can be parsed to a number`
      )
    }
    const typeOfValue = typeof content[key]
    if (typeOfValue !== "number" && typeOfValue !== "string") {
      return new Error(
        `Invalid value ${content[key]} of type \`${typeOfValue}\` for key \`${key}\` in prop \`${propName}\` supplied to \`${componentName}\`. Expected a number or a string.`
      )
    }
  }
  return null
}

const showOnBreakValidArray = ["content", "value", "closest"]

/**
 * PropType check will fail if `showOnBreak` is not a string or if their values
 * are not the ones in "showOnBreakValidArray" specified above
 */
function validateBreakTargetContent(props, propName, componentName) {
  const propValue = props[propName]
  if (!propValue) return
  if (
    typeof propValue !== "string" ||
    !showOnBreakValidArray.includes(propValue)
  ) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${propValue}\` supplied to ${componentName}. It should be a string with value \`content\`, \`value\` or \`closest\`. Automatically defaulted to \`content\`.`
    )
  }
  return null
}

/**
 * PropType check will fail if `x` or `y` are not numbers ranging from 0 to 100
 */
function validateSpawnCoords(props, propName, componentName) {
  const propValue = +props[propName]
  if (isNaN(propValue) || propValue > 100 || propValue < 0) {
    return new Error(
      `Invalid prop \`${propName}\` with value \`${props[propName]}\` supplied to ${componentName}. It must be a number ranging from 0 to 100, both inclusive.`
    )
  }
  return null
}

/**
 * It translates the `content` object to the appropriate string to show when target
 * breaks (or uses the string passed as `content` if it was not a JS object).
 * Given the case a JS object was passed as `content`, then it also returns the
 * delta % from target spawn time to its destruction, as well as the closest key
 * (rounded down) associated to that delta %.
 *
 * @param {string | object} content A string or an object with numbers (0 to 100)
 *   as keys and strings as their values
 * @param {number} spawnTime new Date().getTime() on target's spawn
 * @param {number} hitTime new Date().getTime() on target's destruction
 * @param {number} accuracyTimeout target's lifetime dessignated by respective
 *   component's prop
 * @param {number} appearDelayInMs target's "appear" timeout animation in ms
 */
export function getContentOnHit(
  content,
  spawnTime = 0,
  hitTime = 0,
  accuracyTimeout = 0,
  appearDelayInMs = 0
) {
  // anything that's not an object does not need to be analyzed. A string will pass,
  // all other types will be caught by PropTypes as errors
  if (typeof content !== "object") return content
  // calculate the difference in % from target spawn and hit times. Appear delay must
  // be handicapped since player cannot react to it. We also add accuracyTimeout as
  // handicap for 'Coyote' effect.
  let deltaPercentageFromSpawnToHit =
    ((hitTime - spawnTime - accuracyTimeout - appearDelayInMs) /
      accuracyTimeout) *
    -100
  // delta % cannot go lower than 0. If it does, set it to 0
  if (deltaPercentageFromSpawnToHit <= 0) deltaPercentageFromSpawnToHit = 0
  // add all `content` keys to an array and order it from highest to lowest number.
  // We do so because the returned score should always be the highest possible
  const contentTimePercentages = Object.keys(content).sort().reverse()
  // for each of those keys (highest to lowest stablished percentages)...
  for (let ctp of contentTimePercentages) {
    // ...if the calculated delta is higher or equal to it, ...
    if (deltaPercentageFromSpawnToHit >= ctp) {
      // ...return an array with the key's string value, the delta % from before,
      // and the key (which is the closest lower value relative to the delta %)
      return [content[ctp], deltaPercentageFromSpawnToHit, ctp]
    }
  }
  // we only reach this statement if the 'for' loop above failed to match delta %
  // with the given keys. Should not occur due to PropTypes warning from before, but
  // if so, crash the ship with this specific message
  throw new Error(
    `<BlankTarget> Could not match percentages supplied in \`content\` object with hit delta percentage between spawn and hit time. Remeber that \`content\` prop accepts a string or a plain JS object with keys type number (between 0 and 100), and strings as values.`
  )
}

/**
 * Depending on `showOnBreakProp`, it returns the element of the array generated
 * by getContentOnHit() at the respective index.
 * @param {string} showOnBreakProp "showOnBreak" prop
 * @param {Array} result an array returned by getContentOnHit() above
 */
export function getTextToShowOnHit(showOnBreakProp, result) {
  // failsafe. If `result` is not an array, return. It will be handled by PropTypes
  if (!Array.isArray(result)) return result
  switch (showOnBreakProp) {
    case "value":
      // return the calculated delta percentage from target spawn to its destruction
      return result[1]
    case "closest":
      // return the closest designated percentage as "content" object key, relative
      // the calculated delta percentage
      return result[2]
    default:
      // return the value of the "content" key, relative to the delta percentage
      return result[0]
  }
}
