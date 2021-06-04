import PropTypes from "prop-types"
import styles from "./AppbarHomeIcon.module.css"

export const classes = {
  expandableIcon: (classNames = {}) => ({
    ...classNames,
    container: (classNames?.container ?? "") + " " + styles.Container
  }),
  img: (className) => className
}

export const appbarHomeIconPropTypes = {
  homeIconSVG: PropTypes.string,
  content: PropTypes.string,
  expandDirection: PropTypes.oneOf(["left", "right"]),
  onContentClick: PropTypes.func,
  classNames: PropTypes.exact({
    expandableIcon: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    }),
    img: PropTypes.string
  })
}
