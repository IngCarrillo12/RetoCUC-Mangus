
import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuthStore } from './store/AuthStore.jsx';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { Home } from './pages/Home.jsx';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      navigate('/login');
      
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route path="/home" element={isAuthenticated ? <Home /> : <Login />} />
      <Route index path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
      <Route path="/register" element={!isAuthenticated ? <Register /> : <Home />} />
      <Route path="/feedbackcards" element={<FeedbackCards />} />
      <Route path="/FeedbackCardsResponse" element={<FeedbackCardsResponse />} />
    </Routes>
  );




  
}

export default App;
