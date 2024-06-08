import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Bet365Logo from '../assets/Bet365.png'; 
import MenuIcon from '../assets/menu.png';  
import Star from '../assets/star.png';
import search from '../assets/search.png';  
import './Index.css';  
import sport from '../assets/sport.png'
import sportlive from '../assets/sportlive.png'
import cards from '../assets/cards.png'
import offer from '../assets/offer.png'
import { useCreateTicketMutation, useGetInPlayFilterQuery, useGetUserProfileQuery, useLogoutMutation } from '../features/apiSlice';
import ModalLogin from './ModalLogin'; // Importo ModalLogin.js
import { useDispatch, useSelector } from 'react-redux';
import { clearBets, clearOdds, deleteBet, toggleOdd } from '../features/betSlice';
import { PiUserCircleLight } from "react-icons/pi";
import { Dropdown } from "antd";
import { toast } from 'react-toastify';
import { logout } from '../features/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [activeLink, setActiveLink] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false); // Shto state për modalin e loginit
  const [price, setPrice] = useState(0);

  const { userInfo } = useSelector((state) => state.auth);


  const bets = useSelector((state) => state.bets.betItems) 

  const { data: sports, isLoading, isError, refetch } = useGetInPlayFilterQuery();
  const { data: user, refetch: refetchUser } = useGetUserProfileQuery({userId: userInfo?._id});
  const [ createTicket ] = useCreateTicketMutation();




  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (userInfo) {
      refetch()
    }
  }, [userInfo, refetch]);

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

  if (!sports || Object.keys(sports).length === 0) return <div>No data available</div>;

  console.log('sports from navbar', sports)

  const handleDeleteClick = (id) => {
    dispatch(deleteBet(id));
    dispatch(toggleOdd(id));
  };
  

  let totalCoef = 1;
if (Array.isArray(bets)) {
  totalCoef = bets.reduce((total, bet) => total * bet.coef, 1);
}

  const winningChance = price * totalCoef;

  const items = [
    {
      label: <span>Perdoruesi: {user?.userName}</span>,
      key: '0',
    },
    {
      label: <span>Krediti: {user?.credits}</span>,
      key: '1',
    },
    {
      type: 'divider',
    },
    // {
    //   label: <Link to={'/personal-info'}>Informacionet Personale</Link>,
    //   key: '3',
    // },
    // {
    //   type: 'divider',
    // },
    {
      label: <Link to={'/transfers'}>Transfertat</Link>,
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/transactions'}>Transaksionet</Link>,
      key: '5',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/roles'}>Rolet</Link>,
      key: '6',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/role/create'}>Krijo Rol</Link>,
      key: '7',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/finances'}>Financat</Link>,
      key: '8',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/users-list'}>Lista Perdorueseve</Link>,
      key: '9',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/user-create'}>Krijo Perdorues</Link>,
      key: '10',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/password-change'}>Ndrysho Passwordin</Link>,
      key: '11',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/bonuss'}>Bonuset dhe promocionet</Link>,
      key: '12',
    },
    {
      type: 'divider',
    },
    {
      label: <div onClick={logoutHandler} >Dil</div>,
      key: '13',
    },
  ];

  const submitTicket = async(e) => {
    e.preventDefault()
    try {
      await createTicket({userName: userInfo?.userName, ticketWin: winningChance.toFixed(2), playedSum: parseFloat(price)})
      toast.success('Ticket created successfully')
      setPrice('')
      dispatch(clearBets())
      dispatch(clearOdds())
      refetchUser()
    } catch (error) {
      toast.error(error)
      console.log(error, 'error while making bets')
    }
  }
  
  




  return (
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



<div  className='bodyy'> 

      {/* Sidebar */}
        <div className={`sidebar ${windowWidth > 1300 || sidebarOpen ? 'open' : ''}`}>
              
                <div className="search-input" onClick={() => {toggleSearch(); openWelcomeModal();}}>
                  <img className="search-icon" src={search} alt="Star" />Search
                </div>   
                 
                    <div className='sidebar-none'>
                        <div className='sidebar-menu'> 
                            <Link className='sidebar-menu-a' to="/">
                              <img className='icon-menuu' src={sport} alt='Sports'/> 
                              <p>Sports</p>
                            </Link> 
                            <Link className='sidebar-menu-a' to="/live">
                              <img className='icon-menuu' src={sportlive} alt='Sports'/> 
                              <p>Live</p>
                            </Link> 
                            <Link className='sidebar-menu-a' to="/">
                              <img className='icon-menuu' src={cards} alt='Sports'/> 
                              <p>LOJRA</p>
                            </Link> 
                            <Link className='sidebar-menu-a' to="/">
                              <img className='icon-menuu' src={offer} alt='Sports'/> 
                              <p>Offers</p>
                            </Link> 
                        </div>  
                    </div>
                    <Link className="sidebar-link-home" to="/">Home</Link>

                    {Object.keys(sports).map((index) => (
                    <Link key={index} className="sidebar-link" to={`/${sports[index].toLowerCase()}`}>
                      {sports[index].charAt(0).toUpperCase() + sports[index].slice(1)}
                      <img className="star-icon" src={Star} alt="Star" />
                    </Link>
                    ))}

                 

                  
            </div>
            
                  {/* Dark overlay */}
                  {sidebarOpen && (
                    <div className="dark-overlay" onClick={toggleSidebar}></div>
                  )}
              
                  
                {/* Search Modal */}
                  {welcomeModalOpen && (
                    <div className="search-slide">
                      <div className="search-content"> 
                        <input type="text" className="search-inputt" placeholder="Search..." /> 
                        <button className="search-button" onClick={() => {toggleSearch(); closeWelcomeModal();}}>Close</button>
                      </div>
                    </div>
                  )}

  



          
{/* tabela e qmimit */}

          <div className="bet-slip-container">
            <div>
              <div className="bet-slip-header">
                <div className='bet-slip'> 
                  <div className='bet-count'> 
                  <p>{bets?.length}</p> 
                  </div>
                    <p className="bet-slip-label">Bet Slip</p>
                </div>
                    <p className="balance">{bets?.length !== 0 ? totalCoef.toFixed(2) : '1.00'}</p>
                    <p className="balance-label">Balance</p>
              </div>

              <div className="match-details">
              {bets?.map((bet, index) => (
                  <div className="match-details" key={index}>
                    <div className="match"> 
                      <p className="team">{bet.teams.team1} - {bet.teams.team2}</p> <p className="odds">{bet.coef}</p>
                    </div>
                    <div className="bet-type">
                      <p>Rezultat final (1)</p> 
                      <button className="delete-button" onClick={() => handleDeleteClick(bet.id)}>Delete</button>      
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bet-input-section">
              <div className="bet-input">
                <div className="price-section">
                  <p className="price-label">Price</p>
                  <input value={price}  type="text" className="price-input" placeholder="Ps. 2.00" onChange={handlePriceChange} />
                </div>
                <div className="winning-chance-section">
                  <p className="winning-chance-label">Winning Chance: </p>
                  <p className="winning-chance-rezult">{price.length !== 0 ? winningChance.toFixed(2) : '0.00'}</p>
                </div>
              </div>

              <div className="place-bet-section">
                <button className="place-bet-btn" onClick={submitTicket}>Place Bet</button>    
              </div>
            </div>
          </div>


    </div> 
</div> 
     
  );
}

export default Navbar;