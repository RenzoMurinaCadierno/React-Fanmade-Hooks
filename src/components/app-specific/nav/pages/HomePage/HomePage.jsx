import { Text, ExpandableMenu } from "hub"
import { classes } from "./HomePage.utils"

export default function HomePage() {
  return (
    <div className={classes.container}>
      <Text htmlElem="h2" italic>
        React Fanmade Hooks
      </Text>
      <Text htmlElem="h5" type="secondary-1" italic>
        Hooks for all needs made by React enthusiasts.
      </Text>
      <Text htmlElem="h6" type="secondary-2">
        Hit the toggler at the top-left of the screen and start exploring!
      </Text>
      <ExpandableMenu />
    </div>
  )
}
