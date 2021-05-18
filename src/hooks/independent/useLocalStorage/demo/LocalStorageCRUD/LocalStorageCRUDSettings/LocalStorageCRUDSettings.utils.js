import PropTypes from "prop-types"
import styles from "./LocalStorageCRUDSettings.module.css"

export const classes = {
  container: styles.Container,
  title: styles.Title,
  inputsContainer: styles.InputsContainer,
  configs: styles.ConfigsGrid,
  button: styles.Button,
  authBanner: (type) =>
    (type ? styles[type.toLowerCase()] : "") + " " + styles.AuthBanner
}

export const localStorageCRUDSettingsPropTypes = {
  userSt: PropTypes.shape({
    id: PropTypes.string,
    isAuth: PropTypes.bool,
    configs: PropTypes.shape({
      lang: PropTypes.oneOf(["en", "es"]),
      color: PropTypes.oneOf(["primary", "secondary"])
    })
  }),
  setUserSt: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onSignout: PropTypes.func
}

/**
 * Language strings to display depending on currently loaded
 * "userSt.configs.lang"
 */
export const intl = {
  en: {
    title: "Settings",
    lang: "Spanish lang.",
    color: "Invert colors",
    deleteBtn: "Delete user",
    logoutBtn: "Logout",
    banner: "Not logged in"
  },
  es: {
    title: "Ajustes",
    lang: "Idioma Español",
    color: "Invertir color",
    deleteBtn: "Borrar user",
    logoutBtn: "Salir",
    banner: "Usuario no registrado"
  }
}

/**
 * Given previous "userSt.configs" and `configName` as its key, it returns
 * the opposite value for the current "userSt.configs[`configName`]".
 *
 * E.g.: if `configName` === 'lang' and `prevConfigsInState` === 'en', it
 *   returns 'es'.
 *
 * E.g.: if `configName` === 'color' and `prevConfigsInState` === 'secondary',
 *   it returns 'primary'.
 *
 * @param {string} configName "lang" or "color"
 * @param {object} prevConfigsInState Parent's previous "userSt.configs" state
 *
 * @returns {string} Opposite of current `prevConfigsInState`[`configName`]
 */
export function getOppositeConfigState(configName, prevConfigsInState) {
  switch (configName) {
    case "lang":
      return prevConfigsInState[configName] === "en" ? "es" : "en"
    case "color":
      return prevConfigsInState[configName] === "primary"
        ? "secondary"
        : "primary"
    default:
      throw new Error(
        '<CarouselExampleSettings> "getOppositeConfigState" unhandled case.'
      )
  }
}
