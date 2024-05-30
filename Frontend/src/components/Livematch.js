import React, { useEffect, useState } from 'react';
import { useGetInPlayOdssQuery, useGetOddsPerGameQuery } from '../features/apiSlice';
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';
import { addBets } from '../features/betSlice';

const MatchOdds = ({ eventId, teams }) => {

  const dispatch = useDispatch();
  
  const { data: odds, isLoading, isError } = useGetOddsPerGameQuery(eventId);

  if (isLoading) return <div>Loading odds...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  // Filter the markets to only include items where the group is "Fulltime Result"
  const fulltimeResultOdds = odds?.markets?.filter(odd => odd.group === 'Fulltime Result');

  const handleOddClick = (odd, teams) => {
    dispatch(addBets({
      coef: odd.coef,
      teams: teams
    }));
  };

  return (
    fulltimeResultOdds?.map((odd, index) => (
      <div className='d-odd' onClick={() => handleOddClick(odd, teams)}>  
      <p id='p-n2'>{!isNaN(odd.n2) ? Number(odd.n2).toFixed(2) : ''}</p>
      <p>{!isNaN(odd.coef) ? Number(odd.coef).toFixed(2) : ''}</p> 
    </div>
    ))
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
