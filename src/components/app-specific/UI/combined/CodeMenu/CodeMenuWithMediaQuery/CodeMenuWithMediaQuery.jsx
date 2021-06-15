import { useMediaQuery, CodeMenu } from "hub"
import {
  getAnchor,
  defaultProps,
  propTypes
} from "./CodeMenuWithMediaQuery.utils"

/**
 * Renders a '*CodeMenu*', whose inner '*ExpandableMenu*' `anchor` is controlled
 * by "useMediaQuery" hook.
 *
 * @param {object} props
 *
 * `useMediaQueryArgs?` (Array!): Arguments to pass to "useMediaQuery" hook.
 * > **Note:** It must be an array. Otherwise, hook will crash the app.
 *
 * `mqToAnchor?` (object): An object with:
 * * One or many keys matching "useMediaQuery" `customQueries` (if set in
 *   `useMediaQueryArgs`) and/or "useMediaQuery" `defaultQueries`.
 *   * Examples: "pt", "sm", "md", "lg".
 *
 * * Values for those keys are strings matching the desired '*ExpandableMenu*'
 *   `anchor` to be set for media queries when they match.
 *   * Examples: "bottom-right", "top-left", "center".
 *
 * * Accepts a 'default' key to be used when no current media queries match the
 *   ones stated.
 *   * Example: {...otherKVPairs, default: "top-right" }
 *
 * ```javascript
 *   // Example 1
 *
 *   mqToAnchor = {
 *     pt: "top-right", lg: "center", default: "bottom-left"
 *   }
 *
 *   // Anchors '*CodeIcon*' to:
 *   // > the top-right of the screen when media query matches
 *   //   "screen and (orientation: portrait)".
 *   // > the center of the screen when media query matches
 *   //   "(min-width: 992px).
 *   // > the bottom-left of the screen when media query does
 *   //   not match other keys in `mqToAnchor`.
 *   // *********************************************************
 * ```
 *
 * ```javascript
 *   // Example 2
 *
 *   useMediaQueryArgs = [{ width1234: "(min-width: 1234px)" }]
 *   mqToAnchor = { width1234: "center", default: "bottom-left" }
 *
 *   // Anchors '*CodeIcon*' to:
 *   // > the center of the screen when media query matches
 *   //   "(min-width: 1234px)".
 *   // > the bottom-left of the screen otherwise.
 * ```
 *
 * > **Warning!** Keys stated first will take precedence, as only one `anchor`
 *   can be set at a time. If any other media query keys coming after a matching
 *   one match too, they will be ignored.
 *
 * ```javascript
 *   // Precedence overriding example:
 *
 *   mqToAnchor = { sm: "center", md: "bottom-left" }
 *
 *   // Anchors '*CodeIcon*' to the center of the screen when
 *   // media query matches "(min-width: 600px)". Even if
 *   // "(min-width: 768px)" matches, "sm" will override it.
 * ```
 *
 * `...codeMenuProps?` (object): Props to spread in '*CodeMenu*'.
 */
export default function CodeMenuWithMediaQuery({
  useMediaQueryArgs,
  mqToAnchor,
  ...codeMenuProps
}) {
  const [mq] = useMediaQuery(...useMediaQueryArgs)

  return <CodeMenu anchor={getAnchor(mq, mqToAnchor)} {...codeMenuProps} />
}

CodeMenuWithMediaQuery.defaultProps = defaultProps
CodeMenuWithMediaQuery.propTypes = propTypes
