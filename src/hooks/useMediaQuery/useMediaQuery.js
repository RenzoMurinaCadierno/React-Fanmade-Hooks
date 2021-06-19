import { useRef, useEffect, useCallback, useState } from "react"

/**
 * Default responsive design media queries
 */
const defaultQueries = {
  xs: "(max-width: 600px)",
  sm: "(min-width: 600px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  pt: "screen and (orientation: portrait)"
}

/**
 * Tracks stated media queries, re-rendering each time one of them changes.
 *
 * By default it applies regular bootstrap rules, but also accepts any custom
 * media queries you specify.
 *
 * Default rules are:
 * > * xs: "(max-width: 600px)",
 * > * sm: "(min-width: 600px)",
 * > * md: "(min-width: 768px)",
 * > * lg: "(min-width: 992px)",
 * > * xl: "(min-width: 1200px)",
 * > * pt: "screen and (orientation: portrait)"
 *
 * @param {object?} customQueries An object with custom key names to represent
 *   the media queries to state, and values as media queries strings to test
 *   for.
 * * E.g.: { w500: "(min-width: 500px)", dark: "(prefers-color-scheme: dark)" }
 *
 * @param {boolean?} combineWithDefault This component adds default bootstrap
 *   media query rules. True will combine `customQueries` with those ones in
 *   the global object. False will only use `customQueries`.
 *
 * @param {number?} delay The delay for query match state to update when
 *   media query listener triggers, in milliseconds. Defaults to 100.
 * > **Warning:** Low values cause more re-renders. Keep this in mind when
 *   considering performance.
 *
 * @returns {Array} An array with:
 * * `elem 0` (object): all stated media query keys, each with a boolean value
 *   indicating if they currently match.
 * * `elem 1` (object): all stated media query keys, each with the media query
 *   match rule as a string.
 *
 * @author Renzo Nahuel Murina Cadierno <nmcadierno@gmail.com>
 */
export default function useMediaQuery(
  customQueries,
  combineWithDefault,
  delay = 100
) {
  // generate the queries object. It will either be: (1) the defaults if
  // `customQueries` is undefined, (2) only `customQueries` if they are not
  // fused with defaults, or the combination between defaults and `customQueries`
  // if `combineWithDefault` is true
  const queryRules = useRef(
    customQueries && Object.keys(customQueries).length
      ? combineWithDefault
        ? { ...defaultQueries, ...customQueries }
        : customQueries
      : defaultQueries
  )
  // will generate an object where keys are the same as "queryRules" ("xs",
  // "md", "customName", ...), and their values as their "window.matchMedia"
  // executions on their assigned media query rule strings.
  const fixedMatchMedia = useRef(
    Object.entries(queryRules.current).reduce(
      (acc, entry) => ({ ...acc, [entry[0]]: window.matchMedia(entry[1]) }),
      {}
    )
  )
  // timeout to recalculate media queries when resizing.
  // We need to keep timeout reference outside, as we cannot clear it if
  // a new resize event occurs that overrides a previous one. We could do
  // it if we were in an useEffect, since we can clean it with its return,
  // but "updateMQs" is an outer function, so we appeal to this.
  const timeout = useRef(0)
  // this state holds current matching state for each query, in the form of
  // { "queryKey": boolean }. E.g.: { "xs": true, "pt": false, "custom": true }.
  // This is technically not needed, but since we must re-render the component
  // to refresh matching queries, we might as well give a good use to setState
  const [queryMatchSt, setQueryMatchSt] = useState({})

  const updateMQs = useCallback(() => {
    // if there was a timeout for a previous resize, clear it
    if (timeout.current) clearTimeout(timeout.current)
    // set a timeout to update "queryMatchSt" with the new matching queries
    // object
    timeout.current = setTimeout(() => {
      setQueryMatchSt(() =>
        Object.entries(fixedMatchMedia.current).reduce(
          (acc, entry) => ({ ...acc, [entry[0]]: entry[1].matches }),
          {}
        )
      )
    }, delay || 0) // use `delay` as timeout or event-queue the change immediately
  }, [setQueryMatchSt, delay])

  useEffect(() => {
    // on mount, add the event listener to "window". Since we accept custom
    // queries, each object would be different from the other, so accept all
    window.addEventListener("resize", updateMQs)
    // trigger a component re-render to adapt queries on mount
    updateMQs()
    // and remove the event listener when unmounting to avoid memory leaks
    return () => window.removeEventListener("resize", updateMQs)
  }, [updateMQs])

  return [queryMatchSt, queryRules.current]
}
