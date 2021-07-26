import { useEffect } from "react"
import { ErrorBoundary, Navigation, Router } from "hub"
import { initialConsoleLog } from "./App.utils"
import "./App.css"

export default function App() {
  useEffect(() => console.log(initialConsoleLog), [])

  return (
    <div className="App">
      <ErrorBoundary>
        <Navigation />
        <Router />
      </ErrorBoundary>
    </div>
  )
}
