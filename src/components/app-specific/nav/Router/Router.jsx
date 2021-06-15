import { Switch, Route } from "react-router-dom"
import * as hubExports from "hub"
import { capitalize, slugify } from "utils/utilityFunctions"
import configs from "app.configs.json"

/**
 * Renders a react-router-dom's '*Switch*', which wraps routes to:
 * * Home ('/').
 * * Hook examples' pages, slugified ('/use-count', '/use-re-render').
 * * 404 (none of the above)
 */
export default function Router() {
  // reduce all hook names inside all categories into an array containing a
  // '*Route*' element for each hook with its name in slug form as path and its
  // Demo as the component to render
  const routesToHookDemos = Object.values(configs.appbarItems).reduce(
    (acc, hooksInCategory) => [
      ...acc,
      ...hooksInCategory.map((hookName) => {
        const HookDemoComponent = hubExports[capitalize(hookName, true)]
        return (
          <Route
            key={hookName}
            exact
            path={"/" + slugify(hookName)}
            component={HookDemoComponent}
          />
        )
      })
    ],
    []
  )
  test copy code, suspense/lazy then react17 pwa

  return (
    <Switch>
      <Route exact path="/" component={hubExports.HomePage} /> {/* Home */}
      {routesToHookDemos} {/* Routes to all Hook Demos */}
      <Route component={hubExports._404Page} /> {/* 404 route */}
    </Switch>
  )
}
