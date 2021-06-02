import { Container, Progressbar } from "hub"
import { classes, countBarPropTypes, getHelpers } from "./CountBar.utils"

/**
 * Renders two button-like '*div*'s as count controllers (increase and
 * decrease) and a '*Progressbar*' representing the count state
 * between them.
 *
 * This component is mostly used as an example at '*UseCount*'.
 *
 * @param {object} props
 *
 * `value` (number): current count state. Correlates to '*Progressbar*'s
 *   `value`.
 *
 * `min?` (number): '*Progressbar*'s `min`. Defaults to 0.
 *
 * `max?` (number): '*Progressbar*'s `max`. Defaults to 100.
 *
 * `step?` (number): current count step state. Defaults to 1.
 *
 * `addText?` (string): text to render on right-sided button-like '*div*'.
 *   Defaults to "+1".
 *
 * `subText?` (string): text to render on left-sided button-like '*div*'.
 *   Defaults to "-1".
 *
 * `progressText?` (string): '*Progressbar*'s `text`.
 *
 * `disableButtons?` (boolean): manual "disabled" property to append to "sub"
 *   and "add" button-like '*div*'s. If falsy, they will be automatically
 *   disabled when `value` exceeds their respective limits (`min` or `max`).
 *
 * `disableProgressbar?` (boolean): manual "disabled" property for
 *   '*Progressbar*'.
 *
 * `onAdd?` (function): callback triggered on right-sided button-like '*div*'
 *   click (add count).
 *
 * `onSub?` (function): callback triggered on left-sided button-like '*div*'
 *   click (substract count).
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function CountBar({
  value,
  min = 0,
  max = 100,
  step = 1,
  addText = "+1",
  subText = "-1",
  progressText,
  disableButtons,
  disableProgressbar,
  onAdd,
  onSub,
  classNames = {},
  ...otherProgressProps
}) {
  const [canAdd, canSub, exceededValue] = getHelpers(value, min, max)

  return (
    <Container className={classes.container(classNames.container)}>
      {/* "substract" button-like '*div*' */}
      <div
        role="button"
        disabled={disableButtons || !canSub}
        onClick={canSub ? onSub : null}
        className={classes.minusButton(classNames.minusButton)}
      >
        {subText}
      </div>
      {/* progressbar */}
      <Progressbar
        value={value}
        min={min}
        disabled={disableProgressbar}
        max={max}
        text={progressText}
        unit={exceededValue}
        classNames={classes.progressbar(classNames?.progressbar)}
        {...otherProgressProps}
      />
      {/* "add" button-like '*div*' */}
      <div
        role="button"
        disabled={disableButtons || !canAdd}
        onClick={canAdd ? onAdd : null}
        className={classes.plusButton(classNames.plusButton)}
      >
        {addText}
      </div>
    </Container>
  )
}

CountBar.propTypes = countBarPropTypes
