import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./SlotsResultSection.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  title: (className) => styles.Title + cn.get(className),
  titleBackground: (className) => styles.TitleBackground + cn.get(className),
  item: (classNames) => classNames
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  isStatsSection: PropTypes.bool,
  imageArrays: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  multiplierImageArray: PropTypes.arrayOf(PropTypes.string),
  scoreData: PropTypes.objectOf(
    PropTypes.shape({
      1: PropTypes.number,
      2: PropTypes.number,
      3: PropTypes.number,
      multiplier: PropTypes.number.isRequired
    })
  ),
  badgesProps: PropTypes.objectOf(
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  ).isRequired,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    title: PropTypes.string,
    titleBackground: PropTypes.string,
    item: PropTypes.object
  })
}

/**
 * Given current '*Badge*' props in *slotsGame.reducer*'s state (in "scores"
 *   and "stats" objects there), it returns current `content` prop as is if
 *   incoming `badgeProps` is from "stats" object, or the sum of `content`s of
 *   all '*Badge*'s whose `show` prop is false (meaning that slot's score was
 *   hit during gameplay).
 *
 * @param {object} badgeProps '*Badge*' component's props in reducer state.
 * @param {boolean} isStatsSection True if we are dealing with "stats" section
 *   (heart, star). False if we are at "slots" (apple, cherry, lemon, berry).
 *
 * @returns {number} The number to display as '*Badge*' content prop
 */
export function getBadgeContent(badgeProps, isStatsSection) {
  return badgeProps.reduce((acc, prop) => {
    if (isStatsSection) return (acc += prop.content)
    return prop.show ? acc : (acc += prop.content)
  }, 0)
}
