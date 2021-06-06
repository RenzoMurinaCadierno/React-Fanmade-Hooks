import PropTypes from "prop-types"
// import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  aura: (classNames) => classNames,
  expandableIcon: (classNames) => classNames
}

export const defaultProps = {
  classNames: {},
  auraProps: {},
  expandableIconProps: {}
}

export const propTypes = {
  classNames: PropTypes.exact({
    aura: PropTypes.exact({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    expandableIcon: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    })
  }),
  auraProps: PropTypes.object,
  expandableIconProps: PropTypes.object
}
