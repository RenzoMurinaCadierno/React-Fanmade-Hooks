import PropTypes from "prop-types"
import styles from "./CmpDescription.module.css"

export const classes = {
  expIcon: (classNames = {}) => ({
    expandableIcon: {
      ...classNames?.expandableIcon,
      container:
        (classNames?.expandableIcon?.container ?? "") +
        " " +
        styles.ExpIconContainer
    },
    toast: classNames?.toast
  }),
  container: (className) => className ?? "",
  title: (className) => className ?? "",
  description: (className) => className ?? ""
}
test classnames Headers, then proptypes exact on classnames, then todo.js
export const cmpDescriptionPropTypes = {
  descItems: PropTypes.arrayOf(PropTypes.string),
  iconExpandDirection: PropTypes.oneOf(["left", "right"]),
  iconUrl: PropTypes.string,
  classNames: PropTypes.shape({
    expandableIcon: PropTypes.shape({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string
    }),
    toast: PropTypes.shape({
      container: PropTypes.string,
      content: PropTypes.string,
      toggler: PropTypes.string
    }),
    container: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    barrier: PropTypes.string
  })
}
