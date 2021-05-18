import PropTypes from "prop-types"
import styles from "./SlotsBadgeWithScoreAnimation.module.css"

export const classes = {
  animated: (isStarBadge, classNames) => ({
    container:
      (classNames?.container ?? "") +
      " " +
      styles[isStarBadge ? "AnimatedStarContainer" : "AnimatedContainer"],
    content: classNames?.content ?? ""
  }),
  main: (classNames) => ({
    container: classNames?.container ?? "",
    content: classNames?.content ?? ""
  })
}

// timeout param for 'useAnimatedNumber' in '*BadgeWithAnimatedNumber*'
export const hookConfigs = { timeout: 300 }

export const slotsBadgeWithScoreAnimationPropTypes = {
  name: PropTypes.string.isRequired,
  badgeEffectImgSrc: PropTypes.string.isRequired,
  badgeEffectImgAlt: PropTypes.string.isRequired,
  scoreMultiplier: PropTypes.number,
  triggerScoreEffectOn: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  classNames: PropTypes.shape({
    animated: PropTypes.shape({
      container: PropTypes.string,
      content: PropTypes.string
    }),
    main: PropTypes.shape({
      container: PropTypes.string,
      content: PropTypes.string
    })
  })
}
