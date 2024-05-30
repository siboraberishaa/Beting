import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sport from './components/Sport';
import Live from './components/Live';
import Footer from './components/Footer';
import Matchoods from './components/Matchoods'; 
import OddsPerGame from './components/OddsPerGame';
import Index from './admin/Index';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kontrollo statusin e kyçjes kur komponenti ngarkohet
    const loggedIn = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/index" /> : <Sport />} />
          <Route path="/live" element={<Live />} />
          <Route path="/matchoods/:eventId" element={<Matchoods />} /> 
          <Route path="/index" element={<Index />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
