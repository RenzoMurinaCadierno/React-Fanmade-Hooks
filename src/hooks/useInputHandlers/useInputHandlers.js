import { useState, useCallback, useEffect, useRef } from "react"

/**
 * Recieves an input reference alongside its props and an optional configuration
 * object, and takes control of that input.
 *
 * It returns its value and setValue functions, as well as React and DOM
 * handlers, validation on its value and "form submission"-like functionality.
 *
 * @param {React.ElementRef} ref A ref to the target input to control.
 *
 * @param {object} props Plain object with props you would normally pass to the
 *   input.
 *
 * Keep in mind that `onChange` handler will recieve the event object as normal,
 *   plus the validation object used in this hook.
 *
 * @param {object} configs Optional configuration object containing:
 *
 * `preventChange?` (boolean | function): if either the boolean or the
 *   function's return value is true, input will not change.
 *
 * `validators?` (object): an object whose keys are the validation rules, and
 *   values being functions that must return an array shape:
 *
 *   > [ statementThatEvalsToBool, failedValidationMessageString ]
 *
 *   Check "_defaultValidators" in this hook's file for further instructions.
 *
 * `onSetValue?` (function): callback for setValue. We add it here since if we
 *   spread it on "props", then an invalid property will be assigned to
 *   '*input*'.
 *
 * `onSubmit?` (function): callback invoked upon pressing any keys with codes in
 *   `configs.submitKeyCodes`. It will be triggered either if:
 * * `configs.validators` is undefined (meaning we are not validating
 *     submissions),
 * * "st.valObj.messages.length" === 0 (meaning there are no validation errors),
 * * `configs.forceSubmit` is true (meaning validation errors are ignored).
 *
 * `onSubmitFail?` (function): alternate "onSubmit" callback invoked on a failed
 *   submission attempt (validation errors) and if `configs.forceSubmit` is
 *   false.
 *
 * `onValidation?` (function): callback invoked after each instance where
 *   input's value is tested versus `configs.validators` ("onChange",
 *   `onSetValue`, "onSubmit" and "onBlur").
 *
 * `validateOnChange?` (boolean): true will calculate the returning validation
 *   object on input change. False (default) will trigger recalculation on
 *   submit.
 *
 * `submitKeyCodes?` (Array): an array with keyCodes which will trigger
 *   "onSubmit". Defaults to [13], 13 being 'Enter'/'Return' key code.
 *
 * `reRenderOnSubmit?` (boolean): if no `validators` are assigned (no submit
 *   validation) and "onSubmit" callback is present in props, setting this
 *   config to true will re-render the component on submission. False (default)
 *   will call for "onSubmit" without re-rendering.
 *
 * `clearOnSubmit?` (boolean): true will clear input's value on submit.
 *   Defaults to false.
 *
 * `forceSubmit?` (boolean): input will not submit if any validation rule was
 *   not passed (default). Setting this value to true will force submission
 *   regardless validation state.
 *
 * @returns {object} An object consisting of:
 *
 * `props` (object): props that MUST be spreaded on '*input*'. They include all
 *   props passed when invoking the hook, plus "st.value" and "onChange"
 *   handler.
 *
 * `value` (string): '*input*' current value.
 *
 * `setValue` (function): "setValue" linked to '*input*' value ("setValue"
 *   being a modified version of regular state setter).
 *
 * `validation` (object): validation object with keys:
 * * "rules" (object): rule names strings as keys, with boolean values that
 *     indicate if the rule was passed.
 * * "messages" (Array): all failed rules' messages.
 * * "isValid" (boolean): true if all validation rules passed.
 *
 * `clear` (function): clears '*input*' value.
 *
 * `blur` (function): takes focus off the input.
 *
 * `focus` (function): set focus on the input.
 *
 * `disable` (function): sets "disable" HTML property to true.
 *
 * `enable` (function): sets "disable" HTML property to false.
 *
 * `toggleDisable` (function): toggles "disable" HTML property.
 *
 * `getProp` (function): given a prop name as arg of `getProp`, it returns a
 *   reference of the prop passed in "props" object that matches that name, or
 *   the matching DOM prop if it exists.
 *
 * `setDOMProp` (function): dangerously sets a property to the input element.
 *
 * `callDOMProp` (function): dangerously invokes a property in the input
 *   element.
 *
 * `reRender` (function): forces a component re-render.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useInputHandlers(ref, props = {}, configs = {}) {
  // save configs in a Ref. They should not change once instantiated
  const {
    validateOnChange,
    validateOnBlur,
    validators,
    submitKeyCodes = [13], // defaults to 'Enter'/'Return'
    reRenderOnSubmit,
    clearOnSubmit,
    forceSubmit,
    preventChange,
    onSetValue,
    onSubmit,
    onSubmitFail,
    onValidation
  } = configs
  // same for the calculated rule names and functions array
  const valRulesArr = useRef(_getValidationRulesArr(validators))

  const [st, setSt] = useState({
    value: "", // input's value
    valObj: { rules: {}, messages: [], isValid: true } // validation object
  })
  // we might force re-render on native DOM props React does not listen to,
  // so we use a basic boolean toggler for the job
  const [, ping] = useState(true)
  const reRender = useCallback(() => ping((st) => !st), [ping])

  const applyEffect = (propOrMethod, value, doReRender, ...args) => {
    let returnValue
    if (typeof propOrMethod === "function") {
      // on an input method, call it over target input passing args as params
      returnValue = propOrMethod.apply(ref.current, args)
    } else {
      // otherwise it is an input property. Set its value
      returnValue = ref.current[propOrMethod] = value
    }
    // if re-rendering was designated, queue a component re-render
    doReRender && reRender()
    // the return will be one of the function that called for applyEffect
    return returnValue
  }

  // reRender = true will re-render the component upon applyEffect's
  // resolution
  const blur = (reRender) => applyEffect(ref.current.blur, null, reRender)

  const focus = (reRender) => applyEffect(ref.current.focus, null, reRender)

  const disable = (reRender) => applyEffect("disabled", true, reRender)

  const enable = (reRender) => applyEffect("disabled", false, reRender)

  const toggleDisable = (reRender) =>
    applyEffect("disabled", !ref.current.disabled, reRender)

  // sets a DOM property on the input to the assigned value
  const setDOMProp = (propName, value, reRender) =>
    applyEffect(propName, value, reRender)

  // calls for an input's DOM function assigned as a property
  const callDOMProp = (propName, ...args) => {
    applyEffect(ref.current[propName], null, false, args)
  }

  // gets the assigned value to a property of the input. It is case-sensitive,
  // which also means it will fetch for React-ish props ("onClick",
  // "onChange") and DOM props ("disabled", "onkeypress", "onchange")
  const getProp = (propName, doReRender) => {
    const targetProp = Object.keys(props).find((prop) => prop === propName)
    doReRender && reRender()
    return props[targetProp] ?? ref.current[propName]
  }

  // input's assigned on value onchange controller
  const handleChange = (e) => {
    const newValObj = _getUpdatedValidationObj(
      validateOnChange,
      valRulesArr.current,
      e.target.value
    )
    // trigger "onValidation" if we are validating on change
    validateOnChange && onValidation?.(newValObj, e)
    // are we preventing change? If so, do nothing. Mind that we are passing
    // the new validation rules as second argument if `preventChange` is a
    // function. That's why we need to calculate them before preventing change
    if (
      typeof preventChange === "function"
        ? preventChange(e, newValObj)
        : preventChange
    ) {
      return
    }
    // set state with the new validation object and input's value
    _setStWithNewValueAndValidationObj(setSt, e.target.value, newValObj)
    // trigger "onChange" if assigned. Pass event and the new validation
    // object in case it's needed
    return props.onChange?.(e, newValObj)
  }

  // input's assigned on-manual-setValue controller
  const handleSetValue = (newValue) => {
    const newValObj = _getUpdatedValidationObj(
      validateOnChange,
      valRulesArr.current,
      newValue
    )
    onValidation?.(newValObj, newValue)
    // set state with the new validation object and new input's value
    _setStWithNewValueAndValidationObj(setSt, newValue, newValObj)
    // trigger "onSetValue" callback if assigned. Pass the new value and the
    // new validation object in case it's needed
    return onSetValue?.(newValue, newValObj)
  }

  const handleValidateOnBlur = (e) => {
    const newValObj = _getUpdatedValidationObj(
      validateOnBlur,
      valRulesArr.current,
      e.target.value
    )
    onValidation?.(newValObj, e)
    _setStWithNewValueAndValidationObj(setSt, e.target.value, newValObj)
  }

  const clear = () => setSt((prevSt) => ({ ...prevSt, value: "" }))

  // Console will warn us here of several dependencies we cannot add, as they
  // will re-construct this callback and thus re-triggering useEffect below
  // on each key press, thing we definitely do not want. So, disable warnings.
  /* eslint-disable react-hooks/exhaustive-deps*/
  const handleSubmitKeyPress = useCallback((e) => {
    // do something only if the pressed key's code matches one in
    // `configs.submitKeyCodes`
    if (submitKeyCodes.includes(e.keyCode)) {
      // if we are validating inputs, "valRulesArr.length" will have at least 1
      // entry
      if (valRulesArr.current.length) {
        // calculate the new validation object
        const newValObj = _getValidationObj(valRulesArr.current, e.target.value)
        // save the previous input value to pass to "onSubmit" callback, as if
        // we clear the input, then "e.target.value" will be empty
        const previousValue = e.target.value
        // update both validation object and input's value
        setSt((prevSt) => ({
          ...prevSt,
          valObj: newValObj,
          value: clearOnSubmit ? "" : prevSt.value
        }))
        onValidation?.(newValObj, e, ref.current, previousValue)
        // an empty `validation.messages` array means the input is valid,
        // trigger "onSubmit" callback. Also do it if we are forcing input
        // submission
        if (forceSubmit || !newValObj.messages.length) {
          onSubmit(e, newValObj, ref.current, previousValue)
        } else {
          // given the situation we are not forcing invalid submissions or
          // there are validation errors, invoke "onSubmitFail" callback
          onSubmitFail?.(e, newValObj, ref.current, previousValue)
        }
      } else {
        // `valRulesArr` is empty, which means we are not validating inputs.
        // Trigger "onSubmit", clear the input if assigned, and re-render if
        // stated. !"clearOnSubmit" is there because clearing will naturally
        // set state thus re-rendering the component
        onSubmit(e, ref.current)
        clearOnSubmit && setSt((prevSt) => ({ ...prevSt, value: "" }))
        reRenderOnSubmit && !clearOnSubmit && reRender()
      }
    }
  }, []) // never reconstruct this function. Will conflict with useEffect

  useEffect(() => {
    // point to reference here. "ref.current" itself is lost on cleanup
    // otherwise
    const inputRef = ref.current
    // only if the reference resolved and we are working with input
    // submission...
    const isSubmittable = !!(inputRef && onSubmit)
    // ...then assign event listeners
    if (isSubmittable) {
      inputRef.addEventListener("keydown", handleSubmitKeyPress)
      validateOnBlur && inputRef.addEventListener("blur", handleValidateOnBlur)
    }
    return () => {
      // at unmounting or reference change, unsuscribe events listeners
      if (isSubmittable) {
        inputRef.removeEventListener("keydown", handleSubmitKeyPress)
        validateOnBlur &&
          inputRef.removeEventListener("blur", handleValidateOnBlur)
      }
    }
  }, []) // only mount/unmount should trigger adding/removing event listeners

  return {
    value: st.value,
    // "setValue" will only modify input's value, not "validation" object
    setValue: handleSetValue,
    // "validation" object shape { rules: {}, messages: [], isValid: boolean }
    validation: st.valObj,
    clear,
    blur,
    focus,
    disable,
    enable,
    toggleDisable,
    getProp,
    setDOMProp,
    callDOMProp,
    reRender,
    // all input props. MUST be spreaded on target input!
    props: { ...props, value: st.value, onChange: handleChange }
  }
}

