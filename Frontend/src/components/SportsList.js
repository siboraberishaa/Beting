import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  
import soccer from '../assets/soccer.png';
import basketball from '../assets/basketball.png';
import baseball from '../assets/baseball.png'; 
import tennis from '../assets/tennis.png'; 
import cricket from '../assets/cricket.png'; 
import icehockey  from '../assets/icehockey.png'
import volleyball from '../assets/volleyball.png'; 
import arrow from '../assets/arrow.png';
import './Index.css'; 
import { useGetInPlayFilterQuery } from '../features/apiSlice';

function SportsList() {
   
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleKoefClick = (index) => {
      if (clickedIndex === index) {
          setClickedIndex(null);
      } else {
          setClickedIndex(index);
      }
  };

  const [isClosed, setIsClosed] = useState(false);  

  const toggleDiv = () => {
      setIsClosed(!isClosed);  
  };

  useEffect(() => {
      const sportsContainer = document.querySelector('.sports');
      sportsContainer?.addEventListener('wheel', (event) => {
          sportsContainer.scrollLeft += event.deltaY;
  
          event.preventDefault();
      });
  }, []);

  // Merr të dhënat e sporteve nga API
  const { data: sports, isLoading, isError } = useGetInPlayFilterQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;
  if (!sports || sports?.length === 0) return <div>No data available</div>;

  // Objekti i ikonave për secilin sport
  const sportIcons = {
      soccer,
      basketball,
      baseball,
      tennis,
      cricket,
      icehockey,
      volleyball,
  };





  return (
    <div className='div-sports'>
                    <div className='sports'>
                        {sports?.map((key, index) => (
                            <Link key={index} className="sports-link" to={`/${key.toLowerCase()}`}>
                                {sports[key]}
                                {/* Shto ikonën për sportin aktual */}
                                <img className="sports-icon" src={sportIcons[key.toLowerCase()]} alt={`${sports[key]} Icon`} /> 
                            </Link>
                        ))}
                    </div>

      {/* Div-i për koeficientet */}
      <div className='container-two'>
        <div className='div-koeficient1'>
          <div className='div-title'>
            <p>Uefa Europe Conference League</p>
          </div>

          <div className='div-cont'> 
            <div className='div-kf'>
              <div className='div-data'>
                <div className='div-match'>
                  <p>Kosovo</p>
                  <p>Albania</p>
                  <div className='div-time'>
                    <p>29/05</p>
                    <p>21:00</p>
                  </div>
                </div>
                <div className='div-nr'>
                  <p>735 </p>
                </div>
              </div>
              <div className='div-kf-nr'>
                <div className={`koef ${clickedIndex === 0 ? 'clicked' : ''}`} onClick={() => handleKoefClick(0)}>
                  <p>1</p>
                  <p>2.85</p>
                </div>
                <div className={`koef ${clickedIndex === 1 ? 'clicked' : ''}`} onClick={() => handleKoefClick(1)}>
                  <p>X</p>
                  <p>3.03</p>
                </div>
                <div className={`koef ${clickedIndex === 2 ? 'clicked' : ''}`} onClick={() => handleKoefClick(2)}>
                  <p>2</p>
                  <p>2.39</p>
                </div>
              </div>
            </div> 
          </div> 
        </div>


 {/* ndeshjet kryesore */}

        <div className='div-koeficient1'>
          <div className='div-title'>
            <p>Ndeshjet kryesore</p>
          </div>

          <div className='div-cont'>

            <div className='div-kf'>
              <div className='div-data'>
                <div className='div-match'>
                  <p>Kosovo</p>
                  <p>Albania</p>
                  <div className='div-time'>
                    <p>29/05</p>
                    <p>21:00</p>
                  </div>
                </div>
                <div className='div-nr'>
                  <p>735 </p>
                </div>
              </div>
              <div className='div-kf-nr'>
                <div className={`koef ${clickedIndex === 0 ? 'clicked' : ''}`} onClick={() => handleKoefClick(0)}>
                  <p>1</p>
                  <p>2.85</p>
                </div>
                <div className={`koef ${clickedIndex === 1 ? 'clicked' : ''}`} onClick={() => handleKoefClick(1)}>
                  <p>X</p>
                  <p>3.03</p>
                </div>
                <div className={`koef ${clickedIndex === 2 ? 'clicked' : ''}`} onClick={() => handleKoefClick(2)}>
                  <p>2</p>
                  <p>2.39</p>
                </div>
              </div>
            </div>
            
          </div> 
        </div>

        


        {/* ndeshjet sot  */}


        <div className='div-koeficient1'>
      <div className='div-title' onClick={toggleDiv}>
        <p>Ndeshjet Sot</p>
        <img className="match-icon" src={arrow} alt="Arrow Icon" />
      </div>
      {!isClosed && (
        <div className='div-league-kf'>
          <div className='div-league'>
            <p>Premier League</p>
          </div>
          <div className='koef-option'>
            <p>1</p>
          </div>
          <div className='koef-option'>
            <p>X</p>
          </div>
          <div className='koef-option'>
            <p>2</p>
          </div>
        </div>
      )}
      {!isClosed && (
        <div className='container'>
          <div className='infoo'>
            <div className='info-div'>
              <div className='team-today'>
                <p>Genoa</p>
                <p>Roma</p>
              </div>
              <div className='team-nr'>
                <p>745</p>
              </div>
            </div>
            <div className='timee'>
              <p>19/05</p>
              <p>30:35</p>
            </div>
          </div>
          <div className='d-odd'>
            <p>5.65</p>
          </div>
          <div className='d-odd'>
            <p>2.26</p>
          </div>
          <div className='d-odd'>
            <p>1.62</p>
          </div>
        </div>
      )}
    </div>



{/* ndeshjet live  */}

        <div className='div-koeficient1'>
          <div className='div-title'>
            <p>Ndeshjet Live</p>
            <p id='p1'>Te Gjitha Ndeshjet </p>
          </div>
          <div className='div-league-kf'>
            <div className='div-league'> 
              <p>Premier League</p>
            </div>
            <div className='koef-option'>
              <p>1</p>
            </div>
            <div className='koef-option'>
              <p>X</p>
            </div>
            <div className='koef-option'>
              <p>2</p>
            </div>
        </div>

        <div className='container'>
          <div className='info'>
            <div className='time'>
              <p>30:35</p>
              <p>234</p>
            </div>
            <div className='teams'>
              <div className='teamm'>
                <p>Genoa</p>
                <p>0</p>
              </div>
              <div className='teamm'>
                <p>Roma</p>
                <p>3</p>
              </div>
            </div>
          </div>
          <div className='d-odd'>
            <p>5.65</p>
          </div>
          <div className='d-odd'>
            <p>2.26</p>
          </div>
          <div className='d-odd'>
            <p>1.62</p>
          </div>
        </div>
 

           
        </div> 
      </div>
    </div>
);
}

export default SportsList;