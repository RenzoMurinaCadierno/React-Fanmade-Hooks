import { Component } from "react"
import { withRouter } from "react-router-dom"
import { Container, Text, Button } from "hub"
import errorSVG from "assets/icons/error.svg"
import { classes } from "./ErrorBoundary.utils"

/**
 * Renders a generic Error Boundary page to replace the entire component tree
 * structure starting from root node.
 */

export default withRouter(
  class ErrorBoundary extends Component {
    state = { hasError: false }

    goToHomeUrl = () => {
      this.setState({ hasError: false })
      this.props.history.push("/")
    }

    componentDidCatch(err) {
      console.log(err)
      this.setState({ hasError: true })
    }

    render() {
      return this.state.hasError ? (
        <div className={classes.container}>
          <Container className={classes.title}>
            <img src={errorSVG} alt="Error" className={classes.image} />
            <Text htmlElem="h3" italic>
              Something went wrong x.x
            </Text>
          </Container>
          <Text type="secondary-1" italic>
            This is a generic error message, we cannot specifically help you
            here :/
          </Text>
          <Text type="secondary-1" italic>
            It would be awesome if you could tell us what went wrong and/or
            where it happened :D
          </Text>
          <Text type="secondary-1" italic>
            Regardless, here's a redirect to Home Page, hope it works!
          </Text>
          <Button onClick={this.goToHomeUrl}> Go home (good luck) </Button>
        </div>
      ) : (
        this.props.children
      )
    }
  }
)
