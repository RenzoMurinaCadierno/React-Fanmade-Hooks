import PropTypes from "prop-types"
import styles from "./Modal.module.css"
import cross from "./cross.svg"
import { cn } from "utils/utilityFunctions"

export const classes = {
  backdrop: (className) => styles.Backdrop + cn.get(className),
  container: (isClosing, type, size, scrollable, className) =>
    styles.Container +
    cn.get(className) +
    cn.or(isClosing, styles.AnimateClose, styles.AnimateOpen) +
    cn.if(type, styles[type?.toLowerCase()]) +
    cn.if(size, styles[size?.toLowerCase()]) +
    cn.if(!scrollable, styles.NotScrollable),
  iconContainer: (className) => styles.IconContainer + cn.get(className),
  closeIcon: (className) => styles.CloseIcon + cn.get(className)
}

export const defaultProps = {
  scrollable: true,
  classNames: {}
}

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
