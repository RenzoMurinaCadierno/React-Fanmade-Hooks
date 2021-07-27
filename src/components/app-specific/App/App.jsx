import { ErrorBoundary, Navigation, Router } from "hub"
import { consoleLogWelcomeMessage } from "./App.utils"
import "./App.css"

export default function App() {
  consoleLogWelcomeMessage()

  return (
    <div className="App">
      <ErrorBoundary>
        <Navigation />
        <Router />
      </ErrorBoundary>
    </div>
  )
}
