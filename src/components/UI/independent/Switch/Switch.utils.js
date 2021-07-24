import PropTypes from "prop-types"
import { cn } from "utils/utilityFunctions"
import styles from "./Switch.module.css"

export const classes = {
  container: (isOn, isFrozen, className) =>
    styles.Container +
    cn.get(className) +
    cn.if(isOn, styles.ContainerActive) +
    cn.if(isFrozen, styles.Frozen),
  slider: (isOn, className) =>
    styles.Slider + cn.get(className) + cn.if(isOn, styles.SliderActive),
  button: (isOn, className) =>
    styles.Button + cn.get(className) + cn.if(isOn, styles.ButtonActive)
}

export const defaultProps = { initialState: false, classNames: {} }

export const propTypes = {
  initialState: PropTypes.bool,
  isFrozen: PropTypes.bool,
  onSwitch: PropTypes.func,
  onSwitchOn: PropTypes.func,
  onSwitchOff: PropTypes.func,
  classNames: PropTypes.exact({
    container: PropTypes.string,
    slider: PropTypes.string,
    button: PropTypes.string
  })
}
