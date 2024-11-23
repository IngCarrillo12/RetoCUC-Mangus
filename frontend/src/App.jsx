import { Login } from './components/Login.jsx'
import './App.css'
import { Register } from './components/Register.jsx'
import {Home} from './pages/Home.jsx'
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    {/* <Header/> */}
    <Routes>
    <Route path="/home" element={<Home/>}/>
    <Route index path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>
  </>
  )
}

export default App
