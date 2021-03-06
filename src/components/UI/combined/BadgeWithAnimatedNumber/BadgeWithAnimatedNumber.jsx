// import Badge from "components/UI/combined/Badge/Badge"
import { useAnimatedNumber, Badge } from "hub"
import { defaultProps, propTypes } from "./BadgeWithAnimatedNumber.utils"

/**
 * Returns a '*Badge*' component whose `content` is a number with an animation
 * effect when it changes.
 *
 * @param {object} props
 *
 * `configs?` (number): The number to animate and to use as '*Badge*' `content`.
 *
 * `hookConfigs?` (object): Params to pass to "useAnimatedNumber" hook.
 */
export default function BadgeWithAnimatedNumber({
  content,
  hookConfigs,
  ...otherProps
}) {
  return (
    <Badge
      content={<AnimatedNumber value={content} configs={hookConfigs} />}
      {...otherProps}
    />
  )
}

BadgeWithAnimatedNumber.defaultProps = defaultProps
BadgeWithAnimatedNumber.propTypes = propTypes

/**
 * Creates and returns the value to use as animated number as a React Component
 *
 * @param {object} props
 *
 * `value` (number): The number to animate.
 *
 * `configs` (object): Params to pass to useAnimatedNumber hook.
 *
 * @returns {number} the animated number
 */
function AnimatedNumber({ value, configs }) {
  const num = useAnimatedNumber(value, configs)
  return num
}
