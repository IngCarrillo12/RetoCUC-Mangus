import { Login } from './components/Login.jsx'
import './App.css'
import { Register } from './components/Register.jsx'
import {Home} from './pages/Home.jsx'
//import { Routes, Route, useNavigate } from "react-router-dom";
//import { useAuthStore } from './store/AuthStore.jsx';
import { Routes, Route } from "react-router-dom";
import FormCreate from './components/FormCreate.jsx';

function App() {
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  //console.log(isAuthenticated)
  //<Route path="/home" element={isAuthenticated*/?<Home/>:navigate('/login')}/>
  //const navigate = useNavigate()

  return (
    <>
    {/* <Header/> */}
    <Routes>    
      <Route path="/home" element={<Home />}/>
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/formcreate" element={<FormCreate />} />
    </Routes>
  </>
  )
}

export default App