/******************************************************************************
 **********************  HELPER VARIABLES AND FUNCTIONS  **********************
 ******************************************************************************/

/**
 * Some default validators to use. Call for them using them as a key inside
 * "validation" in `configs` arg when declaring the hook.
 * * A falsy value keeps the default rule function and invalid message string.
 * > * E.g.: { validation: { required: null } }
 * * A string value overrides default invalid message, but keeps the rule fn.
 * > * E.g.: { validation: { mail: "Invalid format. Try something@gmail.com" } }
 * * A fn value must return an array with something that evaluates to true/false
 *   for validation, and the invalid message string. This fn will override the
 *   default.
 * > * E.g.: { validation: { numeric: (val) => [ "12".includes(val), "Must type 1, 2 or 12" ] } }
 */
const _defaultValidators = {
  required: (val, msg) => [
    val.trim().length > 0,
    _getMsg(msg, "Field cannot be empty")
  ],
  numeric: (val, msg) => [/^\d+$/g.test(val), _getMsg(msg, "Numbers only")],
  alphabetic: (val, msg) => [
    /^[a-z ]+$/gi.test(val),
    _getMsg(msg, "Aphabetic characters only")
  ],
  alphanumeric: (val, msg) => [
    /^[a-z0-9 ]+$/gi.test(val),
    _getMsg(msg, "Alpanumeric characters only")
  ],
  email: (val, msg) => [
    /^[\w.-]+@[a-z\d]+(\.[a-z\d]+)*\.([a-z]{1,3}){1,2}$/i.test(val),
    _getMsg(msg, "Use a valid email format, like may2020@gmail.com")
  ]
}

