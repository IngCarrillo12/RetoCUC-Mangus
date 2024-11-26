import { Login } from './components/Login.jsx'
import './App.css'
import { Register } from './components/Register.jsx'
import {Home} from './pages/Home.jsx'
//import { Routes, Route, useNavigate } from "react-router-dom";
//import { useAuthStore } from './store/AuthStore.jsx';
import { Routes, Route } from "react-router-dom";
import {FormCreate} from './components/FormCreate.jsx';
import CommentSection from './components/CommentSection .jsx';
import FeedbackCards from './components/FeedbackCards.jsx';
import FeedbackCardsResponse from './components/FeedbackResponse.jsx';
import { Prueba } from './components/Prueba.jsx';


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
    <Route path="/commentsection" element={<CommentSection />} />
    <Route path="/feedbackcards" element={<FeedbackCards />} />
    <Route path="/FeedbackCardsResponse" element={<FeedbackCardsResponse />} />

  </Routes>
  </>
  )
}

export default App