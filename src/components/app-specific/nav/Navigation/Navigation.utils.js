import configs from "app.configs.json"

/**
 * Object containing hook categories' names, their "selected" state, the hook
 * names on each category and their "selected" state. Those hook names will
 * be used to link to their example pages.
 *
 * @returns {object} "default categories" object, shaped:
 * * {
 * * * firstCategoryName: [
 * * * * isCategoryActiveBoolean,
 * * * * [
 * * * * * [firstHookLinkNameString, isFirstHookLinkActiveBoolean],
 * * * * * [secondHookLinkNameString, isSecondHookLinkActiveBoolean],
 * * * * * ...
 * * * * ]
 * * * ],
 * * * secondCategoryName: [...] // and so on for all categories-
 * * }
 */
export const defaultCategories = Object.entries(configs.appbarItems).reduce(
  (acc, catAndHooks) => ({
    ...acc,
    [catAndHooks[0]]: [
      false,
      catAndHooks[1].map((hookName) => [hookName, false])
    ]
  }),
  {}
)

/**
 * Given the string typed in the search box, it modifies the object based on
 * "defaultCategories" above, setting the boolean for active states both for
 * categories and their hook names, which in term displays them in UI
 *
 * @param {string} searchTerm the search input field's value
 *
 * @returns {object} An object with with the hook categories as keys and an
 *   array for each of them, shaped:
 * * [elem 1] (boolean): true indicates the category is active (one or more of
 *     its hooks matches the searched term).
 * * [elem 2] (Array): shape [hookThatMatchesSearch, true] // true = active
 */
export function getActiveCategoriesAndHooks(searchTerm) {
  // get the search term value
  const lowerCasedValue = searchTerm.toLowerCase()
  // an empty object which will override the state used to render UI
  const filteredCategories = {}
  // for each category name
  for (let name in defaultCategories) {
    // grab its hookNames array, filter it to get all hook names that match the
    // searched term. Then, map them into an array shape [hookName, true],
    // where "true" means the link to the hook should show in UI
    const filteredCategory = defaultCategories[name][1]
      .filter(([hookName]) => hookName.toLowerCase().includes(lowerCasedValue))
      .map(([hookName]) => [hookName, true])
    // if there are no matching hook names for the current category,
    // "filteredCategory.length" will be 0. Do nothing in that case.
    // Otherwise, the category has at least one hook that matches the searched
    // parameter, so append it to the final object.
    if (filteredCategory.length) {
      filteredCategories[name] = [true, filteredCategory]
    }
  }
  // return the new object to replace state with
  return filteredCategories
}
