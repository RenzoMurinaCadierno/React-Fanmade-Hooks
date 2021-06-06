import PropTypes from "prop-types"
import styles from "./Switch.module.css"

export const classes = {
  container: (isOn, isFrozen, className) =>
    (className ?? "") +
    " " +
    (isOn ? styles.ContainerActive : "") +
    " " +
    (isFrozen ? styles.Frozen : "") +
    " " +
    styles.Container,
  slider: (isOn, className) =>
    (className ?? "") +
    " " +
    (isOn ? styles.SliderActive : "") +
    " " +
    styles.Slider,
  button: (isOn, className) =>
    (className ?? "") +
    " " +
    (isOn ? styles.ButtonActive : "") +
    " " +
    styles.Button
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
