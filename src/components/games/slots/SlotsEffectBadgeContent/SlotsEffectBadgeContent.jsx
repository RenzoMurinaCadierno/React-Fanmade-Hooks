import React from "react"
import {
  classes,
  slotsEffectBadgeContentPropTypes
} from "./SlotsEffectBadgeContent.utils"

/**
 * Returns the JSX used at '*Badge*' `content` prop in
 *   '*SlotsBadgeWithScoreAnimation*' (its parent).
 *
 * This component renders a "heart" image for "lives" (heart) badge, and a
 *   star for "star" and all "slots" badges. The value for each individual
 *   badge is render here too, as a *'span'*
 *
 * @param {object} props
 *
 * `content` (number): The numeric value to display in
 *   '*SlotsBadgeWithScoreAnimation*' `content`.
 *
 * `src` (string): Path to an svg image source to render as image alongside
 *   the numeric content ("heart" or "star" images).
 *
 * `alt` (string): Alt for that image.
 *
 * `type` (string): Either "primary" or "secondary". The color and shadow
 *   theme on this app, applied to this whole component.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function SlotsEffectBadgeContent({
  content,
  src,
  alt,
  type,
  classNames = {}
}) {
  return (
    <div className={classes.container(type, classNames.container)}>
      <span className={classes.content(classNames.content)}> {content} </span>
      <img
        src={src}
        alt={alt ?? "⭐"}
        className={classes.image(classNames.image)}
      />
    </div>
  )
}

SlotsEffectBadgeContent.propTypes = slotsEffectBadgeContentPropTypes
