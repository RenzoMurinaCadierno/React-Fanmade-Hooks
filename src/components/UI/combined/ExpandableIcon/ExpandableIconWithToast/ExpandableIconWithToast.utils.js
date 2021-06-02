import PropTypes from "prop-types"

export const classes = {
  expandableIcon: (classNames) => classNames,
  toast: (classNames) => classNames
}

export const expandableIconWithToastPropTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.exact({
    expandableIcon: PropTypes.object,
    toast: PropTypes.object
  }),
  expandableIconProps: PropTypes.object,
  toastProps: PropTypes.object
}
