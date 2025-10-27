import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import SignUpPage from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './providers/UserProvider';
import LoginPage from './pages/Login';


function App() {

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </UserProvider>

  )
}

export default App
