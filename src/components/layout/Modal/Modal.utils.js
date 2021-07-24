import PropTypes from "prop-types"
import styles from "./Modal.module.css"
import cross from "./cross.svg"
import cnp from "styles/classNameProcessor"

export const classes = {
  backdrop: (className) => cnp.default(styles.Backdrop, className),
  container: (isClosing, type, size, scrollable, className) =>
    cnp.default(styles.Container, className) +
    cnp.or(isClosing, styles.AnimateClose, styles.AnimateOpen) +
    cnp.if(type, styles[type?.toLowerCase()]) +
    cnp.if(size, styles[size?.toLowerCase()]) +
    cnp.if(!scrollable, styles.NotScrollable),
  iconContainer: (className) => cnp.default(styles.IconContainer, className),
  closeIcon: (className) => cnp.default(styles.CloseIcon, className)
}

export const defaultProps = { scrollable: true, classNames: {} }

export const propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1"
  ]),
  size: PropTypes.string,
  scrollable: PropTypes.bool,
  closeIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onCloseIconClick: PropTypes.func,
  classNames: PropTypes.exact({
    backdrop: PropTypes.string,
    container: PropTypes.string,
    iconContainer: PropTypes.string,
    closeIcon: PropTypes.string
  })
}

/**
 * Default timeouts.
 */
export const timeouts = {
  closeAnimation: 200
}

/**
 * Default value for `closeIcon`. It is a path to "X" svg img.
 */
export const closeIconSVG = cross
