import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./SlotsSpinningSlot.module.css"

export const classes = {
  slotCarousel: (classNames = {}) => ({
    ...classNames,
    container: styles.SlotCarouselContainer + cn.get(classNames?.container)
  }),
  slotSlide: (containerCN, animateMountCN, animateUnmountCN) => ({
    container: cn.get(containerCN),
    animateMount: animateMountCN ?? styles.AnimateMount,
    animateUnmount: animateUnmountCN ?? styles.AnimateUnmount
  }),
  slotImage: (className) => styles.SlotImage + cn.get(className),
  slotIcon: (className) => styles.SlotIcon + cn.get(className)
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
