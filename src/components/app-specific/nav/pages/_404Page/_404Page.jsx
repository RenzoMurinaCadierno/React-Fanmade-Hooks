import { useHistory } from "react-router-dom"
import { Container, Text, Button } from "hub"
import _404svg from "assets/icons/_404.svg"
import { classes } from "./_404Page.utils"

/**
 * Renders an Error page on any failed route.
 */
export default function _404Page() {
  const history = useHistory()

  function goToHomeUrl() {
    history.push("/")
  }

  return (
    <div className={classes.container}>
      <Container className={classes.title}>
        <img src={_404svg} alt="Error" className={classes.image} />
        <Text htmlElem="h3" italic>
          Page not found
        </Text>
      </Container>
      <Text htmlElem="h6" type="secondary-1" italic>
        We still did not create a hook that can save us from invalid routing :c
      </Text>
      <Text htmlElem="h6" type="secondary-1" italic>
        But, hey! We can still redirect you the old fashioned way.
      </Text>
      <Button onClick={goToHomeUrl}> Take me home :D </Button>
    </div>
  )
}
