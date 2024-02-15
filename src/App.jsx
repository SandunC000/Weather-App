import WeatherApp from "./components/WeatherApp"
import Login from "./components/Login"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/weather' element={<WeatherApp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
