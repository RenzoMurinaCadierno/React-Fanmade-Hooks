# useInputHandlers

- [Working example here](https://rfh.netlify.app/use-input-handlers)

<br />

## Description

Recieves an input reference alongside its props and an optional configuration object, and takes control of that input.

It returns its value and setValue functions, as well as React and DOM handlers, validation on its value and "form submission"-like functionality.

<br />

## Parameters

<br />

- `ref` (React.ElementRef)

  A ref to the target input to control.

<br />

- `props` (object)

  Plain object with props you would normally pass to the input.

  > **Keep in mind** that `onChange` handler will recieve the event object as normal, plus the validation object used in this hook.

<br />

- `configs` (object)

  Optional configuration object containing:
  <br />
  <br />

  - `preventChange?` (boolean | function)

    If either the boolean or the function's return value is `true`, input will not change.
    <br />
    <br />

  - `validators?` (object)

    An object whose keys are the validation rules, and values being functions that get '_input_' current value as argument and must either return:

    - An `array` shaped:

      - `elem 0` (boolean): A test statement that resolves to a boolean. You can use '_input_' current value recieved as argument on the function. If it returns `false`, the validation fails and `elem 1` is pushed to returned `validation.messages` array (hook's `st.valObj.messages`).

      - `elem 1` (string): A string to use as failed validation message in `validation.messages` array.

      ```javascript
      // Example:
      useInputHandlers(
        // input reference,
        // props object,
        {
          // ...other configuration properties
          validators: {
            maxLength: (val) => [val.length < 20, "< 20 characters please!"]
            // ^ this creates a rule named 'maxLength' in `validation` object
            // which tests for input's length less than 20 on each validation
            // call. If length is >= 20, validation will fail and the custom
            // string is pushed to `validation.messages` array.
          }
        }
      )
      ```

    - A `string` to use as custom failed validation message for the default validator named exactly like this string value's key.

      ```javascript
      // Example:
      useInputHandlers(
        // input reference,
        // props object,
        {
          // ...other configuration properties
          validators: {
            numeric: "No A, B, C's. Just 1, 2, 3s!"
            // ^ this overrides the default message for 'numeric' rule.
          }
        }
      )
      ```

    Default rules provided by the hook are **required**, **numeric**, **alphabetic**, **alphanumeric** and **email**.

    Check _"\_defaultValidators"_ in this hook's file for further instructions.
    <br />
    <br />

  - `onSetValue?` (function)

    Callback for `setValue`. We add it here since if we spread it on `props`, then an invalid property will be assigned to '_input_'.
    <br />
    <br />

  - `onSubmit?` (function)

    Callback invoked upon pressing any keys with codes in `configs.submitKeyCodes`.

    It will be triggered either if:

    - `configs.validators` is `undefined` (meaning we are not validating submissions).

    - `st.valObj.messages.length === 0` (meaning there are no validation errors).

    - `configs.forceSubmit` is `true` (meaning validation errors are ignored).
      <br />
      <br />

  - `onSubmitFail?` (function)

    Alternate `onSubmit` callback invoked on a failed submission attempt (validation errors) and if `configs.forceSubmit` is `false`.
    <br />
    <br />

  - `onValidation?` (function)

    Callback invoked after each instance where input's value is tested versus `configs.validators` (`onChange`, `onSetValue`, `onSubmit` and `onBlur`).
    <br />
    <br />

  - `validateOnChange?` (boolean)

    `true` will calculate the returning validation object on input change. `false` (default) will trigger recalculation on submit.
    <br />
    <br />

  - `submitKeyCodes?` (Array)

    An array with keyCodes which will trigger `onSubmit`. Defaults to **[13]**, 13 being _Enter_/_Return_ key code.
    <br />
    <br />

  - `reRenderOnSubmit?` (boolean)

    If no `validators` are assigned (no submit validation) and `onSubmit` is defined in `props`, setting this config to `true` will re-render the component on submission. `false` (default) will call for `onSubmit` without re-rendering.
    <br />
    <br />

  - `clearOnSubmit?` (boolean)

    `true` will clear input's value on submit. Defaults to `false`.
    <br />
    <br />

  - `forceSubmit?` (boolean):

    Input will not submit if any validation rule was not passed (default). Setting this config to `true` will force submission regardless validation state.

<br />

## Return

<br />

An `object` shaped:

<br />

- `props` (object)

  Props that **_MUST_** be spreaded on target '_input_'. They include all props passed when invoking the hook, plus `st.value` (controlled value) and `onChange` handler.

<br />

- `value` (string)

  '_input_' current value.

<br />

- `setValue` (function)

  `setValue` linked to '_input_' value (`setValue` being a modified version of regular state setter).

<br />

- `validation` (object)

  Validation object with keys:

  - `rules` (object): Rule names strings as keys, with boolean values that indicate if the rule was passed.

  - `messages` (Array): All failed rules' messages.

  - `isValid` (boolean): `true` if all validation rules passed.

<br />

- `clear` (function)

  Clears '_input_' value.

<br />

- `blur` (function)

  Takes focus off the input.

<br />

- `focus` (function)

  Sets focus on the input.

<br />

- `disable` (function)

  Sets `disable` HTML property to `true`.

<br />

- `enable` (function)

  Sets `disable` HTML property to `false`.

<br />

- `toggleDisable` (function)

  Toggles `disable` HTML property.

<br />

- `getProp` (function)

  Given a prop name as arg of `getProp`, it returns a reference of the prop passed in `props` object that matches that name, or the matching DOM prop if it exists.

<br />

- `setDOMProp` (function)

  Dangerously sets a property to the input element.

<br />

- `callDOMProp` (function)

  Dangerously invokes a property in the input element.

<br />

- `reRender` (function)

  Forces a component re-render.
