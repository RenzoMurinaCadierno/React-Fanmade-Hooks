import { Badge } from "hub"
import {
  classes,
  hookConfigs,
  slotsResultItemPropTypes
} from "./SlotsResultItem.utils"

/**
 * Renders a result item to display on '*SlotResultSection*'.
 *
 * It consists of the slot/stat image and a '*BadgeWithAnimatedNumber*'
 * to show its associated final score.
 *
 * If this component renders a result for a slot item ("apple", "cherry",
 * ...), then it also displays a '*figure*' with its multiplier value and
 * image.
 *
 * @param {object} props
 *
 * `badgeContent` (number): The number to display as content for
 *   '*BadgeWithAnimatedNumber*'. Correlates to each individual score for
 *   each obtained "slot" in game, the remaining "heart"(s) and total
 *   "star"(s). A falsy value for `badgeContent` disables the whole component.
 *
 * `imgSrc` (string): Path to svg image to render as "slot" or "stat" image.
 *
 * `imgAlt` (string): Alt for `imgSrc`.
 *
 * `multiplier?` (number): Defined only for "slot" items ("apple", "cherry",
 *   ...). It is the number '*BadgeWithAnimatedNumber*' content will be
 *   multiplied by for each "slot" item, to later be added to total "star"s.
 *   It is used by this component to generate the UI visuals for each
 *   "slot" item multiplier value.
 *
 * `multiplerImgSrc?` (string): Path to svg image to render as multiplier UI.
 *
 * `multiplerImgAlt?` (string): Alt for `multiplierImgSrc`.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsResultItem({
  badgeContent,
  imgSrc,
  imgAlt,
  multiplier,
  multiplierImgSrc,
  multiplierImgAlt,
  classNames = {}
}) {
  return (
    // wrapper component
    <figure
      disabled={!badgeContent}
      className={classes.container(classNames.container)}
    >
      {/* "slot" or "stat" UI image */}
      <img
        src={imgSrc}
        alt={imgAlt}
        className={classes.image(classNames.image)}
      />
      {/* '*Badge*' to show the content of the related "slot"/"stat" item */}
      <Badge.WithAnimatedNumber
        content={badgeContent}
        hookConfigs={hookConfigs}
        show
        size="smallest"
        fontVariant="h6"
        anchor="bottom-right-closest"
        classNames={classes.badge(classNames.badge)}
      />
      {/* "multiplier" UI visual image */}
      {multiplierImgSrc && (
        <figure
          className={classes.multiplierFigure(classNames.multiplierFigure)}
        >
          <img
            src={multiplierImgSrc}
            alt={multiplierImgAlt}
            className={classes.multiplierImage(classNames.multiplierImage)}
          />
          <figcaption>{multiplier ? "x" + multiplier : "✔️"}</figcaption>
        </figure>
      )}
    </figure>
  )
}

SlotsResultItem.propTypes = slotsResultItemPropTypes
