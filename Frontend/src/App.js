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
import Transactions from './components/Transactions';
import Transfers from './components/Transfers';
import UserInfo from './components/UserInfo';
import Bonus from './components/Bonus';
import RolesList from './components/RolesList';
import RoleDetails from './components/RoleDetails';
import CreateRole from './components/CreateRole';
import ChangePassword from './components/ChangePassword';
import Finances from './components/Finances';

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
          <Route path="/user/:id" element={<UserInfo />} />
          <Route path="/user-create" element={<RegisterUser />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/bonuss" element={<Bonus />} />
          <Route path="/roles" element={<RolesList />} />
          <Route path="/role/create" element={<CreateRole />} />
          <Route path="/role/:id" element={<RoleDetails />} />
          <Route path="/password-change" element={<ChangePassword />} />
          <Route path="/finances" element={<Finances />} />
        </Routes>
        <Footer />
      </div>
        <ToastContainer />
    </Router>
  );
}

export default App;
