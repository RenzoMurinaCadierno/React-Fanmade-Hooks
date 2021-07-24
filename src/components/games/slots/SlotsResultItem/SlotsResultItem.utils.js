import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./SlotsResultItem.module.css"

export const classes = {
  container: (className) => styles.Container + cn.get(className),
  image: (className) => styles.Image + cn.get(className),
  badge: (classNames = {}) => ({
    ...classNames,
    container: styles.BadgeContainer + cn.get(classNames?.container)
  }),
  multiplierFigure: (className) => styles.MultiplierFigure + cn.get(className),
  multiplierImage: (className) => styles.MultiplierImage + cn.get(className)
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  badgeContent: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  multiplier: PropTypes.number,
  multiplierImgSrc: PropTypes.string,
  multiplierImgAlt: PropTypes.string,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    image: PropTypes.string,
    badge: PropTypes.object,
    multiplierFigure: PropTypes.string,
    multiplierImage: PropTypes.string
  })
}

/**
 * Configs to pass to 'useAnimatedNumber' hook in '*BadgeWithAnimatedNumber*'
 */
export const hookConfigs = { timeout: 300, initialValue: 0 }
