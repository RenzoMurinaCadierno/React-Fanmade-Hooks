import PropTypes from "prop-types"
import styles from "./Backdrop.module.css"

export const classes = {
  container: (className) => (className ?? "") + " " + styles.Container
}

export const defaultProps = { htmlElem: "div" }

export const propTypes = {
  show: PropTypes.bool.isRequired,
  htmlElem: PropTypes.string,
  portalNode: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.instanceOf(Element)
  ]),
  children: PropTypes.node,
  className: PropTypes.string,
  otherProps: PropTypes.object
}
