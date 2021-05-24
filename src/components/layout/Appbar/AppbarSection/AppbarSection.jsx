import React, { useState, useEffect, useCallback } from "react"
import { classes, appbarSectionPropTypes, index } from "./AppbarSection.utils"

/**
 * Renders the outer wrapper container, section title and inner wrapper
 * container for '*AppbarLink*' components. It also handles its state and
 * animations (mounting and showing/hiding its content).
 *
 * It is invoked by '*Appbar*' in order to display each section in the hooks
 * examples' selection shown when tapping on the top-left navbar toggler of the
 * app.
 *
 * @param {object} props
 *
 * `children` (React.Node | React.Node[]): instances of '*AppbarLink*' only.
 *
 * `isActive` (boolean): true will apply "active" styling, enlarging its
 *   height to show all of its '*AppbarLink*' children. Toggles to true when
 *   tapping on this component, and to false when blurring out of it.
 *
 * `title?` (string): the section's title. Defaults to "Title".
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check *utils.js* for its constitution.
 */
export default function AppbarSection({
  children,
  isActive,
  title = "Title",
  classNames = {},
  ...otherProps
}) {
  const [st, setSt] = useState({
    showContainer: false, // controls displaying UI for the whole component
    showContent: false // controls displaying this component's children
  })

  const handleClick = useCallback(
    // show children
    () => setSt((prevSt) => ({ ...prevSt, showContent: true })),
    [setSt]
  )

  const handleBlur = useCallback(
    // hide children
    () => setSt((prevSt) => ({ ...prevSt, showContent: false })),
    [setSt]
  )

  useEffect(() => {
    // get the next index number (increases by one for each '*AppbarSection*')
    const nextIdx = index.get()
    // indexes are here to add (50 * indexNumber) to timeout, which renders the
    // whole '*AppbarSection*'. This makes all sections appear sequentially,
    // for looks
    const showTimeout = setTimeout(() => {
      setSt((prevSt) => ({ ...prevSt, showContainer: true }))
    }, 150 + nextIdx * 50)
    return () => {
      // unmounting clears timeout and sets the global index variable to 0
      clearTimeout(showTimeout)
      index.reset()
    }
  }, [setSt])

  useEffect(() => {
    // if a searchbar filter was applied and a child in this category becomes
    // active in consequence, this category automatically becomes active (which
    // shows its children). Otherwise, it hides itself.
    if (isActive) handleClick()
    else handleBlur()
  }, [isActive, handleClick, handleBlur])

  return (
    <div
      tabIndex={1}
      onClick={handleClick}
      // do not hide (by blurring) if one or more children are active
      onBlur={isActive ? null : handleBlur}
      className={classes.container(classNames.container, st.showContainer)}
      {...otherProps}
    >
      <div className={classes.title(classNames.title)}>{title}</div>
      <div className={classes.content(classNames.content, st.showContent)}>
        {children}
      </div>
    </div>
  )
}

AppbarSection.propTypes = appbarSectionPropTypes
