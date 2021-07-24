import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Toast.module.css"

export const classes = {
  container: (animation, position, className) =>
    cnp.default(styles.Container, className) +
    cnp.switch(
      [
        animation === "open",
        styles[(position?.toLowerCase() || "bottom") + "-open"]
      ],
      [
        animation === "close",
        styles[(position?.toLowerCase() || "bottom") + "-close"]
      ]
    ) +
    cnp.or(position, styles[position?.toLowerCase()], styles.bottom),
  content: (className) => cnp.default(styles.Content, className),
  toggler: (className) => cnp.default(styles.Toggler, className)
}

export const defaultProps = {
  show: false,
  position: "bottom",
  timeout: 2000,
  classNames: {},
  contentProps: {},
  togglerProps: {}
}

export const propTypes = {
  show: PropTypes.bool.isRequired,
  position: PropTypes.oneOf(["center", "bottom", "left", "top", "right"]),
  timeout: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.node,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    content: PropTypes.string,
    toggler: PropTypes.string
  })
}
