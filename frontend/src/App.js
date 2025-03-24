// Frontend: React with OpenStreetMap
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/DashBoard'
import NotFound from './components/NotFound';
import './App.css'

const App = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" />} />

  </Routes>
);

export default App;


