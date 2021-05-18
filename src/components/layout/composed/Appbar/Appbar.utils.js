import PropTypes from "prop-types"
import styles from "./Appbar.module.css"

export const classes = {
  container: (isOpen, className) =>
    (className ?? "") +
    " " +
    (isOpen ? styles.ContainerOpen : "") +
    " " +
    styles.Container,
  backdrop: (isOpen, className) =>
    (className ?? "") +
    " " +
    (isOpen ? styles.BackdropOpen : "") +
    " " +
    styles.Backdrop,
  togglerWrapper: styles.TogglerWrapper,
  toggler: (isOpen, className) =>
    (className ?? "") +
    " " +
    (isOpen ? styles.TogglerOpen : "") +
    " " +
    styles.Toggler,
  navModal: (classNames) => classNames ?? {},
  modalContent: (className) => (className ?? "") + " " + styles.ModalContent,
  homeIcon: (classNames = {}) => ({
    ...classNames,
    container: styles.HomeIconContainer
  }),
  searchContainer: (className) =>
    (className ?? "") + " " + styles.SearchContainer,
  inputField: (classNames = {}) => ({
    ...classNames,
    container: (classNames.container ?? "") + " " + styles.InputField
  }),
  searchIcon: (className) => (className ?? "") + " " + styles.SearchIcon
}

export const appbarPropTypes = {
  children: PropTypes.node.isRequired,
  manualToggle: PropTypes.bool,
  onTogglerClick: PropTypes.func,
  onBackdropClick: PropTypes.func,
  onSearchChange: PropTypes.func,
  onHomeIconClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    backdrop: PropTypes.string,
    togglerWrapper: PropTypes.string,
    toggler: PropTypes.string,
    navModal: PropTypes.string,
    modalContent: PropTypes.string,
    homeIcon: PropTypes.object,
    searchContainer: PropTypes.string,
    inputField: PropTypes.object,
    searchIcon: PropTypes.arrayOf(PropTypes.string)
  })
}