/**
 * Returns `msg` if it is string type. Otherwise, returns `defaultMsg`.
 * @param {string} msg
 * @param {string} defaultMsg
 */
function _getMsg(msg, defaultMsg) {
  return typeof msg === "string" ? msg : defaultMsg
}

/**
 * Converts `configs.validation` object into a ruleset array to be tested
 * versus input's value when specified.
 *
 * @param {object} customValidators `configs.validation` object. You can check
 * how to construct it in "_defaultValidators" const.
 *
 * @returns {Array} An array of sub-arrays, each sub-array shaped:
 *  > * [
 *  > * * "ruleNameString",
 *  > * * (inputValue) => [
 *  > * * * fnThatReturnsBoolean(inputValue), "invalidMsgString"
 *  > * * ]
 *  > * ]
 */
function _getValidationRulesArr(customValidators) {
  // get all rule names in "_defaultValidators"
  const defaultValidatorsKeys = Object.keys(_defaultValidators)
  const validatorsArray = []
  // loop through all incoming custom validators
  for (let key in customValidators) {
    // does the custom rule name match one inside "_defaultValidators"?
    if (defaultValidatorsKeys.includes(key)) {
      // if the value of the custom rule key is a string, keep the default
      // rule function as is, and use that string as its invalid message
      if (typeof customValidators[key] === "string") {
        validatorsArray.push([
          key,
          (val) => _defaultValidators[key](val, customValidators[key])
        ])
        continue
      } else if (typeof customValidators[key] !== "function") {
        // the value of the custom rule key is a full rule function that
        // returns [ruleFn, invalidMsg]. Push it to "validatorsArray"
        // alongside its rule name as the first element
        validatorsArray.push([key, _defaultValidators[key]])
        continue
      }
    }
    // the custom rule name does not match a key in "defaultValidatorsKeys",
    // push its name and rule array as declared: [ruleFn, invalidMsg]
    validatorsArray.push([key, customValidators[key]])
  }
  // "validatorsArray" now holds one array for each rule, each of them shaped:
  //   [
  //    "ruleNameString",
  //    (inputValue) => [ FnThatReturnsBoolean(inputValue), "invalidMsgString" ]
  //   ]
  // Examples above, in "_defaultValidators"
  return validatorsArray
}

