import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./ExpandableMenuMainIcon.module.css"

export const classes = {
  icon: (open, rotateOnOpen, classNames = {}) => ({
    aura: cn.get(classNames?.aura, {}),
    icon:
      styles.Icon +
      cn.get(classNames?.icon) +
      cn.if(open, cn.or(rotateOnOpen, styles.RotateOpen, styles.Open))
  })
}

export const defaultProps = { type: "primary", open: false, classNames: {} }

export const propTypes = {
  type: PropTypes.oneOf([
    "primary",
    "primary-0",
    "primary-1",
    "secondary",
    "secondary-0",
    "secondary-1",
    "danger",
    "danger-0",
    "danger-1"
  ]),
  open: PropTypes.bool.isRequired,
  rotateOnOpen: PropTypes.bool,
  classNames: PropTypes.exact({
    aura: PropTypes.exact({
      container: PropTypes.string,
      aura: PropTypes.string
    }),
    icon: PropTypes.string
  }),
  auraProps: PropTypes.object,
  iconProps: PropTypes.object
}
