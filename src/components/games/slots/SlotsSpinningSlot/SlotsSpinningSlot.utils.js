import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./SlotsSpinningSlot.module.css"

export const classes = {
  slotCarousel: (classNames = {}) => ({
    ...classNames,
    container: cnp.default(styles.SlotCarouselContainer, classNames?.container)
  }),
  slotSlide: (containerCN, animateMountCN, animateUnmountCN) => ({
    container: cnp.get(containerCN),
    animateMount: cnp.get(animateMountCN, styles.AnimateMount),
    animateUnmount: cnp.get(animateUnmountCN, styles.AnimateUnmount)
  }),
  slotImage: (className) => cnp.default(styles.SlotImage, className),
  slotIcon: (className) => cnp.default(styles.SlotIcon, className)
}

export const defaultProps = { classNames: {} }

export const propTypes = {
  slotsArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired)
    .isRequired,
  onSlotClick: PropTypes.func,
  areSlotsActive: PropTypes.bool.isRequired,
  classNames: PropTypes.exact({
    slotCarousel: PropTypes.exact({
      container: PropTypes.string,
      screen: PropTypes.string,
      slidesContainer: PropTypes.string,
      arrowComponent: PropTypes.string,
      indicatorsComponent: PropTypes.string
    }),
    slotSlide: PropTypes.exact({
      container: PropTypes.string,
      animateMount: PropTypes.string,
      animateUnmount: PropTypes.string
    }),
    slotImage: PropTypes.string,
    slotIcon: PropTypes.string
  })
}
