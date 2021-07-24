import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./Switch.module.css"

export const classes = {
  container: (isOn, isFrozen, className) =>
    cnp.default(styles.Container, className) +
    cnp.if(isOn, styles.ContainerActive) +
    cnp.if(isFrozen, styles.Frozen),
  slider: (isOn, className) =>
    cnp.default(styles.Slider, className) + cnp.if(isOn, styles.SliderActive),
  button: (isOn, className) =>
    cnp.default(styles.Button, className) + cnp.if(isOn, styles.ButtonActive)
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
