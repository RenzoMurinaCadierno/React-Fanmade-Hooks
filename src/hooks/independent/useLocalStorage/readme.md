# useLocalStorage

## Description

Targets a key in local storage and offers handlers to **set**, **get**, **delete** and **reset** it as a whole, or to target single or multiple nested keys instead to perform those operations on, given local storage item is a plain `object`.

It also offers reactive functionality. In such case, this hook will listen to the specified `configs.value`. When it changes, it can either override the whole local storage item with it, or one/many of its keys or nested keys instead if it is a plain `object` and we wish to do so.

Manual or reactive **set** and **del** functions are also flexible if you wish to use current values to determine what to set local storage or any of its nested keys with, or if you with to abort their deletion.

<br />

## Parameters

A single configuration object (hereby named **configs**) shaped:

<br />

- `key` (string)

  Local storage key that the hook will target to perform all of its operations. In the event no local storage key with that name exists, then a local storage item with that key will be automatically created.

  > Mind that this parameter **_must_** be defined, or else nothing in this hook will work. If not present, hook will crash as soon as it is invoked.

<br />

- `value?` (any)

  Starting value to set local storage item with, and also the one `updateOnValueChange` will listen to set the value of its stated keys and/or nested keys with when it changes (reactive functionality).

<br />

- `updateOnValueChange?` (boolean|function|Array)

  Reactive listener, to be defined only if `value` is prone to reactive changes (that is, anything that re-renders the component when it changes, like a call to `setState`) It can be:

  - A **boolean** value `true`, which indicates this hook that the new `configs.value` should override the current local storage item.

  - A **function** that takes current local storage item as parameter. It will be executed each time `configs.value` changes and if it returns a truthy value, then local storage will be overriden with the new `configs.value`.

  - An **array of strings**, each representing a key or nested key in dot notation inside local storage item (if we are working with a plain `object`). This tells the hook to update only those inner keys with the new `configs.value`.

    > _That array also accepts sub-arrays with the aforementioned keys or nested keys as first element, and a function as the second one_.\
    > The function will get the current value in local storage item for the key specified in the first element as the first argument, and the whole local storage item as the second one. It will be invoked each time `configs.value` changes, and if it resolves to truthy, then that key will be updated with the new `configs.value`. Falsy will abort the updating process for that key.

<br />

- `preventSelfRebuild?` (boolean)

  If local storage with key `configs.key` is removed entirely from the browser, it is rebuilt by default upon a "set" call. Setting this parameter to `true` will stop the rebuilding process.

  > **WARNING:** Do not do it unless necessary. If you do not rebuild the local storage object, then any operation on it might (and most probably will) fail.

<br />

- `selfRebuildValue`: (any)

  If local storage was removed entirely and a value is attempted to be set to it, it is automatically rebuilt. By defining this parameter, local storage will be rebuilt with the hereby defined value. If left `undefined` (default), it will use the `configs.value` passed initially, at mount.

<br />

- `reRenderOn?` (string|Array)

  A string with value **set**, **get** or **del**, or an array with any combination of those strings as elements. If defined, the component this hook is at will re-render after successful operations of functions with those names.

<br />

- `noConsole?` (boolean)

  This hook heavily warns in console of any invalid or unsuccessful operations. Setting this value to `true` will disable those warnings, thus failing silently. Defaults to `false`.

<br />

## Return

An **object** with **get**, **set**, **del** and **reset** handlers.

<br />

- `get` (function)

  Handles the logic to get the value of local storage item, or of any of its
  nested keys if local storage is a plain `object`.

  Parameters can be:

  - **Falsy value** or an **invalid object** (like an event object or an object with a circular reference). Such case will return the whole local storage value.

  - **Any number of non-empty strings** representing nested keys inside local storage plain `object` (in dot notation). Their values in local storage will be returned.

<br />

- `set` (function)

  Handles the logic to set the value of local storage key as a whole, or to
  any of its nested keys if we are working with them.

  Parameters can be:

  - **Any valid value** to set local storage with as first arg, and a **boolean** `true` as the second. This will replicate the traditional `window.localStorage.setItem`, overriding current local storage item with the designated value.

  - **Any number of arrays** with a non-empty string representing the target nested key to set value to (in dot notation) as the first element, and the valid value to set to that key as a second one.

    > That second element can also be a **function** that gets the previous value for that nested key and the whole local storage item as params. It will be invoked, and its return value will be set to the nested key.

  - **A plain object** with keys and nested keys ressembling the ones to target in local storage (that is, an object representation instead of dot notation), and values for those nested keys to set them with. Only the targetted nested keys will be changed.

    > The value for those nested keys can be a **function** with all conditions stated in the previous point above.

<br />

- `del` (function)

  Handles the deletion of local storage key as a whole, or any of its nested keys if we are working with them.

  Parameters can be:

  - A **nullish value** or an **invalid object** (like an event object or an object with a circular reference). Such case will delete local storage as a whole.

  - A **function** which will recieve current local storage as argument. If it evaluates to **truthy**, local storage will be deleted. On **falsy**, deletion process will be aborted and will return `false`.

  - **Any number of non-empty strings** representing nested keys inside local storage plain object (in dot notation). Those keys will be deleted.

  - **Any number of arrays** with a nested key as first element, and a function as second element. Such case will invoke the function for that nested key passing its previous value in local storage as a first argument, and the whole local storage value as the second one. If that function evaluates to **truthy**, then the nested key will be deleted.

<br />

- `reset` (function)

  Reverts local storage to the initial `configs.value` used when calling for the hook, or to the indicated value passed as arguments.

  Parameter can be:

  - **any valid value** you want to set local storage with after resetting.
