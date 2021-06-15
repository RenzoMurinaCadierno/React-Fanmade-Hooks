import PropTypes from "prop-types"
// import styles from './CodeMenuWithMediaQuery.module.css'

export const defaultProps = {
  useMediaQueryArgs: [],
  mqToAnchor: { default: "top-right" },
  classNames: {}
}

const validAnchorStrings = [
  "top-left",
  "top",
  "top-right",
  "left",
  "bottom-left",
  "bottom",
  "bottom-right",
  "right",
  "center"
]

export const propTypes = {
  useMediaQueryArgs: validateUseMediaQueryArgs,
  mqToAnchor: PropTypes.objectOf(PropTypes.oneOf(validAnchorStrings)),
  classNames: PropTypes.object
}

function validateUseMediaQueryArgs(props, propName, cmpName) {
  const useMediaQueryArgs = props[propName]

  if (typeof useMediaQueryArgs === "undefined") return

  const invalidPropMsg = `Invalid prop \`${propName}\` of value \`${useMediaQueryArgs}\` supplied to \`${cmpName}\`.\n\n`

  if (!Array.isArray(useMediaQueryArgs)) {
    return new TypeError(
      invalidPropMsg +
        `Expected \`undefined\` or an array shaped:\n\n  > \`elem 0\` (object) Custom queries object\n\n  > \`elem 1\` (boolean) Combine default queries with custom ones\n\n  > \`elem 2\` (number) Delay to trigger a media query update, in milliseconds.\n\nCheck "useMediaQuery" hook file for further instructions.\n`
    )
  }

  const firstArg = useMediaQueryArgs[0]

  if (
    useMediaQueryArgs.length &&
    (!firstArg ||
      !typeof firstArg === "object" ||
      !firstArg instanceof Object ||
      !Object.keys(firstArg).length)
  ) {
    return new TypeError(
      invalidPropMsg +
        `Expected a non-empty plain object containing "custom queries" as first argument of \`${propName}\`.\n\nCheck "useMediaQuery" hook file for further instructions.\n`
    )
  }

  for (const mq in firstArg) {
    if (typeof firstArg[mq] !== "string") {
      return new TypeError(
        `Invalid value \`${firstArg[mq]}\` supplied to key \`${mq}\` in "custom queries" object (first argument in prop \`${propName}\` of \`${cmpName}\`).\n\nExpected a string.\n\nCheck "useMediaQuery" hook file for further instructions on "custom queries" object.\n`
      )
    }
  }
}

/**
 * Returns the value associated to the first key in `mqToAnchorProp` that
 * equals to one in `mqMatchInHook` with `true` as its value.
 *
 * If no keys match or all `mqMatchInHook` keys have `false` values, it returns
 * `mqToAnchorProp.default` associated value.
 *
 * If `mqToAnchorProp.default` is undefined, it falls backs to 'top-right'.
 *
 * @param {object} mqMatchInHook "useMediaQuery" current query matches.
 * @param {object} mqToAnchorProp '*CodeMenuWithMediaQuery*' `mqToAnchorProp`.
 */
export function getAnchor(mqMatchInHook, mqToAnchorProp) {
  for (const mq in mqToAnchorProp) {
    if (mqMatchInHook[mq]) return mqToAnchorProp[mq]
  }
  return mqToAnchorProp.default ?? "top-right"
}
