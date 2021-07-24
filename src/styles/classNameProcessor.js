export default class classNameProcessor {
  /**
   * Returns `className` if it is defined, `fallback` otherwise.
   *
   * @param {string} className The className to return.
   *
   * @param {string} fallback Return value if `className` is undefined.
   * * Defaults to an empty string.
   */
  static get = (className, fallback = "") =>
    className ? " " + className : fallback

  /**
   * Returns `innerClassName` joined with `incomingClassName`.
   *
   * If `incomingClassName` is undefined, `fallback` is used in its place.
   *
   * @param {string} innerClassName Element's default className.
   *
   * @param {string} incomingClassName className passed by component's
   *   `props`.
   *
   * @param {string} fallback className used in place of `incomingClassName`
   *   if this one is undefined.
   * * Defaults to an empty string.
   */
  static default = (innerClassName, incomingClassName, fallback) =>
    innerClassName + this.get(incomingClassName, fallback)

  /**
   * Returns `className` if `condition` is truthy, `fallback` otherwise.
   *
   * @param {string} className The className to return.
   *
   * @param {boolean} condition `true` returns `className`, `false` gets
   *   `fallback`.
   *
   * @param {string} fallback Return value if `condition` is `false`.
   * * Defaults to an empty string.
   */
  static if = (condition, className, fallback = "") =>
    condition ? " " + className : fallback

  /**
   * Returns `classNameTrue` if `condition` is truthy, or `classNameTwo`
   *   otherwise.
   *
   * @param {string} classNameTrue The className to return on
   *   `condition === true`.
   *
   * @param {string} classNameFalse The className to return on
   *   `condition === false`.
   *
   * @param {boolean} condition `true` returns `classNameTrue`, while `false` gets
   *   `classNameFalse`.
   */
  static or = (condition, classNameTrue, classNameFalse) =>
    condition ? " " + classNameTrue : " " + classNameFalse

  /**
   * Joins `classNames` strings with a single empty space
   *
   * @param  {...string} classNames classNames to join
   */
  static join = (...classNames) => classNames.join(" ")

  /**
   * Iterates over each array of `[condition<boolean>, className<string>]`
   *   passed in `...condCNArrays` and when it finds the first `true` in
   *   condition, it returns its associated `className`.
   *
   * If no condition is `true`, it returns an empty string.
   *
   * @param  {...any} condCNArrays Arrays shaped:
   *   * `elem 0` (boolean): If it evaluates to `true`, `elem 1` is returned
   *     and iteration finishes.
   *   * `elem 1` (string): className associated to `elem 0`.
   */
  static switch = (...condCNArrays) => {
    for (const [condition, className] of condCNArrays) {
      if (condition) return " " + className
    }
    return ""
  }
}
