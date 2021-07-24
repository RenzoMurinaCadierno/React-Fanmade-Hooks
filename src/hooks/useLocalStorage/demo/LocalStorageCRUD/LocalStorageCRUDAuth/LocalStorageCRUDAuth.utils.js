import PropTypes from "prop-types"
import cnp from "styles/classNameProcessor"
import styles from "./LocalStorageCRUDAuth.module.css"

export const classes = {
  title: styles.Title,
  inputsContainer: styles.InputsContainer,
  inputComponent: {
    container: styles.InputContainer,
    inputStyled: { label: styles.InputLabel }
  },
  button: styles.Button,
  authBanner: (type) => styles.AuthBanner + cnp.if(type, styles[type])
}

export const propTypes = {
  isSignIn: PropTypes.bool,
  userSt: PropTypes.shape({
    isAuth: PropTypes.bool,
    configs: PropTypes.shape({
      lang: PropTypes.oneOf(["en", "es"]),
      color: PropTypes.oneOf(["primary", "secondary"])
    })
  }),
  onAuth: PropTypes.func
}

/**
 * Language strings to display depending on currently loaded
 * "userSt.configs.lang"
 */
export const intl = {
  en: {
    title: {
      login: "Login",
      register: "Create user"
    },
    banner: "Already logged in"
  },
  es: {
    title: {
      login: "Ingresar",
      register: "Crear usuario"
    },
    banner: "Usuario actualmente registrado"
  }
}

const genericInputConfigs = (setIsValid) => ({
  // stop updating input if more than 8 chars are typed
  preventChange: (e) => e.target.value.length > 8,
  // blurring triggers validation process (validation bubble)
  validateOnBlur: true,
  // submitting striggers validation process (like blurring)
  validateOnSubmit: true,
  // defined just to enable validation on "useInputHandlers" hook
  onSubmit: () => {},
  // when validating, change the respective input's state
  onValidation: (newValObj, e) => {
    setIsValid((prevSt) => ({
      ...prevSt,
      [e.target.name]: { isValid: newValObj.isValid, value: e.target.value }
    }))
  }
})

export const inputConfigs = {
  user: (setIsValid) => ({
    ...genericInputConfigs(setIsValid),
    validators: {
      // cannot be empty (null uses default validation msg)
      required: null,
      // must be letters and numbers only (null does same as above)
      alphanumeric: null,
      // and length must be between 2 and 8 chars
      length: (val) => [
        val.length > 1 && val.length < 9,
        "Must be 2 to 8 characters long"
      ]
    }
  }),
  pass: (setIsValid) => ({
    ...genericInputConfigs(setIsValid),
    validators: {
      // cannot be empty (null uses default validation msg)
      required: null,
      // and length must be between 5 and 8 chars
      length: (val) => [
        val.length > 4 && val.length < 9,
        "Must be 5 to 8 characters long"
      ],
      hasBothLettersAndNumbers: (val) => [
        /[a-z]+/i.test(val) && /[0-9]+/i.test(val),
        "Must have letters and numbers"
      ]
    }
  })
}

export const inputProps = {
  user: { name: "user", label: "username", autoComplete: "off" },
  pass: { name: "pass", label: "password", type: "password" }
}

// anchor validation bubble on top from user input, and on bottom
// for password input
export const inputNamesAndValAnchor = [
  [inputProps.user.name, "top"],
  [inputProps.pass.name, "bottom"]
]
