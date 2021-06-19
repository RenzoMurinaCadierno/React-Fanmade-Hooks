import { Suspense, lazy } from "react"
import { Switch, Route } from "react-router-dom"
import { Spinner } from "hub"
import { capitalize, slugify } from "utils/utilityFunctions"
import configs from "app.configs.json"

/**
 * Renders a react-router-dom's '*Switch*', which wraps routes to:
 * * Home ('/').
 * * Hook examples' pages, slugified ('/use-count', '/use-re-render').
 * * 404 (none of the above)
 */
export default function Router() {
  // create lazy imports for non-demo files to route (home and error pages)
  const HomePage = lazy(() =>
    import("components/app-specific/nav/pages/HomePage/HomePage")
  )
  const _404Page = lazy(() =>
    import("components/app-specific/nav/pages/_404Page/_404Page")
  )

  // reduce hook names inside all categories into an array containing a
  // '*Route*' element for each hook with its pathname in slug form and its
  // lazy-imported Demo file as as the component to render
  const routesToHookDemos = Object.values(configs.appbarItems).reduce(
    (acc, hooksInCategory) => [
      ...acc,
      ...hooksInCategory.map((hookName) => (
        <Route
          key={hookName}
          exact
          path={"/" + slugify(hookName)}
          component={lazy(() =>
            import(`hooks/${hookName}/demo/${capitalize(hookName, true)}`)
          )}
        />
      ))
    ],
    []
  )

  // return the switch for all routes, with '*Spinner*' as loading fallback
  return (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path="/" component={HomePage} /> {/* Home */}
        {routesToHookDemos} {/* Routes to all Hook Demo pages */}
        <Route component={_404Page} /> {/* 404 route */}
      </Switch>
    </Suspense>
  )
}
