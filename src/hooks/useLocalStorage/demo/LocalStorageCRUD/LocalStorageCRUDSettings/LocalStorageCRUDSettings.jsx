import { useContext } from "react"
import {
  Button,
  Switch,
  Text,
  useLocalStorage,
  Carousel,
  LocalStorageCRUD
} from "hub"
import {
  classes,
  propTypes,
  intl,
  getOppositeConfigState
} from "./LocalStorageCRUDSettings.utils"

export default function LocalStorageCRUDSettings({
  userSt: { id, isAuth, configs },
  setUserSt,
  onDeleteUser,
  onSignout
}) {
  const { jumpToSlide } = useContext(Carousel.Context)

  /*****************************************************************************
   *     USAGE EXAMPLE (part 2) - Open local storage tab to track changes!
   * ***************************************************************************
   * This is an example of the reactive functionality of "useLocalStorage" hook.
   *
   * One hook here listens to changes on "configs.lang", and the other on
   * "configs.color". When those mutate, so will "configs" key in the currently
   * loaded user object in local storage.
   *
   * In other words, local storage nested user object in key "db[id]" is synced
   * to the current values of user state ("configs" and "lang").
   */
  useLocalStorage({
    key: "rfh:users-db",
    value: configs.lang,
    updateOnValueChange: [`db.${id}.configs.lang`],
    // on logout, `id` will be an empty string, thus triggering a console error
    // on dot notation path string defined above. "noConsole: true" ignores it
    noConsole: true
  })

  useLocalStorage({
    key: "rfh:users-db",
    value: configs.color,
    updateOnValueChange: [`db.${id}.configs.color`],
    noConsole: true
  })

  // current language's strings depending on `configs.lang`
  const currentLang = intl[configs.lang ?? "en"]

  const onAuthClick = (authHandler) => {
    // authHandler = `onDeleteUser` || `onSignout`
    authHandler()
    // move to Signin screen once logged out
    jumpToSlide(LocalStorageCRUD.slideNames.SIGN_IN)
  }

  // switch between language and color states in parent's state
  const toggleConfigState = (e) => {
    const configName = e.target.dataset.configname
    setUserSt((prevSt) => ({
      ...prevSt,
      configs: {
        ...prevSt.configs,
        [configName]: getOppositeConfigState(configName, prevSt.configs)
      }
    }))
  }

  return (
    <div className={classes.container}>
      {/* upper-left title */}
      <Text
        htmlElem="h4"
        type={configs.color === "primary" ? "secondary-1" : "primary-1"}
        disabled={!isAuth}
        bold
        italic
        className={classes.title}
      >
        {currentLang.title}
      </Text>
      {
        // oblique '*div*' telling that user is not signed up
        !isAuth ? (
          <div className={classes.authBanner(configs.color ?? "primary")}>
            {currentLang.banner}
          </div>
        ) : (
          <div className={classes.configs}>
            {/* language configs text and switch */}
            <ConfigOption
              configs={configs}
              name="lang"
              primaryOpt="en"
              secondaryOpt="es"
              onSwitch={toggleConfigState}
            />
            {/* color configs text and switch */}
            <ConfigOption
              configs={configs}
              name="color"
              primaryOpt="primary"
              secondaryOpt="secondary"
              onSwitch={toggleConfigState}
            />
            {/* "delete user" button */}
            <Button
              type="danger"
              coloredBg
              onClick={() => onAuthClick(onDeleteUser)}
            >
              {currentLang.deleteBtn}
            </Button>
            {/* "logout" button */}
            <Button
              type={configs.color}
              coloredBg
              onClick={() => onAuthClick(onSignout)}
            >
              {currentLang.logoutBtn}
            </Button>
          </div>
        )
      }
    </div>
  )
}

LocalStorageCRUDSettings.propTypes = propTypes

function ConfigOption({ configs, name, primaryOpt, secondaryOpt, onSwitch }) {
  return (
    <>
      <Text
        type={configs.color + "-1"}
        bold
        italic
        disabled={configs[name] === primaryOpt}
      >
        {intl[configs.lang ?? "en"][name]}
      </Text>
      <Switch
        data-configname={name}
        initialState={configs[name] === secondaryOpt}
        onSwitch={onSwitch}
      />
    </>
  )
}
