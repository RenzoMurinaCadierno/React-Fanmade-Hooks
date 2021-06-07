import { useCallback, useState, useEffect, useContext } from "react"
import {
  Text,
  Input,
  Button,
  useMountFlag,
  Carousel,
  LocalStorageCRUD
} from "hub"
import {
  classes,
  propTypes,
  intl,
  inputConfigs,
  inputProps,
  inputNamesAndValAnchor
} from "./LocalStorageCRUDAuth.utils"

export default function LocalStorageCRUDAuth({
  isSignIn,
  userSt: { isAuth, configs = {} },
  onAuth
}) {
  const { jumpToSlide } = useContext(Carousel.context)

  // typing changes the respective input's "value", and submitting/blurring
  // from them triggers validation process to modify "isValid" state
  const [inputsSt, setInputsSt] = useState({
    user: { isValid: false, value: "" },
    pass: { isValid: false, value: "" }
  })
  // flag mount phase for useEffect below
  const isMounted = useMountFlag()
  // only when both inputs are valid we enable submit '*Button*'
  const inputsAreValid = inputsSt.user.isValid && inputsSt.pass.isValid

  function onAuthButtonClick() {
    onAuth({ user: inputsSt.user.value, pass: inputsSt.pass.value })
  }

  // when parent's "isAuth" state changes (user logged in or signed up), jump
  // to '*CarouselExampleSettings*'. "isMounted" will be true on the next
  // render after mount phase. We need it otherwise "jumpToSlide" would
  // trigger instantly
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(
    () =>
      isAuth && isMounted && jumpToSlide(LocalStorageCRUD.slideNames.SETTINGS),
    [isAuth]
  )

  return (
    <>
      {/* upper-left title */}
      <Text
        htmlElem="h4"
        type={configs.color === "primary" ? "secondary-1" : "primary-1"}
        disabled={isAuth}
        bold
        italic
        className={classes.title}
      >
        {intl[configs.lang ?? "en"].title[isSignIn ? "login" : "register"]}
      </Text>
      {
        // oblique '*div*' telling that user already signed up
        isAuth ? (
          <div className={classes.authBanner(configs.color ?? "primary")}>
            {intl[configs.lang ?? "en"].banner}
          </div>
        ) : (
          <>
            {/* "user" and "pass" inputs */}
            <div className={classes.inputsContainer}>
              {inputNamesAndValAnchor.map(([inputName, anchor]) => (
                <Input.Styled.WithValidation
                  key={inputName}
                  useInputHandlersProps={inputProps[inputName]}
                  useInputHandlersConfigs={inputConfigs[inputName](setInputsSt)}
                  validationContainerAnchor={anchor}
                  classNames={classes.inputComponent}
                />
              ))}
            </div>
            {/* "signup/signin" button */}
            <Button
              type={configs.color}
              disabled={!inputsAreValid}
              onClick={inputsAreValid ? onAuthButtonClick : null}
              className={classes.button}
            >
              {isSignIn ? "Sign in" : "Sign up"}
            </Button>
          </>
        )
      }
    </>
  )
}

LocalStorageCRUDAuth.propTypes = propTypes
