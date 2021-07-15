import { Suspense } from "react"
import { Switch, Route } from "react-router-dom"
import { Spinner } from "hub"
import { slugify } from "utils/utilityFunctions"
import { lazyWithPreload } from "./Router.utils"
import configs from "app.configs.json"

/**
 * Renders a react-router-dom's '*Switch*', which wraps preloaded routes to:
 * * Home ('/').
 * * Hook examples' pages, slugified ('/use-count', '/use-re-render').
 * * 404 (none of the above)
 */
export default function Router() {
  // create lazy imports for non-demo files to route (home and error pages)
  const HomePage = lazyWithPreload({
    importStatement: () => import("../pages/HomePage/HomePage"),
    preload: true
  })
  const _404Page = lazyWithPreload({
    importStatement: () => import("../pages/_404Page/_404Page"),
    preload: true
  })

  // reduce hook names inside all categories into an array containing a
  // '*Route*' element for each hook with its pathname in slug form and its
  // lazy-imported (already preloaded) Demo file as as the component to render
  const routesToHookDemos = Object.values(configs.appbarItems).reduce(
    (acc, hooksInCategory) => [
      ...acc,
      ...hooksInCategory.map((hookName) => {
        const pascalCaseHookName = hookName[0].toUpperCase() + hookName.slice(1)

        return (
          <Route
            key={hookName}
            exact
            path={"/" + slugify(hookName)}
            component={lazyWithPreload({
              importStatement: () =>
                import(`hooks/${hookName}/demo/${pascalCaseHookName}`),
              preload: true
            })}
          />
        )
      })
    ],
    []
  )

  // return the switch for all routes, with '*Spinner*' as loading fallback
  return (
    <Suspense fallback={<Spinner size="lg" />}>
      {/* <button onClick={() => setA((a) => !a)}>asdd </button> */}
      <Switch>
        <Route exact path="/" component={HomePage} /> {/* Home */}
        {routesToHookDemos} {/* Routes to all Hook Demo pages */}
        <Route component={_404Page} /> {/* 404 route */}
      </Switch>
    </Suspense>
  )
}
