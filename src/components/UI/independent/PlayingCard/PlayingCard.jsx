import {
  classes,
  playingCardPropTypes,
  getFormattedValue,
  getSuitCNandCharOrJSX
} from "./PlayingCard.utils"

/**
 * Renders a 'Playing Card' UI. It defaults to a Poker card, where `suit` and
 * `value` are controllable by props.
 *
 * You can also render a string or an '*img*' element as `suit`, and any string
 * as a `value`, effectively creating a custom card of any kind.
 *
 * @param {object} props
 *
 * `value` (string | number): A 2-character string or number to render at the
 *   center of the card.
 *
 * `suit` (string | React.element): either:
 * * (string) One of "j", "joker", "s", "spade", "c", "club", "d", "diamond",
 *     "h" or "heart". They will render the respective '*img*' for those suits
 *     at the top-right and bottom-left of the card if `isPokerCard` is true.
 * * (string) A 2-character string to render instead of an '*img*' as above.
 *     You can use the above strings as plain ones if `isPokerCard` is false.
 *     Mind that they must still be 2 characters long.
 * * (React.Element) Only type '*img*'. The image to render as suit.
 *
 * `isPokerCard?` (boolean): true will make the first "string" case in `suit` to
 *   render the respective suit's default images. False will use the plain
 *   strings instead. Defaults to false.
 *
 * `onClick?` (function): callback to trigger upon clicking on this component.
 *
 * `classNames?` (object): className strings for all JSXs rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function PlayingCard({
  value,
  suit,
  isPokerCard,
  onClick,
  classNames = {},
  ...otherProps
}) {
  const [defaultSuitCN, suitStrOrJSX] = getSuitCNandCharOrJSX(suit, isPokerCard)

  return (
    <div
      onClick={onClick}
      className={classes.container(onClick, classNames?.container)}
      {...otherProps}
    >
      <div className={classes.suit(defaultSuitCN, false, classNames?.suit)}>
        {suitStrOrJSX}
      </div>
      {getFormattedValue(value, isPokerCard)}
      <div className={classes.suit(defaultSuitCN, true, classNames?.suit)}>
        {suitStrOrJSX}
      </div>
    </div>
  )
}

PlayingCard.propTypes = playingCardPropTypes
