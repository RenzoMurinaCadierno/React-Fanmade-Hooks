import { MetaTags, Text, ExpandableMenu, FlavorText } from "hub"
import {
  classes,
  metaTagsProps,
  menuIconProps,
  iconsProps
} from "./HomePage.utils"

/**
 * Renders the Home Page, with app's title and instructions.
 *
 * It also shows an '*ExpandableMenu*' that responsible for presenting contact
 * information, and that mounts on app's root node a confirmation '*Toast*'
 * before opening any external page.
 */
export default function HomePage() {
  return (
    // wrapper container
    <main className={classes.container}>
      <MetaTags {...metaTagsProps} />
      {/* title and description '*Text*'s */}
      <TitleAndDescription />
      {/* expandable menu with contact info and repository link */}
      <ExpandableMenu
        rotateOnOpen
        menuIconProps={menuIconProps}
        iconsProps={iconsProps}
      />
      <FlavorText
        delayBeforeFirstRender={4000}
        delayBetweenIterations={2000}
        animationProps={{ timeout: 5000 }}
      />
    </main>
  )
}
add click on screen to disable flavortext?
function TitleAndDescription() {
  return (
    <>
      <Text htmlElem="h2" italic className={classes.title}>
        React Fanmade Hooks
      </Text>
      <Text
        htmlElem="h5"
        type="secondary-1"
        italic
        className={classes.subtitle}
      >
        Hooks for many needs made by React enthusiasts.
      </Text>
      <Text htmlElem="h6" type="secondary-2" className={classes.instructions}>
        Hit the toggler at the top-left of the screen and start exploring. Have
        fun! ;)
      </Text>
    </>
  )
}
