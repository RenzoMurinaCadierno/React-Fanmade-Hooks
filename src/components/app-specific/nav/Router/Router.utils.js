import React, { lazy } from "react"

/**
 * A High Order Component that takes a dynamic import statement and returns a,
 * `React.lazy` component using that statement as argument.
 *
 * A property `preload` is added to the returned component, which contains:
 *
 * * `status` (string): The preloaded status, being:
 *   * 'uninitialized': The preload was not yet requested.
 *   * 'preloaded': The component was successfully preloaded.
 *   * 'failed': The component could not be preloaded.
 *
 * * `run` (function): imperatively invokes the import statement if it the
 *   component is not yet lazy loaded and if it was not previously preloaded
 *   either imperatively with `Component.preload.run` or declaratively with
 *   `configs.preload`.
 *
 * * `error` (null | string): `null` on 'uninitialized' or 'preloaded' `status`,
 *   or a `string` mentioning the import statement promise resolution and error.
 *
 * Additionally, if `configs.preload` is `true`, it calls for
 * `configs.importStatement` automatically, preloading the component when
 * resolving `withPreloadLazy`.
 *
 * @param {object} configs A configuration object shaped:
 *
 * `importStatement` (function): A function that returns a promise which
 *   resolves to an object with a key being a string `'default'` and its value
 *   being a `React.Component`.
 *
 * * You should pass function that returns a dynamic import of a React
 *   component here. Like `() => import('./components/Todo.js')`
 *
 * `preload?` (boolean): `true` will automatically call for the component's
 *   import statement, preloading it when resolving `withPreloadLazy`.
 */
export function lazyWithPreload({ importStatement, preload }) {
  const Component = lazy(importStatement)

  Component.preload = {
    status: "uninitialized",
    run: () => preloadComponent(Component, importStatement),
    error: null
  }

  if (preload) preloadComponent(Component, importStatement)

  return Component
}

/**
 * Fulfills `importStatement` promise, returning `module.default` output on
 * resolution, or throwing a detailed error on rejection.
 *
 * If the component was already lazy loaded or preloaded, this function does
 * not call `importStatement`, but returns `Component` as is.
 *
 * @param {React.Element} Component The React component wrapped in `React.lazy`
 *   using `importStatement` as argument.
 *
 * @param {function} importStatement A function that returns a promise which
 *   resolves to an object with a key being a string `'default'` and its value
 *   being a `React.Component`.
 *
 * Preferably a function that returns a dynamic import of a React component.
 *   Like `() => import('./components/Todo.js')`
 */
function preloadComponent(Component, importStatement) {
  if (Component.preload.status === "preloaded") return Component

  if (Component._payload._status === 1) {
    Component.preload.status = "preloaded"
    Component.preload.error = null
    return Component
  }

  importStatement()
    .then((module) => {
      Component.preload.status = "preloaded"
      Component.preload.error = null
      return module.default
    })
    .catch((err) => {
      Component.preload.status = "failed"
      Component.preload.error = err
      throw new Error(
        `Failed to preload component using \`lazyWithPreload\`.\n\n  > Import statement:\n  ${importStatement}\n\n  > Resulting module:\n  ${module.default}\n\n  > Stack trace:\n ${err}`
      )
    })
}
