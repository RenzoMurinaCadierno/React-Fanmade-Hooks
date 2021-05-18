import PropTypes from "prop-types"
import React from "react"
import styles from "./PlayingCard.module.css"

export const classes = {
  container: (onClick, className) =>
    (className ?? "") +
    " " +
    (onClick ? styles.Clickable : "") +
    " " +
    styles.Container,
  suit: (suit, reverse, className) =>
    (className ?? "") +
    " " +
    (suit ? styles[suit] : "") +
    " " +
    (reverse ? styles.Reverse : "") +
    " " +
    styles.Suit
}

export const playingCardPropTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  suit: validateStringOrImgElem,
  isPokerCard: PropTypes.bool,
  onClick: PropTypes.func,
  classNames: PropTypes.shape({
    container: PropTypes.string,
    suit: PropTypes.string
  })
}

function validateStringOrImgElem(props, propName, cmpName) {
  // undefined fails silently (otherwise, first render will always throw error)
  if (!props[propName] || props[propName]?.type === "undefined") return
  // if the prop is not a React element, it must be a plain string
  if (typeof props[propName] !== "string" && !props[propName].type) {
    return throwTypeError(propName, props[propName], cmpName)
    // otherwise, it must be an <img /> JSX
  } else if (props[propName].type && props[propName].type !== "img") {
    return throwTypeError(propName, props[propName].type, cmpName, true)
  }
}

function throwTypeError(propName, targetPropType, cmpName, isJSX) {
  return new TypeError(
    `Invalid prop "${propName}" of type ${
      isJSX
        ? `React.node \`${targetPropType}\``
        : `\`${typeof targetPropType}\` with value \`${targetPropType}\``
    } supplied to "${cmpName}". Expected \`string\` or React Element type \`img\`.`
  )
}

/**
 * Returns the first two characters of `value`. If `isPokerCard` is true, it
 * will return "A", "J", "Q" and "K" for `value`s "1", "11", "12" and "13",
 * respectively.
 *
 * @param {string} value The string to return their first two characters.
 * @param {boolean} isPokerCard True will convert "1", "11", "12" and "13" to
 *   "A", "J", "Q" and "K", respectively.
 */
export function getFormattedValue(value, isPokerCard) {
  // safeguard. if the value is a number, we convert it to string
  const stringVal = value.toString()
  // we make sure that the value to be displayed on the card is
  // no longer than two characters
  const twoCharsValue = stringVal.length > 2 ? stringVal.slice(0, 2) : stringVal
  // poker cards use A, J, Q, K for some values. Switch to them if needed
  if (isPokerCard) {
    switch (twoCharsValue) {
      case "1":
        return "A"
      case "11":
        return "J"
      case "12":
        return "Q"
      case "13":
        return "K"
      default:
        return twoCharsValue
    }
  }
  // if it is not a poker card, just return the 1-or-2 char value
  return twoCharsValue
}

/**
 * Given a string value or '*img*' JSX, it returns an array where the first
 * element is the 'suit' className to append to top-left and bottom-right
 * 'suit' '*div*'s, and the second element, the JSX to render.
 * @param {string | React.Element} suitStringOrImgJsx String or '*img*' to
 *   render as 'suit' value.
 * > * If "s", "spades", "d", "diamonds", "h", "hearts", "c", "clubs", "j" or
 *      "joker" are passed as string values while `isPokerCard` is true, the
 *      resulting className will be "s", "d", "h", "c" or "j", and string JSX
 *      to render "♠️", "♦️", "♥️", "♣️", "J", respectively.
 * > * If `isPokerCard` is true but passed string values do not match the ones
 *      stated before, className will be 'string-suit' and JSX to render will
 *      be the first character of the string JSX.
 * > * If `isPokerCard` is true but passed JSX to render is an image, className
 *      will be 'string-suit' and JSX to render will be used as is.
 * > * If `isPokerCard` is false and passed JSX is a string, className will be
 *      'string-suit' and JSX to render will be the first character of the
 *      string JSX.
 * > * If `isPokerCard` is false and passed JSX is an '*img*', className will
 *      be "" (empty string), and that same '*img*' as JSX to render.
 *
 * @param {boolean} isPokerCard Manipulates outcome cases stated in
 *   `suitStringOrImgJsx`.
 *
 * @returns {Array} Shape:
 * > * [
 * > * * (string) classNameToAppend to 'suit' '*div*'s
 * > * * (string | React.Element) suit string or '*img*' to render as JSX
 * > * ]
 */
export function getSuitCNandCharOrJSX(suitStringOrImgJsx, isPokerCard) {
  // if we passed a string as a suit
  if (typeof suitStringOrImgJsx === "string") {
    // if the card we are dealing with is a poker one
    if (isPokerCard) {
      // get its suit as a lowercased string
      switch (suitStringOrImgJsx.toLowerCase()) {
        case "s":
        case "spade":
        case "spades":
          // first value is the className, second is what's to be rendered
          return ["s", "♠️"]

        case "c":
        case "club":
        case "clubs":
          return ["c", "♣️"]

        case "d":
        case "diamond":
        case "diamonds":
          return ["d", "♦️"]

        case "h":
        case "heart":
        case "hearts":
          return ["h", "♥️"]

        case "j":
        case "joker":
          return ["j", "J"]

        default:
          // "string-suit" is the generic className for "suit" props passed as
          // string and the first char is the string to be rendered in the JSX
          return ["string-suit", suitStringOrImgJsx[0]]
      }
    }
    // we are not passing a poker card but the suit is a string.
    // So, apply the same logic as "default" case above
    return ["string-suit", suitStringOrImgJsx[0]]
  }
  // we are passing JSX to render as a suit (an '*img*' for example).
  // It will have no className as it will be handled with a universal
  // "*" selector in the *.module.css* file.
  // And pass the JSX as is to be rendered
  return ["", suitStringOrImgJsx]
}
