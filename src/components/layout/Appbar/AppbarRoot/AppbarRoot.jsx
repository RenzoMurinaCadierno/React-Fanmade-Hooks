import { useCallback, createContext } from "react"
import { Appbar, Modal, ExpandableIcon, useToggle } from "hub"
import home from "assets/icons/home.svg"
import { classes, appbarPropTypes } from "./AppbarRoot.utils"

// we will need to close the appbar once a link is clicked, but we cannot add
// link components here as they we intend to keep them independent of this
// component. So we will pass the toggler function as context for them to be
// used as a prop
export const appbarContext = createContext(() => {})

/**
 * Renders an "appbar toggler" icon at the top-left side of the screen. When
 * clicked, it shows a '*Modal*' component with each '*AppbarLink*' ordered by
 * '*AppbarSection*'s.
 *
 * It will also generate an '*InputField*' to filter the list of links.
 *
 * @param {object} props
 *
 * `children` (React.Node): anything React can render, though is is recommended
 *   to be an array of '*AppbarSection*'(s) or '*AppbarLink*'(s).
 *
 * `manualToggle?` (boolean): this component handles its own open/close appbar's
 *   *'Modal'* state when tapping on toggler, home icon and backdrop. If you
 *   wish to manually control that behavior, set this prop to true and use
 *   "toggleOpen" function from the exported context (which toggles *'Modal'*
 *   state when invoked).
 *
 * `onTogglerClick?` (function): callback triggered when clicking on navigation
 *   toggler.
 *
 * `onBackdropClick?` (function): callback triggered when clicking on backdrop.
 *
 * `onSearchChange?` (function): callback triggered each time search bar changes
 *   (when typing on it).
 *
 * `onHomeIconClick?` (function): callback triggered on "Home" icon click.
 *
 * `classNames?` (object): className strings for each JSX rendered here.
 *   Check utils.js for its constitution
 */
export default function AppbarRoot({
  children,
  manualToggle,
  onTogglerClick,
  onBackdropClick,
  onSearchChange,
  onHomeIconClick,
  classNames = {}
}) {
  const [isOpen, toggleOpen] = useToggle(false) // '*Modal*' "open" toggler

  const toggleModalAndTriggerCb = useCallback(
    (cb) => {
      !manualToggle && toggleOpen()
      cb?.()
    },
    [manualToggle, toggleOpen]
  )

  const handleHomeIconClick = useCallback(() => {
    toggleModalAndTriggerCb(onHomeIconClick)
  }, [onHomeIconClick, toggleModalAndTriggerCb])

  const handleBackdropClick = useCallback(() => {
    toggleModalAndTriggerCb(onBackdropClick)
  }, [onBackdropClick, toggleModalAndTriggerCb])

  const handleTogglerClick = useCallback(() => {
    toggleModalAndTriggerCb(onTogglerClick)
  }, [onTogglerClick, toggleModalAndTriggerCb])

  return (
    <header className={classes.container(isOpen, classNames.container)}>
      {/* '3-dotted' toggler rendered top-left of the screen */}
      <Appbar.Toggler
        isActive={isOpen}
        onClick={handleTogglerClick}
        classNames={classes.toggler(classNames.toggler)}
      />
      {/* modal triggered by toggler. Renders all nav-related content */}
      <Modal
        open={isOpen}
        onBackdropClick={handleBackdropClick}
        scrollable={false} // content should scroll, not '*Modal*' itself
        classNames={classes.modal(classNames.modal)}
      >
        <div className={classes.content(classNames.content)}>
          {/* Home ('/') icon, links back to '*HomePage*' */}
          <ExpandableIcon
            type="secondary"
            icon={<img src={home} alt="home" />}
            expand={false}
            onClick={handleHomeIconClick}
            classNames={classes.homeIcon(classNames.homeIcon)}
          />
          {/* searchbar. Filters hook names */}
          <Appbar.Searchbar
            onChange={onSearchChange}
            classNames={classes.searchbar(classNames.searchbar)}
          />
          {/* children: links to hooks inside their proper categories */}
          <Appbar.context.Provider value={toggleOpen}>
            {children}
          </Appbar.context.Provider>
        </div>
      </Modal>
    </header>
  )
}

AppbarRoot.propTypes = appbarPropTypes
