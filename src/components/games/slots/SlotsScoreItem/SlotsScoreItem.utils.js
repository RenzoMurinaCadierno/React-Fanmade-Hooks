import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsScoreItem.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  badge: (classNames) => classNames
}

export const defaultProps = {
  badgesProps: [],
  classNames: {},
  otherBadgeProps: {}
}

const badgePropsShape = PropTypes.shape({
  key: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  content: PropTypes.number.isRequired,
  previousContent: PropTypes.number,
  anchor: PropTypes.string,
  animateOn: PropTypes.number,
  size: PropTypes.string,
  type: PropTypes.string
})

export const propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  badgesProps: PropTypes.arrayOf(badgePropsShape),
  badgeEffectImgArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  scoreMultiplier: PropTypes.number,
  propThatTriggersScoreEffect: validatePropThatTriggersScoreEffect,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    badge: PropTypes.exact({
      main: PropTypes.object,
      animated: PropTypes.object
    })
  }),
  otherBadgeProps: PropTypes.object
}

/**
 * Throws a PropType error if `props.badgesProps` is not an Array of plain
 * objects each representing `props` of '*Badges*' to map into
 * '*SlotsBadgeWithScoreAnimation*'.
 *
 * It will also fail if `propThatTriggersScoreEffect` does not match a key
 * name in each one of the objects inside `props.badgesProps`.
 *
 * @param {object} props '*SlotsScoreItem*' props
 * @param {string} propName "propThatTriggersScoreEffect"
 * @param {string} cmpName "SlotsScoreItem"
 */
function validatePropThatTriggersScoreEffect(props, propName, cmpName) {
  const propThatTriggersScoreEffect = props[propName]

  if (typeof propThatTriggersScoreEffect === "undefined") return

  if (!Array.isArray(props.badgesProps)) {
    return new Error(
      `Invalid environment for prop \`${propName}\` in "${cmpName}".\n\n"${cmpName}" must have \`badgesProps\` prop defined as an array of a plain objects, each representing props for each "SlotsBadgeWithScoreAnimation" to map and render.\n`
    )
  }

  for (let i = 0; i < props.badgesProps.length; i++) {
    if (!isPlainObject(props.badgesProps[i])) {
      return new Error(
        getSharedErrorText(propName, propThatTriggersScoreEffect, cmpName) +
          `badgesProps\` prop in "${cmpName}" must an array of a plain objects.\n\n\t> Error type: NOT_PLAIN_OBJECT\n\t> Component name: ${
            props.name
          }\n\t>Prop name: \`badgesProps\`\n\t> Index in prop: ${i}\n\t> Prop Type: ${typeof props
            .badgesProps[i]}.\n`
      )
    }
    if (!props.badgesProps[i].hasOwnProperty(propThatTriggersScoreEffect)) {
      const keysInErrorObject = Object.keys(props.badgesProps[i]).join(", ")
      return new Error(
        getSharedErrorText(propName, propThatTriggersScoreEffect, cmpName) +
          `\`${propName}\` must match one key name on each plain object in \`badgesProps\`.\n\n\t> Error type: PROP_DOES_NOT_MATCH_KEY\n\t> Component name: ${
            props.name
          }\n\t> Key to match: ${stringify(
            propThatTriggersScoreEffect
          )} \n\t> Prop name: \`badgesProps\`\n\t> Index in prop: ${i}.\n\t> Key names in prop: ${keysInErrorObject}\n`
      )
    }
  }
}

function isPlainObject(obj) {
  return typeof obj === "object" && obj instanceof Object && !Array.isArray(obj)
}

function getSharedErrorText(propName, targetProp, cmpName) {
  return `Invalid prop \`${propName}\` with value \`${stringify(
    targetProp
  )}\` in "${cmpName}".\n\n`
}

function stringify(val) {
  try {
    return JSON.stringify(val)
  } catch (_) {
    return val.toString()
  }
}
