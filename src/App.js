import { Navigation, Router, ErrorBoundary } from "hub"
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
