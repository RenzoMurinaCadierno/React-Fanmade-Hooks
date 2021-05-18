import PropTypes from "prop-types"
import styles from "./LocalStorageCRUDRoot.module.css"

export const classes = {
  carousel: { container: styles.Carousel }
}

export const localStorageCRUDRootPropTypes = {
  userSt: PropTypes.exact({
    id: PropTypes.string,
    user: PropTypes.string,
    configs: PropTypes.shape({
      color: PropTypes.oneOf(["primary", "secondary"]),
      lang: PropTypes.oneOf(["en", "es"])
    }),
    isAuth: PropTypes.bool
  }).isRequired,
  setUserSt: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired
}
