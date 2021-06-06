import PropTypes from "prop-types"
import styles from "./SlotsResultItem.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container,
  image: (className) => (className ?? "") + " " + styles.Image,
  badge: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.BadgeContainer
  }),
  multiplierFigure: (className) =>
    (className ?? "") + " " + styles.MultiplierFigure,
  multiplierImage: (className) =>
    (className ?? "") + " " + styles.MultiplierImage
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
