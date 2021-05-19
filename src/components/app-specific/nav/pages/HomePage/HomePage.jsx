import { Text, ExpandableMenu, Aura } from "hub"
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
      <div
        style={{
          position: "absolute",
          top: "30%",
          width: "20%",
          height: "20%",
          zIndex: 0,
          // borderRadius: "20vw",
          // clipPath: "circle(50px at 0 100px)",
          borderTop: "10vw dashed red",
          borderBottom: "10vw dotted blue",
          background: "var(--primary-0)"
        }}
      >
        <Aura style={{ zIndex: -1 }} />
      </div>
      <ExpandableMenu />
    </div>
  )
}