/**
 * Reduces "validators" array consisting of one array shape [ruleName, ruleFn]
 * for each stated validation rule into a `validation` object.
 *
 * @param {Array} validatorsArr Array of arrays shaped [ruleName, ruleFn]
 * @param {string} inputValue Current input's value
 *
 * @returns {object}
 * A validation object shape:
 * * {
 *   * rules: { ruleName1: passedBoolean, ruleName2: passedBoolean, ... }
 *   * messages: [ messageForRule1IfFailed, messageForRule2IfFailed, ... ],
 *   * isValid: areAllRulesAreValidBoolean
 * * }
 */
function _getValidationObj(validatorsArr, inputValue) {
  // check "validatorsArr" anatomy in "_getValidationRulesArr"s return value
  return validatorsArr.reduce(
    (acc, [ruleName, ruleFn]) => {
      // execute ruleFn with the current input's value. It must return
      // a boolean for its validation state, and its message if invalid
      const [isRuleValidated, ruleMsg] = ruleFn(inputValue)
      return {
        ...acc,
        // append the current rule name with its validation state
        rules: { ...acc.rules, [ruleName]: isRuleValidated },
        // if the rule is invalid, add its message to the message list
        messages: isRuleValidated ? acc.messages : [...acc.messages, ruleMsg],
        // update the global valid state. One failed rule invalidates the input
        isValid: acc.isValid && isRuleValidated
      }
    },
    { rules: {}, messages: [], isValid: true } // `validation` object shape
  )
}

/**
 * Gets the new validation object if we are validating. Otherwise, null.
 *
 * @param {boolean} enableValidation Gate that enables getting `validation` obj
 * @param {array} valRulesArr Array of sub-arrays, each sub-array shaped:
 *   [ruleName, ruleFn]
 * @param {string} inputValue Current input's value
 */
function _getUpdatedValidationObj(enableValidation, valRulesArr, inputValue) {
  return enableValidation && valRulesArr.length
    ? _getValidationObj(valRulesArr, inputValue)
    : null
}

/**
 * Updates state with new input value and validation object.
 *
 * @param {function} setSt State's setter
 * @param {string} newValue Updated input's value
 * @param {object} newValObj Updated `validation` object
 */
function _setStWithNewValueAndValidationObj(setSt, newValue, newValObj) {
  setSt((prevSt) => ({
    ...prevSt,
    value: newValue,
    valObj: newValObj ?? prevSt.valObj
  }))
}
