import PropTypes from "prop-types"
// import styles from './IconWithToast.module.css'

export const classes = {
  icon: (className) => className,
  iconExpandable: (classNames) => classNames,
  toast: (classNames) => classNames
}

export const defaultProps = { toastProps: {}, classNames: {} }

export const propTypes = {
  isExpandable: PropTypes.bool,
  classNames: PropTypes.exact({
    icon: PropTypes.string,
    iconExpandable: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    }),
    toast: PropTypes.exact({
      container: PropTypes.string,
      content: PropTypes.string,
      toggler: PropTypes.string
    })
  }),
  toastProps: PropTypes.object
}
