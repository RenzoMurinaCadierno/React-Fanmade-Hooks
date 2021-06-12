import { Text, ExpandableMenu, Input } from "hub"
import { useRef } from "react"
import { classes, menuIconProps, iconsProps } from "./HomePage.utils"

/**
 * Renders the Home Page, with app's title and instructions.
 *
 * It also shows an '*ExpandableMenu*' that responsible for presenting contact
 * information, and that mounts on app's root node a confirmation '*Toast*'
 * before opening any external page.
 */
export default function HomePage() {
  const ref = useRef()
  test all Inputs with refs and state, specially styled, then change InputField. Afterwards, add all plainCodes

  return (
    // wrapper container
    <main className={classes.container}>
      <Input.Styled.WithState label="as" ref={ref} classNames={{ asd: 123 }} />
    </main>
  )
}

// import { Text, ExpandableMenu } from "hub"
// import { classes, menuIconProps, iconsProps } from "./HomePage.utils"

// /**
//  * Renders the Home Page, with app's title and instructions.
//  *
//  * It also shows an '*ExpandableMenu*' that responsible for presenting contact
//  * information, and that mounts on app's root node a confirmation '*Toast*'
//  * before opening any external page.
//  */
// export default function HomePage() {
//   return (
//     // wrapper container
//     <main className={classes.container}>
//       {/* title and subtitles '*Text*'s */}
//       <Text htmlElem="h2" italic className={classes.title}>
//         React Fanmade Hooks
//       </Text>
//       <Text
//         htmlElem="h5"
//         type="secondary-1"
//         italic
//         className={classes.subtitle}
//       >
//         Hooks for many needs made by React enthusiasts.
//       </Text>
//       <Text htmlElem="h6" type="secondary-2" className={classes.instructions}>
//         Hit the toggler at the top-left of the screen and start exploring. Have
//         fun! ;)
//       </Text>
//       {/* expandable menu with contact info and repository link */}
//       <ExpandableMenu
//         rotateOnOpen
//         menuIconProps={menuIconProps}
//         iconsProps={iconsProps}
//       />
//     </main>
//   )
// }
