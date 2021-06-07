# useMediaQuery

- [Working example here](https://rfh.netlify.app/use-media-query)

<br />

## Description

Tracks stated media queries, re-rendering each time one of them changes.

By default it applies regular bootstrap rules, but also accepts any custom media queries you specify.

Default rules are:

```javascript
{
  xs: "(max-width: 600px)",
  sm: "(min-width: 600px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 992px)",
  xl: "(min-width: 1200px)",
  pt: "screen and (orientation: portrait)"
}
```

<br />

## Parameters

- `customQueries?` (object)

  An object with custom key names to represent the media queries to state, and values as media queries strings to test for.

  - E.g.: `{ w500: "(min-width: 500px)", dark: "(prefers-color-scheme: dark)" }`

<br />

- `combineWithDefault?` (boolean)

  This component adds default bootstrap media query rules. Setting this param to `true` will combine `customQueries` with those ones in the global object. `false` will only use `customQueries`.

<br />

- `delay?` (number)

  The delay for query match state to update when media query listener triggers, in milliseconds. Defaults to **100**.

  > **Warning:** Low values cause more re-renders. Keep this in mind when considering performance.

<br />

## Return

An **array** with:

<br />

- **elem 0** (object): All stated media query keys, each with a boolean value indicating if they currently match.

- **elem 1** (object): All stated media query keys, each with the media query match rule as a `string`.
