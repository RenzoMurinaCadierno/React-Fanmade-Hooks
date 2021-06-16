import { ErrorBoundary, Navigation, Router } from "hub"
import "./App.css"

export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Navigation />
        <Router />
      </ErrorBoundary>
    </div>
  )
}
