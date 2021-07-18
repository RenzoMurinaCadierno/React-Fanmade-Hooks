import { MetaTags, Text, ExpandableMenu, Layout } from "hub"
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
      {/* title and subtitles '*Text*'s */}
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
      {/* expandable menu with contact info and repository link */}
      <ExpandableMenu
        rotateOnOpen
        menuIconProps={menuIconProps}
        iconsProps={iconsProps}
      />
      <Layout.Animation>
        <Text>asasas</Text>
      </Layout.Animation>
    </main>
  )
}
