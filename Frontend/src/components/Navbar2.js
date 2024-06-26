import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Bet365Logo from '../assets/Bet365.png'; 
import MenuIcon from '../assets/menu.png';  
import './Index.css';  
import ModalLogin from './ModalLogin'; 
import { useDispatch, useSelector } from 'react-redux';
import { PiUserCircleLight } from "react-icons/pi";
import { Dropdown } from "antd";
import { useGetInPlayFilterQuery, useGetUserProfileQuery, useLogoutMutation } from '../features/apiSlice';
import { logout } from '../features/authSlice';
import { toast } from 'react-toastify';
import { checkAnyTrue } from '../functions/Permissions';
import Star from '../assets/star.png';
import search from '../assets/search.png';  
import sport from '../assets/sport.png'
import sportlive from '../assets/sportlive.png'
import cards from '../assets/cards.png'
import offer from '../assets/offer.png'

const Navbar2 = () => {


  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeLink, setActiveLink] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Shto state për modalin e loginit
  const [price, setPrice] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);
  const { data: user } = useGetUserProfileQuery({userId: userInfo?._id});
  const { data: sports, isLoading, isError, refetch } = useGetInPlayFilterQuery();


  


  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };
  
  const openWelcomeModal = () => {
    setWelcomeModalOpen(true);
  };

  const closeWelcomeModal = () => {
    setWelcomeModalOpen(false);
  };

  const openLoginModal = () => { 
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => { 
    setLoginModalOpen(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

const navigate = useNavigate();
const dispatch = useDispatch();

const [logoutApiCall] = useLogoutMutation();

const logoutHandler = async () => {
  
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

    if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  if (!sports || Object.keys(sports).length === 0) return <div>No data available</div>


    const items = [
      {
        label: <span>Perdoruesi: {user?.userName}</span>,
        key: '0',
      },
      userInfo?.isAdmin ? null : {
        label: <span>Krediti: {user?.credits}</span>,
        key: '1',
      },
      userInfo?.isAdmin ? null : {
        type: 'divider',
      },
      {
        label: <Link to={'/personal-info'}>Informacionet Personale</Link>,
        key: '3',
      },
      {
        type: 'divider',
      },
      userInfo && checkAnyTrue('transfers') && {
        label: <Link to={'/transfers'}>Transfertat</Link>,
        key: '4',
      },
      userInfo && checkAnyTrue('transfers') && {
        type: 'divider',
      },
      userInfo && checkAnyTrue('transactions') &&{
        label: <Link to={'/transactions'}>Transaksionet</Link>,
        key: '5',
      },
      userInfo && checkAnyTrue('transactions') && {
        type: 'divider',
      },
      userInfo && checkAnyTrue('roles') && {
        label: <Link to={'/roles'}>Rolet</Link>,
        key: '6',
      },
      userInfo && checkAnyTrue('roles') && {
        type: 'divider',
      },
      // userInfo && checkAnyTrue('roles') &&{
      //   label: <Link to={'/role/create'}>Krijo Rol</Link>,
      //   key: '7',
      // },
      // {
      //   type: 'divider',
      // },
      userInfo && checkAnyTrue('finances') && {
        label: <Link to={'/finances'}>Financat</Link>,
        key: '8',
      },
      userInfo && checkAnyTrue('finances') && {
        type: 'divider',
      },
      userInfo && checkAnyTrue('users') && {
        label: <Link to={'/users-list'}>Lista Perdorueseve</Link>,
        key: '9',
      },
      userInfo && checkAnyTrue('users') && {
        type: 'divider',
      },
      userInfo && checkAnyTrue('users') &&{
        label: <Link to={'/user-create'}>Krijo Perdorues</Link>,
        key: '10',
      },
      userInfo && checkAnyTrue('users') &&{
        type: 'divider',
      },
      {
        label: <Link to={'/password-change'}>Ndrysho Passwordin</Link>,
        key: '11',
      },
      {
        type: 'divider',
      },
      userInfo?.role === 'Player' ? null : {
        label: <Link to={'/bonuss'}>Bonuset dhe promocionet</Link>,
        key: '12',
      },
      userInfo?.role === 'Player' ? null :{
        type: 'divider',
      },
      {
        label: <div onClick={logoutHandler} >Dil</div>,
        key: '13',
      },
    ].filter(Boolean);


  return (
    <>
    <div>
         <div className="navbar"> 
        <div className="burger-menu" onClick={toggleSidebar}>
          <img className="menu-icon" src={MenuIcon} alt="Menu" />
        </div>
        <div className="div-logo">
          <img className="logo" src={Bet365Logo} alt="Bet365 Logo" />
        </div>
        {(windowWidth > 1300 || sidebarOpen) && (
          <div className="nav-links">
            <Link className={`nav-link ${activeLink === 'sport' ? 'active' : ''}`} to="/" onClick={() => handleLinkClick('sport')}>Sport</Link>
            <Link className={`nav-link ${activeLink === 'live' ? 'active' : ''}`} to="/live" onClick={() => handleLinkClick('live')}>Live</Link>
          </div>
        )}

        {userInfo ? <Dropdown
        overlayStyle={{zIndex: 10000}}
        menu={{
          items,
        }}
        trigger={['click']}
      >
    <div className="auth-buttons">
    <span style={{color: '#fff', display: 'flex', alignItems: 'center'}}>
      <PiUserCircleLight size={25} /> {userInfo?.role}
    </span>
    </div>
  </Dropdown>
         : 
      <div className="auth-buttons">
          <button className="auth-button" onClick={openLoginModal}>Login</button>  
        </div>}
      </div>

      <ModalLogin isOpen={loginModalOpen} onClose={closeLoginModal} />
    </div>
    
    </>
  )
}

export default Navbar2