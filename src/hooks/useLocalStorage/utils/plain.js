/* eslint-disable */

const plainCode = `/******************************************************************************
 * **WARNING!** This code is written in ES2020! 
 * You will need a babel transpiler that fits it.
 * Or you can use Create-React-App ^3.3.0, since it is already implemented there
 ******************************************************************************/

import { useEffect, useCallback, useState } from "react"

/**
 * Targets a key in local storage and offers handlers to set, get, delete
 * and reset it as a whole, or to target single or multiple nested keys
 * instead to perform those operations on, given local storage item is
 * a plain object.
 *
 * It also offers reactive functionality. In such case, this hook will
 * listen to the specified \`configs.value\`. When it changes, it can either
 * override the whole local storage item with it, or one/many of its keys or
 * nested keys instead if it is a plain object and we wish to do so.
 *
 * Manual or reactive "set" and "del" functions are also flexible if you wish
 * to use current values to determine what to set local storage or any of
 * its nested keys with, or if you with to abort their deletion.
 *
 * @param configs
 *
 * \`key\` (string): local storage key that the hook will target to perform all
 *   of its operations. In the event no local storage key with that name
 *   exists, then a local storage item with that key will be automatically
 *   created.
 *   * Mind that this parameter MUST be defined, or else nothing in this hook
 *     will work. If not present, it will crash as soon as it is invoked.
 *
 * \`value?\` (any): starting value to set local storage item with, and also
 *   the one \`updateOnValueChange\` will listen to set the value of its stated
 *   keys and/or nested keys with when it changes (reactive functionality).
 *
 * \`updateOnValueChange?\` (boolean|function|Array): reactive listener, to be
 *   defined only if \`value\` is prone to reactive changes (that is,
 *   anything that re-renders the component when it changes, like "setState").
 *   It can be:
 *   * a boolean "true", which indicates this hook that the new \`configs.value\`
 *     should override the current local storage item.
 *   * a function that takes current local storage item as parameter. It will
 *     be executed each time \`configs.value\` changes and if it returns a truthy
 *     value, then local storage will be overriden with the new \`configs.value\`.
 *   * an array of strings, each representing a key or nested key in dot
 *     notation inside local storage item (if we are working with a plain
 *     object). This tells the hook to update only those inner keys with the
 *     new \`configs.value\`.
 *     * That array also accepts sub-arrays with the aforementioned keys or
 *       nested keys as first element, and a function as the second one.
 *       The function will get the current value in local storage item for
 *       the key specified in the first element as the first argument, and
 *       the whole local storage item as the second one. It will be invoked
 *       each time \`configs.value\` changes, and if it resolves to truthy, then
 *       that key will be updated with the new \`configs.value\`. False will
 *       abort the updating process for that key.
 *
 * \`preventSelfRebuild?\` (boolean): if local storage with key \`configs.key\` is
 *   removed entirely from the browser, it is rebuilt by default upon a "set"
 *   call. Setting this parameter to true will stop the rebuilding process.
 *   * **WARNING:** Do not do it unless necessary. If you do not rebuild the
 *     local storage object, then any operation on it might (and most
 *     probably will) fail.
 *
 * \`selfRebuildValue?\` (any): if local storage was removed entirely and a
 *   value is attempted to be set to it, it is automatically rebuilt. By
 *   defining this parameter, local storage will be rebuilt with the hereby
 *   defined value. If left undefined (default), it will use the \`configs.value\`
 *   passed initially, at mount.
 *
 * \`reRenderOn?\` (string|Array): a string with value "set", "get" or "del",
 *   or an array with any combination of those strings as elements. If
 *   defined, the component this hook is at will re-render after successful
 *   operations of functions with those names.
 * 
 *   * **WARNING:** Do NOT use alongside \`configs.updateOnValueChange\`. When 
 *     setting outer state linked to \`configs.value\`, \`configs.reRenderOn\` will 
 *     re-render the component, triggering the modifier handlers again and 
 *     causing an infinite loop.
 *
 * \`noConsole?\` (boolean): this hook heavily warns in console of any invalid
 *   or unsuccessful operations. Setting this value to true will disable
 *   those warnings, thus failing silently. Defaults to false.
 *
 * @returns {object} An object with "get", "set", "del" and "reset" handlers.
 * Check each of those function's in-signature comments to know how they work.
 * 
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useLocalStorage(configs = {}) {
  /**
   * This useEffect runs at mount phase and sets the initial local storage
   * value for \`configs.key\` only if it does not already exist.
   * Will behave differently depending on \`configs.updateOnValueChange\`. If
   * it is an array of dot notation nested keys, then initial value will be
   * set to an object for them to work. Otherwise, the whole local storage
   * item will be overriden with \`configs.value\`
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // this hook will not work if \`configs.key\` (local storage key) is not
    // a non-empty string. Check for that, and crash on fail.
    if (configs.key && typeof configs.key === "string") {
      // get the current local storage item for \`configs.key\`
      const rawLsItem = localStorage.getItem(configs.key)
      // if it is falsy, run setup logic. Otherwise, do nothing
      if (!rawLsItem) {
        // given the case we decide to update the value of nested keys
        // when \`configs.value\` changes, then \`configs.updateOnValueChange\`
        // should be an array of those nested keys. Also, if brought
        // local storage item is not a plain object, force set it to
        // one for those nested keys to work
        if (
          Array.isArray(configs.updateOnValueChange) &&
          !_val(rawLsItem).isPlainObject()
        ) {
          _trySetLocalStorage(configs.key, {})
          // hereby, we are not dealing with nested keys, but with
          // local storage item as a whole. Set it to \`configs.value\` or
          // its fallback if it is undefined
        } else {
          const validValue =
            typeof configs?.value === "undefined" ? {} : configs.value
          _trySetLocalStorage(configs.key, validValue)
        }
      }
    } else {
      // \`configs.key\` was not defined. Crash intentionally.
      _throwErr(null, "mount", TypeError, configs.key)
    }
  }, [])

  /**
   * This useEffect will run each time \`configs.value\` changes. It serves the
   * purpose of "reactive" local storage management (whereas "set", "get", "del"
   * and "reset" methods below are to be called manually when needed)
   * This useEffect resolves depending on \`configs.updateOnValueChange\`. If it
   * is:
   * * a boolean "true", it overrides local storage with the new
   *   \`configs.value\`.
   * * a function, it invokes it passing what is in local storage and the next
   *   value (new \`configs.value\`). If the result is truthy, it will override
   *   local storage. Falsy results will abort the updating process.
   * * an array of non-empty strings representing nested keys inside local
   *   storage plain object (in dot notation), it will update only those keys
   *   with \`configs.value\`.
   *   * that array also accepts sub-arrays with the nested key as first
   *     argument, and a function as second argument. Such case will invoke the
   *     function for that nested key, passing its previous value in local
   *     storage, \`configs.value\` and the whole local storage item. If that
   *     function evaluates to truthy, then the key will be updated. Falsy will
   *     abort update process for that nested key.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const updateOnValueChange = configs.updateOnValueChange
    const updatedValue =
      typeof configs.value === "undefined" ? {} : configs.value
    // run only if "updateOnValueChange" is truthy and local storage key did not
    // change
    if (updateOnValueChange && configs.key && typeof configs.key === "string") {
      // on "true" boolean, override the entire local storage with the updated
      // value
      if (typeof updateOnValueChange === "boolean" && updateOnValueChange) {
        set(updatedValue, true)
        // on a function, invoke it passing the current local storage value and
        // the new value to be updated with. If it resolves to truthy, update
        // local storage
      } else if (typeof updateOnValueChange === "function") {
        const shouldUpdate = !!updateOnValueChange(
          _tryParseLocalStorage(
            configs.key,
            null,
            "useEffect",
            configs.noConsole
          ),
          updatedValue
        )
        shouldUpdate && set(updatedValue, true)
        // otherwise, we are dealing with an array of nested keys inside local
        // storage (dot notation) that will get their values updated when
        // \`configs.value\` changes
      } else if (Array.isArray(updateOnValueChange)) {
        let lsItem
        // map each entry in the array to further spread in "set" call as args
        const arrayOfPathsAndUpdatedValuesSubArrays = updateOnValueChange.map(
          (keyPath, i) => {
            // are we dealing with an array nested key? [keyPath, updateFn]
            if (Array.isArray(keyPath)) {
              // if nested key exists in local storage, get its current value
              const currValue = get(keyPath[0])
              // fail-safe for second argument. Only calculate update if it is
              // a function
              if (typeof keyPath[1] === "function") {
                // make sure to parse lsItem only once on the whole ".map"
                // process
                if (typeof lsItem === "undefined") {
                  lsItem = _tryParseLocalStorage(
                    configs.key,
                    null,
                    "useEffect",
                    configs.noConsole
                  )
                }
                // resolve the passed function to a boolean. False will prevent
                // key from updating when value changes. Pass helper args to
                // calculate
                const shouldUpdate = !!keyPath[1](
                  currValue, // current local storage value for the key
                  updatedValue, // next value to be updated with
                  lsItem // the whole local storage value
                )
                // return value of ".map" iteration, shape:
                // > [keyPath, current|updated value]
                return [keyPath[0], shouldUpdate ? updatedValue : currValue]
              } else {
                // second argument is not a function. Log error and return
                // [keyPath, current value] so it does not get updated
                _consoleErr(
                  "udpateValue",
                  [configs.key, _val(keyPath[0]).stringify(), i],
                  configs.noConsole
                )
                return [keyPath[0], currValue]
              }
            }
            // keyPath is not an array, it should be a string, meaning we always
            // update it on value change. Return [keyPath, updated value]
            return [keyPath, updatedValue]
          }
        )
        // set listener nested keys with the new value
        set(...arrayOfPathsAndUpdatedValuesSubArrays)
      }
    }
  }, [configs.updateOnValueChange, configs.value])

  // this hook is not reactive by nature, but we can simulate re-rendering by
  // pinging a state from true to false using "reRenderIfStated" below
  const [, ping] = useState(false)

  /**
   * Re-renders the component after the resolution of any method called from
   * the return value of this hook that matches \`configs.reRenderOn\`.
   * \`configs.reRenderOn\` can be a <string> with value "set", "get", "del", or
   * an <array> of any combination of them if you need more than one.
   */
  const reRenderIfStated = useCallback(
    (action) =>
      (action === configs.reRenderOn ||
        (Array.isArray(configs.reRenderOn) &&
          configs.reRenderOn.includes(action))) &&
      ping((st) => !st),
    [configs.reRenderOn, ping]
  )

  /**
   * Handles the deletion of local storage key as a whole, or any of its nested
   * keys if we are working with them.
   * * args can be:
   *   * a single nullish value or an invalid object (like an event object or an
   *     object with a circular reference). Such case will delete local storage
   *     as a whole.
   *   * a single function which will recieve current local storage as argument.
   *     If it evaluates to truthy, local storage will be deleted. On falsy,
   *     deletion process will be aborted and will return false.
   *   * any number of non-empty strings representing nested keys inside local
   *     storage plain object (in dot notation). Those keys will be deleted.
   *   * any number of arrays with a nested key as first element, and a function
   *     as second element. Such case will invoke the function for that nested
   *     key passing its previous value in local storage as a first argument,
   *     and the whole local storage value as the second one. If that function
   *     evaluates to truthy, then the nested key will be deleted.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const del = useCallback((...args) => {
    // to evaluate a complete local storage removal, we first need to work with
    // raw (unparsed) data. If we parse it before the first "if" check, then
    // null or undefined would be type string and thus valid local storage
    // values we might want to target on upcoming nested key logic to determine
    // their deletion
    const rawLsItem = localStorage.getItem(configs.key)
    // complete local storage item removal "if" case. Triggers if raw local
    // storage is nullish, if "del" has no args, or if it has 1 arg and it is an
    // invalid value (event object/circular reference), or a function
    if (!rawLsItem || !args.length || args.length === 1) {
      const _firstArg = _val(args[0])
      const _firstArgIsFn = _firstArg.isType("function")
      const parsedItem = JSON.parse(rawLsItem)
      // given the case the single arg is a function, resolve it passing current
      // local storage as argument. If it returns truthy, abort deletion process
      if (_firstArgIsFn && !args[0](parsedItem)) {
        return false
        // do nothing if arg is truthy, valid, and not a function. This skips
        // out of outer "if" statement, and into nested keys delete logic
        // resolution. Note that functions resolved to truthy were dealt with
        // above, so any other function must delete local storage, that's why we
        // make them drop down to "else" clause below
      } else if (
        _firstArg.get() &&
        _firstArg.canBeJsonStringified() &&
        !_firstArgIsFn
      ) {
        // any other case deletes local storage and returns its former value.
      } else {
        localStorage.removeItem(configs.key)
        reRenderIfStated("del")
        return parsedItem
      }
    }
    // now we are safe to work with local storage parsed item
    const lsItem = JSON.parse(rawLsItem)
    // args were passed. Valid ones will be non-empty strings representing
    // nested keys in dot notation, or arrays where the first arg is the nested
    // key and the second one a function that evaluates to a boolean
    let deletedNestedKeys = args.map((keyPathStringOrArr, i) => {
      // we start by assuming each arg is a a nested key representation as a
      // string
      let keyPath = keyPathStringOrArr
      // now we check, is it an array instead?
      if (Array.isArray(keyPathStringOrArr)) {
        // it is. Switch "keyPath" to its first arg, the nested key as a string
        keyPath = keyPathStringOrArr[0]
        // if the second arg is a function, attempt to get the current value in
        // local storage for the nested key in first arg, and use it to resolve
        // the function. If it evaluates to falsy, we change "keyPath" to null,
        // which will invalidate deletion process for that key below
        if (typeof keyPathStringOrArr[1] === "function") {
          const valueForKey = _getValue(keyPathStringOrArr[0], lsItem)
          if (!keyPathStringOrArr[1](valueForKey, lsItem)) keyPath = null
        }
      }
      // now "keyPath" holds the non-array arg, or the value in index 0 of the
      // array passed as arg. However, if that value is invalid (say, not a
      // string but an event object), then we cannot use it to target a key in
      // local storage. Such case is evaluated here, and if it is an invalid
      // value, "keyPath" will be changed to null in the same fashion as
      // function evaluation above
      if (!_val(keyPath).canBeJsonStringified()) {
        _consoleErr(
          "invalidValue",
          [configs.key, "del", i, ""],
          configs.noConsole
        )
        keyPath = null
      }
      // now "keyPath" can be resolved in all scenarios. Proceed with deletion
      // logic
      return _delKey(keyPath, lsItem)
    })
    // ".map" returns an array. If only one arg was passed to "del", it would
    // be consistent to return a value by itself, not in an array. We do so here
    if (deletedNestedKeys.length === 1) deletedNestedKeys = deletedNestedKeys[0]
    // The new local storage can now be set
    _trySetLocalStorage(configs.key, lsItem, () => reRenderIfStated("del"))
    // finally, return the values that were deleted, in case they are needed
    return deletedNestedKeys
  }, [])

  /**
   * Handles the logic to get the value of local storage item, or of any of its
   * nested keys if local storage is a plain object.
   * * args can be:
   *   * a falsy value or an invalid object (like an event object or an object
   *     with a circular reference). Such case will return the whole local
   *     storage
   *     value.
   *   * any number of non-empty strings representing nested keys inside local
   *     storage plain object (in dot notation). Their values in local storage
   *     will be returned.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const get = useCallback((...args) => {
    // we cannot get the values in local storage if we do not parse it first
    const lsItem = _tryParseLocalStorage(
      configs.key,
      null,
      "get",
      configs.noConsole
    )
    // if there is nothing to get from local storage, warn it and return out
    if (!lsItem) return _consoleErr("get-1", configs.key, configs.noConsole)
    // local storage is populated. Check if the first arg passed to "get" is
    // falsy or an invalid value. If so, return the whole local storage item
    const _firstArg = _val(args[0])
    if (_firstArg.isFalsy() || !_firstArg.canBeJsonStringified()) {
      reRenderIfStated("get")
      return lsItem
    }
    // we are dealing with one or more truthy and valid values in args.
    const values = args.map((keyPath, i) => {
      // check if all args are strings and truthy (the check above only
      // tested for the first argument). If all are, apply the logic that
      // returns their values
      const _keyPath = _val(keyPath)
      if (_keyPath.isTruthy() && _keyPath.isType("string")) {
        return _getValue(_keyPath.get(), lsItem)
      }
      // if arg was a valid value but not a non-empty string, warn the error
      // and return undefined
      if (_keyPath.canBeJsonStringified()) {
        return _consoleErr(
          "get-2",
          [configs.key, _keyPath.stringify(), i],
          configs.noConsole
        )
      }
      // arg was an invalid value (event object, circular reference). Again,
      // warn error and return undefined
      return _consoleErr(
        "invalidValue",
        [configs.key, "get", i, ""],
        configs.noConsole
      )
    })
    // if local storage was determined to be reactive, trigger a re-render
    reRenderIfStated("get")
    // lastly, "map" returns an array. If only one argument was passed, return
    // it alone (not in an array), to keep consistency. Otherwise, the array
    return args.length === 1 ? values[0] : values
  }, [])

  /**
   * Handles the logic to set the value of local storage key as a whole, or to
   * any of its nested keys if we are working with them.
   * * args can be:
   *   * any valid value to set local storage with as first arg, and a boolean
   *     "true" as the second. This will replicate the traditional
   *     "window.localStorage.setItem", overriding current local storage item
   *     with the designated value.
   *   * any number of arrays with a non-empty string representing the target
   *     nested key to set value to (in dot notation) as the first element, and
   *     the valid value to set to that key as a second one.
   *     * That second element can also be a function that gets the previous
   *       value for that nested key and the whole local storage item as params.
   *       It will be invoked, and its return value will be set to the nested
   *       key.
   *   * a plain object with keys and nested keys ressembling the ones to target
   *     in local storage (that is, an object representation instead of dot
   *     notation), and values for those nested keys to set them with. Only the
   *     targetted nested keys will be changed.
   *     * The value for those nested keys can be a function with all conditions
   *       stated in the previous point above.
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const set = useCallback((...args) => {
    // before doing anything, we need current local storage item
    let lsItem = _tryParseLocalStorage(
      configs.key,
      {},
      "set",
      configs.noConsole
    )
    // case 1: we are dealing with a regular "window.localstorage.setItem" call,
    // which means we got an array with the value to override local storage item
    // with as first element, and a boolean "true" as the second one.
    const _firstArg = _val(args[0])
    if (args[1] && typeof args[1] === "boolean") {
      // resolve the value in first arg if it was a function. If undefined,
      // fail-safe to an empty object
      const resolvedValue = _firstArg.resolveSafe({}, lsItem)
      // set local storage with that value and re-render the component if we are
      // dealing with a reactive statement. Return out, we are done
      return _trySetLocalStorage(configs.key, resolvedValue, () =>
        reRenderIfStated("set")
      )
    }
    // case 2: we are attempting to set keys or nested keys to a plain object
    // local storage item.
    // First, if there is no local storage object (it was deleted), rebuild it.
    // Do not rebuild it if stated. DO NOT PREVENT REBUILD unless neccesary!
    if (!lsItem && !configs.preventSelfRebuild) {
      lsItem = _trySetLocalStorage(
        configs.key,
        _val(configs.selfRebuildValue).isPlainObject()
          ? configs.selfRebuildValue
          : {}
      )
    }
    // check if "lsItem" holds a plain object to work with. If not, warn in
    // console and return out. We cannot do anything with an incompatible
    // "lsItem"
    if (!_val(lsItem).isPlainObject()) {
      return _consoleErr(
        "set-1",
        [configs.key, JSON.stringify(lsItem)],
        configs.noConsole
      )
    }
    // before attempting to set values to nested keys, we have to check if each
    // argument passed is a valid array with a string represented the nested
    // key in dot notation as a first argument. This is the minimum requirement.
    // For each failed arg, warn in console and return undefined in that case
    args.forEach((arg, i) => {
      const _arg = _val(arg)
      if (!_arg.canBeJsonStringified()) {
        const nestedKey =
          Array.isArray(arg) && typeof arg[0] === "string"
            ? "\`" + arg[0] + "\`"
            : ""
        return _consoleErr(
          "invalidValue",
          [configs.key, "set", i, nestedKey],
          configs.noConsole
        )
      }
      // if we are passing an object as arg, then "_getPathStrings" will return
      // an array of arrays with paths and values. We have to iterate them, but
      // that will not work if we manually pass an array of path and value as
      // arg, as that arg will be a single array, and we need it to be inside an
      // outer one.
      // To circumvent this, we nest that manual array into another array so
      // that it ressembles "_getPathStrings" return structure.
      // * E.g.: [ [pathString, value], [pathString, value], ... ]
      const arrayOfPathsAndValuesSubArrays = _arg.isPlainObject()
        ? _getPathStrings(_arg)
        : [_arg.get()]
      // now we can map the contianer array for each of their sub-arrays
      arrayOfPathsAndValuesSubArrays.forEach((arr) => {
        // we need to make sure they are arrays and length 2 (pathString, value)
        if (!Array.isArray(arr) || arr.length !== 2) {
          return _consoleErr("set-2", [arr, i], configs.noConsole)
        }
        // we are safe to destructure them and add the dot-notation path string
        // and its value to local storage item (lsItem)
        const [keyPath, value] = arr
        _createPathAndSetValue(
          keyPath,
          value,
          lsItem,
          configs.key,
          configs.noConsole
        )
      })
    })
    // "lsItem" now holds all path strings and values passed as args to "set",
    // so proceed to set local storage with it
    return _trySetLocalStorage(configs.key, lsItem, () =>
      reRenderIfStated("set")
    )
  }, [])

  /**
   * Reverts local storage to the initial \`configs.value\` used when calling for
   * the hook, or to the indicated value passed as args
   * * args:
   *   * value: any valid value you want to set local storage with after reset
   */
  /* eslint-disable react-hooks/exhaustive-deps */
  const reset = useCallback((value) => {
    const _value = _val(value)
    const isInvalid = _value.isUndefined() || !_value.canBeJsonStringified()
    const fallbackValue =
      typeof configs?.value === "undefined" ? {} : configs.value
    return set(isInvalid ? fallbackValue : _value.get(), true)
  }, [])

  // hook's return handlers
  return { set, get, del, reset }
}

/******************************************************************************
 ******************************  HELPER FUNCTIONS *****************************
 ******************************************************************************/

/**
 * Attempts setting local storage's given key with the passed value. Executes
 * cb on success and retuns the value as a flag. Upon failure, it warns in
 * console and returns false
 *
 * @param {string} key target local storage's key
 * @param {any} value value to set local storage with
 * @param {function} cb callback to execute upon success
 * @param {boolean} noConsole false will disable console errors
 * @param {boolean} stringify false if value is already JSON.stringified
 */
function _trySetLocalStorage(key, value, cb, noConsole, stringify = true) {
  try {
    localStorage.setItem(key, stringify ? JSON.stringify(value) : value)
    cb?.()
    return value
  } catch (err) {
    _consoleErr("trySetLocalStorage", [key, err], noConsole)
    return false
  }
}

/**
 * Attempts parsing passed local storage key. It returns the value for the
 * parsed item on success, or fallbackValue on failure (it also warns in
 * console of a failed parse).
 *
 * @param {string} key target local storage's key
 * @param {any} fallbackValue replacement value on fail local storage parse
 * @param {string} caller the name of the function that called for this one
 * @param {boolean} noConsole false will disable console errors
 */
function _tryParseLocalStorage(key, fallbackValue, caller, noConsole) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    // stringify the fallback value and return it after warning in console
    const stringedVal = JSON.stringify(fallbackValue)
    _consoleErr(
      "tryParseLocalStorage",
      [key, caller, stringedVal, err],
      noConsole
    )
    return fallbackValue
  }
}

/**
 * Takes any value and extends its functionality with type/value checkers,
 * and resolvers if they are functions and need to be called or if they
 * need to be parsed to string.
 *
 * @param {any} value Any value to add the extra functionality provided here
 */
function _val(value) {
  const get = () => value
  const isType = (type) => typeof value === type
  const isUndefined = () => isType("undefined")
  const isFalsy = () => !value
  const isTruthy = () => !isFalsy()
  /**
   * Checks if it is not falsy and if object instance (meaning it includes
   * functions and arrays)
   */
  const isObject = () => value && value instanceof Object
  /**
   * More strict than isObject(). Excludes functions arrays (and anything
   * type !== 'object')
   */
  const isPlainObject = () => {
    return !!(isObject() && isType("object") && !Array.isArray(value))
  }
  /**
   * If value is a function, it calls it with args and returns the result.
   * Otherwise it returns value as is
   */
  const resolve = (...args) => (isType("function") ? value(...args) : value)
  // resolve(), but if the result is undefined, it returns a default value
  const resolveSafe = (defaultVal, ...args) => {
    const resolvedValue = resolve(...args)
    return isUndefined(resolvedValue) ? defaultVal : resolvedValue
  }
  const stringify = () => JSON.stringify(value)
  /**
   * Tests if value has no conflicts when stringified. This is such mostly to
   * detect and avoid circular references
   */
  const canBeJsonStringified = () => {
    try {
      stringify()
      return true
    } catch (err) {
      return false
    }
  }
  return {
    get,
    isType,
    isFalsy,
    isTruthy,
    isUndefined,
    isObject,
    isPlainObject,
    resolve,
    resolveSafe,
    stringify,
    canBeJsonStringified
  }
}

/**
 * Starting from a plain object with keys (and nested keys if any) and values
 * for those keys, it returns an array with the path strings to the deepest
 * keys on each set as first element, in dot notation. The value for that
 * key/nested key is appended to that array a second element
 * * E.g.: an example object like this:
 * > * {
 * > ** "login": { "user": "admin", "pass": 1234 },
 * > ** "names": [ "Alicia", "Keira" ]
 * > * }
 * * will resolve to an array like this:
 * > * [
 * > ** [ "login.user", "admin" ],
 * > ** [ "login.pass", 1234 ],
 * > ** [ "names": [ "Alicia", "Keira" ] ]
 * > * ]
 *
 * @param {any} target current key/nested key in recursion, or value in last
 *   sequence
 * @param {string} string the key path in dot notation
 * @param {Array} result the resulting array with key as dot notation and value.
 *   Shaped like example above
 */
function _getPathStrings(target, string = "", result = []) {
  // target is not a plain object, meaning we hit the value
  if (!target.isPlainObject()) {
    // push to "result" array an array shape [key/nested key path string, value]
    return result.push([string.slice(0, string.length - 1), target.get()])
  }
  // target is an object, modify path string with its key and recurse on its
  // value
  for (const key in target.get()) {
    const prevStr = string // save current path string to reset after recursion
    string += key + "." // add current key to path string
    _getPathStrings(_val(target.get()[key]), string, result) // recurse on value
    string = prevStr // reset path string for next keys
  }
  return result // array of [paths, values] subarrays, or array of paths
}

/**
 * Given a key or nested key path string (dot notation), it walks local storage
 * item object (lsItem) until it finds the deepest key, and sets its value with
 * \`value\`.
 *
 * @param {string} path path to target key or nested key in dot notation
 * @param {any} value the value to set that key or nested key with
 * @param {object} lsItem local storage parsed item. It must be a plain object
 * @param {string} lsKeyName \`configs.key\` (local storage's target key's name)
 * @param {boolean} noConsole false will disable console errors
 */
function _createPathAndSetValue(path, value, lsItem, lsKeyName, noConsole) {
  const _value = _val(value)
  // if path is empty or not type string, warn in console and do nothing
  if (!path || typeof path !== "string") {
    return _consoleErr(
      "set-3",
      [_value.stringify(), path, lsKeyName],
      noConsole
    )
  }
  // create a pointer which will advance between nested keys
  let pointer = lsItem
  // split key or nested key in dot-notation into an array with all key names
  const keys = path.split(".")
  // before setting any keys, we have to make sure they are valid strings.
  // If there are no invalid keys, then ".reduce" will be empty, thus will pass
  // the check after it. Otherwise, it will show a console error and will leave
  // local storage intact (will not set value to an invalid key)
  const invalidKeysErrorMsg = keys.reduce((acc, key, i) => {
    // catch undefined here so that is does not conflict with "JSON.parse" below
    if (!key || key === "undefined") return (acc += _getSetValErrorMsg(key, i))
    try {
      // "JSON.parse" fails on plain strings, so "catch" will grab valid keys.
      // Other values need to be truthy to pass as valid keys (like numbers).
      // If they are falsy (null, [], {}). Exceptions being 0 and NaN, which
      // we consider valid strings for key names
      const parsedKey = JSON.parse(key)
      if (!parsedKey && parsedKey !== 0)
        return (acc += _getSetValErrorMsg(key, i))
    } catch (err) {
      // parsing fails on a valid string, so we have a valid key name.
      return acc
    }
    return acc
  }, "")
  // a non-empty acc above means the key is invalid. Show console error and
  // return out of this function (value is not set, local storage unmodified)
  if (invalidKeysErrorMsg)
    return _consoleErr(
      "invalidKeys",
      [lsKeyName, path, invalidKeysErrorMsg],
      noConsole
    )
  // from now on, we are dealing with a valid dot notation path string.
  // For each key string starting from the shallowest up to deepest
  keys.forEach((key, i) => {
    // if we are in the last element of the array, it means it is the deepest
    // nested key. Set the value to it and return, we are done
    if (i === keys.length - 1) {
      return (pointer[key] = _value.resolve(pointer[key], lsItem))
    }
    // we are still not in the deepest key. First, we check if the next nested
    // key of this iteration does not exist in lsItem. if so, create it
    if (!_val(pointer[key]).isPlainObject()) pointer[key] = {}
    // next iteration key does exist in lsItem or we created it. Advance
    pointer = pointer[key]
  })
}

function _getSetValErrorMsg(key, index) {
  return '\\n  > key: "' + key + '", index in dot notation: ' + index + "\\n"
}

/**
 * Given a key or nested key path string (dot notation), it walks the object
 * passed as pointer until it finds the deepest key, and returns the value
 * assigned to it
 *
 * @param {string} path path to target key or nested key in dot notation
 * @param {object} pointer the object to walk to find the path's deepest key
 */
function _getValue(path, pointer) {
  // if path is empty or not type string, warn in console and do nothing
  if (!path || typeof path !== "string") return
  let targetValue
  // split key or nested key in dot-notation into an array with all key names
  const keys = path.split(".")
  // for each of those keys starting from the shallowest up to deepest
  keys.forEach((key, i) => {
    // if we are in the deepest nested key, return its value. We are done
    if (i === keys.length - 1) return (targetValue = pointer[key])
    // we are still not in the deepest key.
    // First, check if the next nested key of this iteration is an object
    // (meaning we can advance further).
    // If it is not, then we safely assume target nested key does not exist.
    // Return out
    if (!_val(pointer[key]).isPlainObject()) return
    // next nested key in path exists in pointer object. Advance.
    pointer = pointer[key]
  })
  return targetValue
}

/**
 * Given a key or nested key path string (dot notation), it walks the object
 * passed as pointer until it finds the deepest key, it deletes it and returns
 * the value it held before deletion.
 *
 * @param {string} path path to target key or nested key in dot notation
 * @param {object} pointer the object to walk to find the path's deepest key
 */
function _delKey(path, pointer) {
  // if path is empty or not type string, warn in console and do nothing
  if (!path || typeof path !== "string") return
  let deletedValue
  // split key or nested key in dot notation into an array with all key names
  const keys = path.split(".")
  // save the deepest nested key name. We have to compare it on each iteration
  const targetKey = keys[keys.length - 1]
  // for each of key starting from the most shallowest up to deepest
  keys.forEach((key) => {
    const _pointer = _val(pointer)
    // if the current key's value is not an object, it means we reached the
    // deepest key's value without matching targetKey. In other words, the
    // object does not contain the specified nested key. Nothing to delete.
    if (!_pointer.isPlainObject()) return
    // does the current key in iteration hold an object as a value, and that
    // object contains a key named like our target to delete?
    // If so, delete it and return its former value. We are done
    if (pointer.hasOwnProperty(targetKey)) {
      deletedValue = pointer[targetKey]
      delete pointer[targetKey]
      return
    }
    // we still did not find the target key, advance to next iteration
    pointer = pointer[key]
  })
  // return the deleted key's value, or undefined if the key did not exist
  return deletedValue
}

/**
 * Warns in console of different errors that can occur across this hook's usage.
 *
 * @param {string} type cases for switch statement
 * @param {string|Array} metaData extra info used to construct the error message
 * @param {boolean} doNotLogInConsole true will block console error messages
 */
function _consoleErr(type, metaData, doNotLogInConsole) {
  if (doNotLogInConsole) return
  let message = "<useLocalStorage> "
  switch (type) {
    case "udpateValue":
      message +=
        'Could not update value for nested key "' +
        metaData[1] +
        '" in local storage with key "' +
        metaData[0] +
        '" (nested key error @ index ' +
        metaData[2] +
        ' in "configs.updateOnValueChange" initialization array, tiggered by nested key "useEffect()" listening to "configs.value").\\n\\nIf you intend to halt the update process in one of the designed nested keys, pass it as a first argument inside an array to "configs.updateOnValueChange", and a function that returns a boolean as the second argument (true will proceed with the update, false will prevent it).\\n\\nRemember that that function recieves the current value for that key, the updated value and the current local storage item as parameters for you to work with.\\n'
      break
    case "set-1":
      message +=
        'Could not set local storage for key "' +
        metaData[0] +
        '" with current value "' +
        metaData[1] +
        '".\\n\\nTo use "set()" nested keys functionality, make sure key "' +
        metaData[0] +
        '" exists in local storage, with a plain object as value.\\n\\nYou can either set it calling "set()" with an object "{}" as first argument and a boolean "true" as the second one, or use "reset()" to restore local storage key if it was deleted.\\n\\nIf you use the latter and want to deal with nested keys, "configs.value" when calling for "useLocalStorage()" should have been a plain object. If it was not, you can pass one as an argument to "reset()" to set local storage value with.\\n'
      break
    case "set-2":
      message +=
        'Could not set local storage (error in "set()" with argument "' +
        metaData[0] +
        '" at index ' +
        metaData[1] +
        ').\\n\\n(1) Did you want to use nested key functionality?\\n\\nLocal storage value has to be an object, and you must pass arrays as arguments to "set()" for each nested key you want to modify, with shape:\\n\\n  [\\n    <any> value to set to inner local storage key -OR- <function> that resolves in a value (will get the current value for the target key and current local storage item as arguments),\\n    <string> local storage key path in dot notation\\n  ].\\n\\n(2) Did you intend to set local storage in the traditional way?\\n\\nPass any value as the first argument to "set()" (not restricted to shape stated above), and a boolean "true" as the second one.\\n\\nIn case you need to set an empty object as local storage value to use nested keys functionality, make that first argument be "{}".\\n\\n(3) Did you pass a function to determine local storage state using the previous value?\\n\\nThat works if you are trying to override the value (second argument "true", as explained in -(2)-), or if you are using nested keys functionality (check the first argument of the array in -(1)-).\\n'
      break
    case "set-3":
      message +=
        'Could not set stringified value "' +
        metaData[0] +
        '" to nested key "' +
        metaData[1] +
        '". Make sure local storage value for key "' +
        metaData[2] +
        '" is a plain JS object, and nested key is a non-empty string.\\n\\nDo you need to restore local storage with key "' +
        metaData[2] +
        '" to its initial state? Use "reset()".\\nIf your initial local storage state was not a plain object, pass an empty object "{}" as argument for nested keys to work.\\n\\nOr, if you intend to set local storage in the traditional way (overriding its value), call "set()" with the value as the first argument and a boolean "true" as the second one.\\n'
      break
    case "get-1":
      message +=
        'Could not retrieve local storage with key "' +
        metaData +
        '".\\n\\nMake sure local storage for key "' +
        metaData +
        '" exists.\\n\\nIf you need to re-create it, use "set()" with a value as first argument and a boolean "true" as the second one, or "reset()" given the initial value was a valid one.\\n\\nIf you attempted to set a value and you defined "configs.selfRebuildValue", then local storage was auto-rebuilt for you. You can ignore this error.\\n'
      break
    case "get-2":
      message +=
        'Could not retrieve value of supplied nested key "' +
        metaData[1] +
        '" for local storage key "' +
        metaData[0] +
        '" (@ "get()", argument index ' +
        metaData[2] +
        ').\\n\\nMake sure local storage for key "' +
        metaData[0] +
        '" exists, and nested key is a non-empty string.\\n\\nIf you need to re-create local storage, use "set()" or "reset()".\\n'
      break
    case "trySetLocalStorage":
      message +=
        'Could not set local storage item with key "' +
        metaData[0] +
        ".\\n\\nEither:\\n  (1) key is not defined, \\n  (2) local storage is disabled on your browser, \\n  (3) storage quota for current item was exceeded, or \\n  (4) a circular structure was attempted to be parsed to JSON.\\n\\nThis last case can happen when trying to parse invalid objects (like functions or event objects).\\n\\nDid you accidentally pass one to a function call as an argument, to a nested key's value, or to the state this hook is listening at to update local storage automatically?\\n\\n<-- Error and stack -->\\n\\n" +
        metaData[1] +
        "\\n"
      break
    case "tryParseLocalStorage":
      message +=
        'Could not JSON-parse local storage with key "' +
        metaData[0] +
        '", as requested by function "' +
        metaData[1] +
        '()" (manually defaulted to "' +
        metaData[2] +
        '" as fail-safe).\\n\\nThis normally occurs when value in local storage is invalid (like "undefined").\\n\\nTry overriding that value with "set()" by passing a new value as first argument, and a boolean "true" as the second one.\\n\\nYou can also use "reset()" given initial local storage value was a valid one.\\n\\n' +
        metaData[3] +
        "\\n"
      break
    case "invalidKeys":
      message +=
        'Could not set nested keys to local storage with key "' +
        metaData[0] +
        '" (dot notation format error @ "set()").\\n\\nThis probably occured due to handling an invalid key name in the dot notation path string, either while resolving it or while passing it as an argument to "set()", "reset()", or to configs.updateValueOnChange.\\n\\nInvalid key names are "undefined", "null", "[]", "{}" or an empty string.\\n\\nDot notation path string with errors:\\n\\n  > ' +
        metaData[1] +
        "\\n\\nConflicts at:\\n" +
        metaData[2] +
        "\\n"
      break
    case "invalidValue":
      message +=
        "Could not " +
        metaData[1] +
        " nested key " +
        metaData[3] +
        'of local storage with key "' +
        metaData[0] +
        '" (error @ "' +
        metaData[1] +
        '()", argument index ' +
        metaData[2] +
        ").\\n\\nThis happened because a nested key or value to JSON-stringify was invalid, possibly because of it being a function or an object with a circular reference.\\n"
      break
    default:
      message += "Unhandled error message."
  }
  console.error(message)
}

/**
 * Throws an Error, intentionally crashing the app.
 *
 * @param {object} errObj error object created by try-catch statement
 * @param {string} msgKey case for switch statement
 * @param {object} ErrorClass Error class to throw
 * @param {string|Array} metaData extra info used to construct the error message
 */
function _throwErr(errObj, msgKey, ErrorClass, metaData) {
  const errorAndStack = errObj ? "\\n\\n<-- Error and stack -->\\n\\n" + errObj : ""
  let message = "<useLocalStorage> "
  switch (msgKey) {
    case "mount":
      message +=
        'Invalid local storage key name "' +
        metaData +
        '". It must be a string and cannot be omitted.\\n\\nDid you forget to pass local storage key name when calling the hook?\\nThis hook accepts a config object as its only parameter. Pass local storage key name to its "key" property to initialize it.' +
        errorAndStack
      break
    default:
      message += "Unhandled error message."
  }
  throw new ErrorClass(message)
}`

export default plainCode
