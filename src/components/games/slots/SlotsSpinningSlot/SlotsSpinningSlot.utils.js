import PropTypes from "prop-types"
import styles from "./SlotsSpinningSlot.module.css"

export const classes = {
  slotCarousel: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.SlotCarouselContainer
  }),
  slotSlide: (containerCN, animateMountCN, animateUnmountCN) => ({
    container: containerCN ?? "",
    animateMount: animateMountCN ?? styles.AnimateMount,
    animateUnmount: animateUnmountCN ?? styles.AnimateUnmount
  }),
  slotImage: (className) =>
    (className ? className + " " : "") + styles.SlotImage,
  slotIcon: (className) => (className ? className + " " : "") + styles.SlotIcon
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
