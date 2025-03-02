import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import "../styles/globals.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<HomePage />} />
        <Route path="/ride-up" element={<HomePage />} />
        <Route path="/sharing" element={<HomePage />} />
        <Route path="/destination" element={<HomePage />} />
        <Route path="/doors" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App