export const defaultProps = { delayBeforeRender: 2000 }

export const propTypes = {
  delayBeforeFirstRender: validateDelayBeforeFirstRender
}

/**
 * Validates `props.delayBeforeFirstRender` being an integer higher than 0.
 */
function validateDelayBeforeFirstRender(props, propName, cmpName) {
  const delayBeforeFirstRender = props[propName]

  if (delayBeforeFirstRender === undefined) return

  if (
    !Number.isInteger(delayBeforeFirstRender) ||
    delayBeforeFirstRender <= 0
  ) {
    throw new TypeError(
      `Invalid value \`${delayBeforeFirstRender}\` supplied to \`${propName}\` at \`${cmpName}\`.\n\nExpected an integer higher than 0.\n`
    )
  }
}
