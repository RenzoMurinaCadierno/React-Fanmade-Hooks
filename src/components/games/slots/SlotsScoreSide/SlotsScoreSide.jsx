import React from "react"
import { Slots } from "hub"
import { classes, slotsScoreSidePropTypes } from "./SlotsScoreSide.utils"

/**
 * Renders a side either for "slots" scores (apple, cherry, lemon, berry),
 * or for "stats" scores (star, heart).
 *
 * Each side consists of one '*SlotsScoreItem*' for each slot/stat item,
 * which renders their image, as well as one static and one badge effect
 * for each of plain object inside its `badgesProps`.
 *
 * @param {object} props
 *
 * `items` (Array) An array of sub-arrays, each sub-array containing one
 *   string for the slot/stat name, a path to its svg image and its alt.
 *   Each sub-array is used to render '*SlotsScoreItem*' children,
 *   that is, the images of each stat/score item.
 *
 * `badgesProps` (object): object with keys matching "slot"s names
 *   ("apple", "cherry", "lemon", "berry") or "stat"s names ("heart",
 *   "star"). Values for those keys must be one array containing from 1 to
 *   4 plain objects with props to pass to their static score badges in
 *   '*SlotsScoreItem*' (one badge will mount for each one of those plain
 *   objects).
 *
 * `propThatTriggersScoreEffect` (number|boolean) A value that
 *   '*SlotsScoreItem*' children, '*SlotsBadgeWithScoreAnimation*', will
 *   listen at to trigger the effect badge when a score is hit. Further
 *   explained in '*SlotsBadgeWithScoreAnimation*'.
 *
 * `badgeEffectImgSrcArray` (Array): array of sub-arrays, each sub-array
 *   used to  render "effect badge" '*img*' in
 *   '*SlotsBadgeWithScoreAnimation*', with is '*SlotsScoreItem*' children.
 *   Sub arrays shape:
 *   * (element 1) Slot/Stat name ("apple", "lemon", "star", "heart", ...)
 *   * (element 2) Slot/Stat path to svg file.
 *   * (element 3) Slot/Stat img "alt".
 *
 * `scoreData?` (object): Defined only if this component renders "slots"
 *   score side ("apple", "cherry", "lemon" and "berry" items). It is an
 *   object with keys matching the item's name (stated on previous
 *   parenthesis), and an object as their values, shape:
 *   * "1": <number>: quantity of "score" badges with "1" on its content,
 *   * "2": <number>: quantity of "score" badges with "2" on its content,
 *   * "3": <number>: quantity of "score" badges with "3" on its content,
 *   * "multiplier": <number> the multiplier to factor when a score is hit.
 *   Its shape and functionality is further explained in
 *     'slotsGame.reducer' and 'slotsGame.utils' in "../store" folder.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsScoreSide({
  items,
  badgesProps,
  propThatTriggersScoreEffect,
  badgeEffectImgSrcArray,
  scoreData = {},
  classNames = {}
}) {
  const [heartImgArr, starImgArr] = badgeEffectImgSrcArray
  return (
    <div className={classes.container(classNames.container)}>
      {/* each slot/stat static badges and their effect badges */}
      {items.map(([imgName, imgSrc, ImgAlt]) => (
        <Slots.ScoreItem
          key={imgName}
          name={imgName}
          // pass the array containing each individual badge's "props"
          badgesProps={badgesProps[imgName]}
          scoreMultiplier={scoreData[imgName]?.multiplier}
          propThatTriggersScoreEffect={propThatTriggersScoreEffect}
          badgeEffectImgArray={
            imgName === heartImgArr[0] // is "heart" string?
              ? heartImgArr // "heart" name-src-alt array
              : starImgArr // "star" name-src-alt array
          }
          classNames={classes.item(classNames.item)}
        >
          {/* slot/stat image */}
          <img
            src={imgSrc}
            alt={ImgAlt}
            // disable if each of its badge's content "prop" is false
            disabled={badgesProps[imgName].every((prop) => !prop.show)}
            className={classes.image(classNames.image)}
          />
        </Slots.ScoreItem>
      ))}
    </div>
  )
}

SlotsScoreSide.propTypes = slotsScoreSidePropTypes
