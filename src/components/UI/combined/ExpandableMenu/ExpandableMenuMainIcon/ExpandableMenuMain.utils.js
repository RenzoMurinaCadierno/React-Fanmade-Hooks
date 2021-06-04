import PropTypes from "prop-types"
import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  icon: (open, classNames = {}) => ({
    aura: classNames?.aura ?? {},
    expandableIcon: {
      ...classNames?.expandableIcon,
      container:
        (classNames.expandableIcon?.container ?? "") +
        " " +
        (open ? styles.Open : "") +
        " " +
        styles.Icon
    }
  })
}

export const expandableMenuMainIconPropTypes = {
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
  classNames: PropTypes.exact({
    aura: PropTypes.exact({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    expandableIcon: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    })
  }),
  auraProps: PropTypes.object,
  expandableIconProps: PropTypes.object
}