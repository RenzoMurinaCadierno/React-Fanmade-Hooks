import { useCallback, createContext } from "react"
import { Modal, InputField, ExpandableIcon, useToggle } from "hub"
import home from "assets/icons/home.svg"
import search from "assets/icons/search.svg"
import { classes, appbarPropTypes } from "./Appbar.utils"
import AppbarLink from "components/layout/independent/AppbarLink/AppbarLink"
import AppbarSection from "components/layout/independent/AppbarSection/AppbarSection"

// we will need to close the appbar once a link is clicked, but we cannot add
// link components here as they we intend to keep them independent of this
// component. So we will pass the toggler function as context for them to be
// used as a prop
export const appbarContext = createContext(() => {})

// Namespace for all related components
Appbar.Section = AppbarSection
Appbar.Link = AppbarLink
Appbar.context = appbarContext

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
 *   "toggleOpen" function from the exported context (which toggles *'Modal'* state when invoked).
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
function Appbar({
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
      {/* Wrapper for toggler, keeps styles consistent */}
      <div onClick={handleTogglerClick} className={classes.togglerWrapper}>
        {/* The 3 dots as a '*div*', ::before and ::after */}
        <div className={classes.toggler(isOpen, classNames.toggler)} />
      </div>
      <Modal
        open={isOpen}
        onBackdropClick={handleBackdropClick}
        scrollable={false} // modalContent should scroll, not '*Modal*' itself
        classNames={classes.navModal(classNames.navModal)}
      >
        <div className={classes.modalContent(classNames.modalContent)}>
          <ExpandableIcon // Home ("/") icon
            type="secondary"
            icon={<img src={home} alt="home" />}
            expand={false}
            onClick={handleHomeIconClick}
            classNames={classes.homeIcon(classNames.homeIcon)}
          />
          {/* search bar */}
          <div className={classes.searchContainer(classNames.searchContainer)}>
            <img
              src={search} // magnifying glass icon
              alt="search"
              className={classes.searchIcon(classNames.searchIcon)}
            />
            <InputField // search input field
              label="Search"
              onChange={onSearchChange}
              classNames={classes.inputField(classNames.inputField)}
            />
          </div>
          {/* children: links to hooks inside their proper categories */}
          <Appbar.context.Provider value={toggleOpen}>
            {children}
          </Appbar.context.Provider>
        </div>
      </Modal>
    </header>
  )
}

Appbar.propTypes = appbarPropTypes

export default Appbar
