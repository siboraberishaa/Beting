import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sport from './components/Sport';
import Live from './components/Live';
import Footer from './components/Footer';
import Matchoods from './components/Matchoods'; 
import OddsPerGame from './components/OddsPerGame';
import Index from './admin/Index';
import PersonalInfo from './components/PersonalInfo';
import UsersList from './components/UsersList';
import RegisterUser from './components/RegisterUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Sport />} />
          <Route path="/live" element={<Live />} />
          <Route path="/matchoods/:eventId" element={<Matchoods />} /> 

          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/users-list" element={<UsersList />} />
          <Route path="/user-create" element={<RegisterUser />} />
        </Routes>
        <Footer />
      </div>
        <ToastContainer />
    </Router>
  );
}

export default App;
