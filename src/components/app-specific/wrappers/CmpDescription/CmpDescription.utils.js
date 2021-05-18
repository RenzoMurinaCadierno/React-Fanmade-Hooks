import PropTypes from "prop-types"
import styles from "./CmpDescription.module.css"

export const classes = {
  expIcon: (classNames) => ({
    container: (classNames?.container ?? "") + " " + styles.ExpIconContainer,
    icon: classNames?.icon ?? "",
    content: classNames?.content ?? ""
  }),
  container: (className) => className ?? "",
  title: (className) => className ?? "",
  description: (className) => className ?? ""
}

export const cmpDescriptionPropTypes = {
  descItems: PropTypes.arrayOf(PropTypes.string),
  iconExpandDirection: PropTypes.oneOf(["left", "right"]),
  iconUrl: PropTypes.string,
  classNames: PropTypes.shape({
    expIcon: PropTypes.shape({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string
    }),
    container: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    barrier: PropTypes.string
  })
}
