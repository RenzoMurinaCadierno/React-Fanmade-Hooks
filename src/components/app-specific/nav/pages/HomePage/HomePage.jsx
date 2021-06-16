// import { Text, ExpandableMenu, Input, MetaTags } from "hub"
// import { useRef } from "react"
// import { classes, menuIconProps, iconsProps } from "./HomePage.utils"

// /**
//  * Renders the Home Page, with app's title and instructions.
//  *
//  * It also shows an '*ExpandableMenu*' that responsible for presenting contact
//  * information, and that mounts on app's root node a confirmation '*Toast*'
//  * before opening any external page.
//  */
// export default function HomePage() {
//   const ref = useRef()
//   // Afterwards, add all plainCodes

//   return (
//     // wrapper container
//     <main className={classes.container}>
//       <Input.Styled
//         ref={ref}
//         inputProps={{
//           label: "Message"
//         }}
//         messageType="primary"
//         validationContainerAnchor="bottom"
//         useInputHandlersConfigs={{
//           validators: { alphanumeric: null },
//           // clearOnSubmit: true,
//           forceSubmit: true,
//           // validateOnChange: true,
//           onValidation: (e) => console.log("validating"),
//           // onSubmit: (e) => console.log(e),
//           onSubmit: (e) => console.log(e, "submitasd"),
//           onSubmitFail: (e) => console.log(e, "asd")
//         }}
//         // classNames={{ inputStyled: { asd: 123 } }}
//       />
//     </main>
//   )
// }

import { MetaTags, Text, ExpandableMenu } from "hub"
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
    </main>
  )
}
