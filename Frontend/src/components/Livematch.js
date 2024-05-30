import React, { useEffect, useState } from 'react';
import { useGetInPlayOdssQuery, useGetOddsPerGameQuery } from '../features/apiSlice';
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { addBets, deleteBet } from '../features/betSlice';

const MatchOdds = ({ eventId, teams }) => {

  const dispatch = useDispatch();
  
  const { data: odds, isLoading, isError } = useGetOddsPerGameQuery(eventId);
  const [isClicked, setIsClicked] = useState(false)
  const [isClicked1, setIsClicked1] = useState(false)
  const [isClicked2, setIsClicked2] = useState(false)

  console.log(odds, 'odds')

  if (isLoading) return <div>Loading odds...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  // const fulltimeResultOdds = odds?.markets?.filter(odd => odd.group === 'Fulltime Result');

  const handleOddClick0 = (coef, teams) => {
    const bets = JSON.parse(localStorage.getItem("bets"));
    const existingBetIndex = bets.betItems.findIndex(bet => bet.coef === Number(coef).toFixed(2));
  
    if (existingBetIndex !== -1) {
      // If the bet already exists in the local storage, remove it
      dispatch(deleteBet(existingBetIndex));
    } else {
      // If the bet doesn't exist in the local storage, add it
      dispatch(addBets({
        coef: Number(coef).toFixed(2),
        teams: teams
      }));
    }
  
    setIsClicked(prevState => !prevState);
  };
  
  // Do the same for handleOddClick1 and handleOddClick2
  

  const handleOddClick1 = (coef, teams) => {
    const bets = JSON.parse(localStorage.getItem("bets"));
    const existingBetIndex = bets.betItems.findIndex(bet => bet.coef === Number(coef).toFixed(2));
  
    if (existingBetIndex !== -1) {
      // If the bet already exists in the local storage, remove it
      dispatch(deleteBet(existingBetIndex));
    } else {
      // If the bet doesn't exist in the local storage, add it
      dispatch(addBets({
        coef: Number(coef).toFixed(2),
        teams: teams
      }));
    }
  
    setIsClicked1(prevState => !prevState);
  };

  const handleOddClick2 = (coef, teams) => {
    const bets = JSON.parse(localStorage.getItem("bets"));
    const existingBetIndex = bets.betItems.findIndex(bet => bet.coef === Number(coef).toFixed(2));
  
    if (existingBetIndex !== -1) {
      // If the bet already exists in the local storage, remove it
      dispatch(deleteBet(existingBetIndex));
    } else {
      // If the bet doesn't exist in the local storage, add it
      dispatch(addBets({
        coef: Number(coef).toFixed(2),
        teams: teams
      }));
    }
  
    setIsClicked2(prevState => !prevState);
  };

  return (
    <>
      <div className='d-odd' style={{backgroundColor: isClicked ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick0(odds?.markets[0]?.coef, teams)} >  
      <p style={{color: isClicked ? '#1c2d23' : ''}} id='p-n2'>{!isNaN(odds?.markets[0]?.n2) ? Number(odds?.markets[0]?.n2).toFixed(2) : ''}</p>
      <p>{!isNaN(odds?.markets[0]?.coef) ? Number(odds?.markets[0]?.coef).toFixed(2) : ''}</p> 
    </div>
      <div className='d-odd' style={{backgroundColor: isClicked1 ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick1(odds?.markets[1]?.coef, teams)} >  
      <p style={{color: isClicked1 ? '#1c2d23' : ''}} id='p-n2'>{!isNaN(odds?.markets[1]?.n2) ? Number(odds?.markets[1]?.n2).toFixed(2) : ''}</p>
      <p >{!isNaN(odds?.markets[1]?.coef) ? Number(odds?.markets[1]?.coef).toFixed(2) : ''}</p> 
    </div>
      <div className='d-odd' style={{backgroundColor: isClicked2 ? '#fff' : '', cursor: 'pointer'}} onClick={() => handleOddClick2(odds?.markets[2]?.coef, teams)} >  
      <p style={{color: isClicked2 ? '#1c2d23' : ''}} id='p-n2'>{!isNaN(odds?.markets[2]?.n2) ? Number(odds?.markets[2]?.n2).toFixed(2) : ''}</p>
      <p >{!isNaN(odds?.markets[2]?.coef) ? Number(odds?.markets[2]?.coef).toFixed(2) : ''}</p> 
    </div>
    </>
  );
};



 




const Livematch = () => {
  const navigate = useNavigate()
  const { data: sports, isLoading, isError } = useGetInPlayOdssQuery();
  const [selectedMatch, setSelectedMatch] = useState(null);

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
  
  const handleMatchClick = (match) => {
    setSelectedMatch(match);
    navigate(`/matchoods/${match.eventId}`);
  };









  

  return (
    <div className='div-sports'>
 
                         
 
      {sports?.map((match, index) => (
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

          <MatchOdds eventId={match.eventId} teams={{team1: match.team1, team2: match.team2}} />
        </div>
      ))}
    </div>
  );
};

export default Livematch;
