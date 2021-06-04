import PropTypes from "prop-types"
import styles from "./CmpDescription.module.css"

export const classes = {
  codeIcon: (classNames = {}) => ({
    expandableIcon: {
      ...classNames?.expandableIcon,
      container:
        (classNames?.expandableIcon?.container ?? "") +
        " " +
        styles.CodeIconContainer
    },
    toast: classNames?.toast
  }),
  container: (className) => className ?? "",
  title: (className) => className ?? "",
  description: (className) => className ?? ""
}

const codeIconPropTypes = PropTypes.exact({
  expandableIcon: PropTypes.exact({
    container: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.string
  }),
  toast: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    toggler: PropTypes.string
  })
})

export const cmpDescriptionPropTypes = {
  descItems: PropTypes.exact({
    title: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }),
  iconExpandDirection: PropTypes.oneOf(["left", "right"]),
  iconUrl: PropTypes.string,
  classNames: PropTypes.exact({
    codeIcon: codeIconPropTypes,
    container: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    barrier: PropTypes.string
  })
}
