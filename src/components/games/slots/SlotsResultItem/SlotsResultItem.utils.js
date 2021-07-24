import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsResultItem.module.css"

export const classes = {
  container: (className) => cnp.default(styles.Container, className),
  image: (className) => cnp.default(styles.Image, className),
  badge: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.BadgeContainer, classNames?.container)
  }),
  multiplierFigure: (className) =>
    cnp.default(styles.MultiplierFigure, className),
  multiplierImage: (className) => cnp.default(styles.MultiplierImage, className)
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
