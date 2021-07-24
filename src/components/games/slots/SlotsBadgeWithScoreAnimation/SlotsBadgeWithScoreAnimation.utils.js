import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsBadgeWithScoreAnimation.module.css"

export const classes = {
  animated: (isStarBadge, classNames) => ({
    ...classNames,
    container: cnp.default(
      styles[isStarBadge ? "AnimatedStarContainer" : "AnimatedContainer"],
      classNames?.container
    )
  }),
  main: (classNames) => classNames
}

export const defaultProps = { classNames: {} }

/**
 * Timeout param for 'useAnimatedNumber' in '*BadgeWithAnimatedNumber*'
 */
export const hookConfigs = { timeout: 300 }

export const propTypes = {
  name: PropTypes.string.isRequired,
  badgeEffectImgSrc: PropTypes.string.isRequired,
  badgeEffectImgAlt: PropTypes.string.isRequired,
  scoreMultiplier: PropTypes.number,
  triggerScoreEffectOn: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  classNames: PropTypes.exact({
    animated: PropTypes.exact({
      container: PropTypes.string,
      content: PropTypes.string
    }),
    main: PropTypes.exact({
      container: PropTypes.string,
      content: PropTypes.string
    })
  })
}
