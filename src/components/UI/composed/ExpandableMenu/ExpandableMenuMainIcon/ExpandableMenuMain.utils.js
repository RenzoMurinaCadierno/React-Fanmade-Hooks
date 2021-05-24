import PropTypes from "prop-types"
import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  aura: (classNames) => classNames,
  icon: (classNames = {}, open) => ({
    ...classNames,
    container:
      (classNames.container ?? "") +
      " " +
      (open ? styles.Open : "") +
      " " +
      styles.Icon
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
  classNames: PropTypes.shape({
    aura: PropTypes.shape({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    icon: PropTypes.shape({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    })
  }),
  auraProps: PropTypes.object,
  expandableIconProps: PropTypes.object
}
