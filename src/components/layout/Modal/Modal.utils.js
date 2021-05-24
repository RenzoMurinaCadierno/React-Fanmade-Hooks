import PropTypes from "prop-types"
import styles from "./Modal.module.css"
import cross from "./cross.svg"

export const classes = {
  backdrop: (className) => (className ?? "") + " " + styles.Backdrop,
  container: (isClosing, type, size, scrollable, className) =>
    (className ?? "") +
    (isClosing ? styles.AnimateClose : styles.AnimateOpen) +
    " " +
    (type ? styles[type.toLowerCase()] : "") +
    " " +
    (size ? styles[size.toLowerCase()] : "") +
    " " +
    (scrollable ? "" : styles.NotScrollable) +
    " " +
    styles.Container,
  iconContainer: (className) => (className ?? "") + " " + styles.IconContainer,
  closeIcon: (className) => (className ?? "") + " " + styles.CloseIcon
}

export const modalPropTypes = {
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
  classNames: PropTypes.shape({
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
