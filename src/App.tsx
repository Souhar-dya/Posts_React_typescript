
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css'

function App() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('isAuthenticated') === 'true';

  return (
  

    
    <>
    <nav>
      <h1>JSON Holder</h1>
      <div>
        {!isAuth ? (
          <>
          </>
        ) : (
          <button onClick={() => {
            localStorage.removeItem('isAuthenticated');
            navigate('/');
          }}>Logout</button>
        )}
      </div>
    </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={isAuth ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
    </>
  )
}

export default App
