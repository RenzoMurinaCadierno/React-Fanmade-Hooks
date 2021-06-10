import PropTypes from "prop-types"
import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  icon: (open, rotateOnOpen, classNames = {}) => ({
    aura: classNames?.aura ?? {},
    icon:
      (classNames?.icon ?? "") +
      " " +
      (open ? (rotateOnOpen ? styles.RotateOpen : styles.Open) : "") +
      " " +
      styles.Icon
  })
}

export const defaultProps = { type: "primary", open: false, classNames: {} }

export const propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  open: PropTypes.bool.isRequired,
  rotateOnOpen: PropTypes.bool,
  classNames: PropTypes.exact({
    aura: PropTypes.exact({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    icon: PropTypes.string
  }),
  auraProps: PropTypes.object,
  iconProps: PropTypes.object
}
