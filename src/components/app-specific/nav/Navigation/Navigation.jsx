import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import { Appbar } from "hub"
import { slugify } from "utils/utilityFunctions"
import {
  defaultCategories,
  getActiveCategoriesAndHooks
} from "./Navigation.utils"

/**
 * Renders this App's '*header*', which consists of a toggler that triggers
 * a modal with all '*nav*' links to hook examples' pages, separated by their
 * respective sections.
 *
 * Related components: '*Appbar*', '*AppbarSection*' and '*AppbarLink*'.
 */
export default function Navigation() {
  // state object for categories and its hooks, and their "isActive" booleans
  const [categories, setCategories] = useState(defaultCategories)
  // react-router-dom "history" object
  const history = useHistory()

  const handleSearch = useCallback(
    (e) => {
      // on an empty search or on modal opening, "e.target.value" is falsy, so
      // set default state (all categories)
      if (!e?.target?.value) return setCategories(defaultCategories)
      // any other case is a valid search, filter the object and set all
      // matching hooks links' "active" state to true
      setCategories(getActiveCategoriesAndHooks(e.target.value))
    },
    [setCategories]
  )

  /* eslint-disable react-hooks/exhaustive-deps */
  const goToHomeUrl = useCallback(() => history.push("/"), [])

  /* eslint-disable react-hooks/exhaustive-deps */
  const goToHookUrl = useCallback((hookName, closeAppbar) => {
    closeAppbar()
    history.push(slugify(hookName))
  }, [])

  return (
    <Appbar
      onTogglerClick={handleSearch}
      onHomeIconClick={goToHomeUrl}
      onSearchChange={handleSearch}
    >
      {/* links will need to close '*AppBar*'. Grab handler from context */}
      <Appbar.context.Consumer>
        {(toggleAppbar) =>
          /* map defaultCategories' array (check *utils.js* for it) */
          Object.entries(categories).map(
            ([
              categoryName,
              [isCategoryActive, hookNameAndIsHookActiveArr]
            ]) => (
              /* render one '*Appbar.Section*' for each category */
              <Appbar.Section
                key={categoryName}
                title={categoryName}
                isActive={isCategoryActive}
              >
                {hookNameAndIsHookActiveArr.map(([hookName, isHookActive]) => (
                  /* each section with an '*Appbar.Link*' for each hook name */
                  <Appbar.Link
                    key={hookName}
                    isActive={isHookActive}
                    onClick={() => goToHookUrl(hookName, toggleAppbar)}
                  >
                    {hookName}
                  </Appbar.Link>
                ))}
              </Appbar.Section>
            )
          )
        }
      </Appbar.context.Consumer>
    </Appbar>
  )
}