import React, { useEffect, useState } from 'react';
import { useGetInPlayFilterQuery, useGetInPlayOdssQuery, useGetOddsPerGameQuery } from '../features/apiSlice';
import { Link, useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { addBets, deleteBet } from '../features/betSlice';
import soccer from '../assets/soccer.png';
import basketball from '../assets/basketball.png';
import baseball from '../assets/baseball.png'; 
import tennis from '../assets/tennis.png'; 
import cricket from '../assets/cricket.png'; 
import icehockey  from '../assets/icehockey.png'
import volleyball from '../assets/volleyball.png';  
import esports from '../assets/esports.png'

const MatchOdds = ({ eventId, teams }) => {
  const dispatch = useDispatch();
  const { data: odds, isLoading, isError } = useGetOddsPerGameQuery(eventId);
  const [isClicked, setIsClicked] = useState(false);
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);

  if (isLoading) return <div>Loading odds...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  const handleOddClick = (index, coef) => {
    const bets = JSON.parse(localStorage.getItem("bets"));
    const existingBetIndex = bets.betItems.findIndex(bet => bet.coef === Number(coef).toFixed(2));
  
    if (existingBetIndex !== -1) {
      dispatch(deleteBet(existingBetIndex));
    } else {
      dispatch(addBets({
        coef: Number(coef).toFixed(2),
        teams: teams
      }));
    }
  
    switch(index) {
      case 0:
        setIsClicked(prevState => !prevState);
        break;
      case 1:
        setIsClicked1(prevState => !prevState);
        break;
      case 2:
        setIsClicked2(prevState => !prevState);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className='d-odd' style={{backgroundColor: isClicked ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick(0, odds?.markets[0]?.coef)}>  
        <p>{!isNaN(odds?.markets[0]?.coef) ? Number(odds?.markets[0]?.coef).toFixed(2) : ''}</p> 
      </div>
      <div className='d-odd' style={{backgroundColor: isClicked1 ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick(1, odds?.markets[1]?.coef)}>  
        <p >{!isNaN(odds?.markets[1]?.coef) ? Number(odds?.markets[1]?.coef).toFixed(2) : ''}</p> 
      </div>
      <div className='d-odd' style={{backgroundColor: isClicked2 ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick(2, odds?.markets[2]?.coef)}>   
        <p >{!isNaN(odds?.markets[2]?.coef) ? Number(odds?.markets[2]?.coef).toFixed(2) : ''}</p> 
      </div>
    </>
  );
};

const Livematch = () => {
  const navigate = useNavigate();
  const { data: sports, isLoading, isError } = useGetInPlayOdssQuery();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const { data: sportss, isLoading: loading, isError: err } = useGetInPlayFilterQuery();


  useEffect(() => {
    if (sports) {
      console.log("Sports data:", sports);
    }
  }, [sports]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  if (!Array.isArray(sports)) {
    console.error('Sports data is not an array');
    return null;
  }

  if (sports.length === 0) return <div>No data available</div>;

  // Grupimi i lojërave sipas ligës
  const groupedMatches = {};
  sports.forEach((match) => {
    if (!groupedMatches[match.liga]) {
      groupedMatches[match.liga] = [];
    }
    groupedMatches[match.liga].push(match);
  });

  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    navigate(`/matchoods/${match.eventId}`);
  };





  // sport list 



  
  // Merr të dhënat e sporteve nga API

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
      esports,
  };

  const capitalizeFirstLetter = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  

  return (
    <div className='div-sports'>



<div className='sports'>
                  {sportss?.map((sport, index) => (
                    <Link key={index} className="sports-link" to={`/${sport.toLowerCase()}`}> 
                      <div className="container-two">  
                        <img className="sports-icon" src={sportIcons[sport.toLowerCase()]} alt={`${sport} Icon`} />  
                      </div>
                      <p>{capitalizeFirstLetter(sport)}</p>
                    </Link>
                  ))}
                </div>












      {Object.entries(groupedMatches).map(([liga, matches], index) => (
        <React.Fragment key={index}>
          <div className='div-league-kf'>
          <div className='div-league'>
            <p>{liga}</p>
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
          {matches.map((match, index) => ( 
              <div key={index} className='container'>
                <div className='info'>
                  <div className='time'>
                    <p>{match.timer}</p>
                    <p>{match.marketsCount}</p>
                  </div>
                  <div className='teams' onClick={() => handleMatchClick(match)}>
                    <div className='teamm'>
                      <p>{match.team1}</p>
                      <p>{match.score.split(':')[0]}</p>
                    </div>
                    <div className='teamm'>
                      <p>{match.team2}</p>
                      <p>{match.score.split(':')[1]}</p>
                    </div>
                  </div>
                </div>
                <MatchOdds eventId={match.eventId} teams={{ team1: match.team1, team2: match.team2 }} />
              </div> 
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Livematch;
