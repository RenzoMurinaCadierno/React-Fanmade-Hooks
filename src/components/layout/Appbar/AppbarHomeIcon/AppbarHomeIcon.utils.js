import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import defaultHomeIconSVG from "assets/icons/home.svg"
import styles from "./AppbarHomeIcon.module.css"

export const classes = {
  iconExpandable: (classNames = {}) => ({
    ...classNames,
    container: styles.Container + cn.get(classNames?.container)
  }),
  img: (className) => className
}

export const defaultProps = {
  homeIconSVG: defaultHomeIconSVG,
  expandDirection: "right",
  content: "Go home",
  classNames: {}
}

export const propTypes = {
  homeIconSVG: PropTypes.string,
  content: PropTypes.string,
  expandDirection: PropTypes.oneOf(["left", "right"]),
  onContentClick: PropTypes.func,
  classNames: PropTypes.exact({
    iconExpandable: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    }),
    img: PropTypes.string
  })
}
