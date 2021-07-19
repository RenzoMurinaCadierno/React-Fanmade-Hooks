import PropTypes from "prop-types"
// import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  aura: (classNames) => classNames,
  icon: (className) => className ?? "",
  iconExpandable: (classNames) => classNames
}

export const defaultProps = {
  classNames: {},
  auraProps: {}
}

export const propTypes = {
  isExpandable: PropTypes.bool,
  classNames: PropTypes.exact({
    aura: PropTypes.exact({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    icon: PropTypes.string,
    iconExpandable: PropTypes.exact({
      container: PropTypes.string,
      icon: PropTypes.string,
      content: PropTypes.string,
      barrier: PropTypes.string
    })
  }),
  auraProps: PropTypes.object
}
