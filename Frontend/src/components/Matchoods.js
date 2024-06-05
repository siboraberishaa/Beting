import React, { useState } from 'react';
import './Index.css';
import searchImage from '../assets/search.png';
import { Link, useParams } from 'react-router-dom';
import { useGetOddsPerGameQuery } from '../features/apiSlice';
import Navbar from './Navbar';

function MatchOdds() {
    const { eventId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const { data: oddsPerGame, isLoading, isError } = useGetOddsPerGameQuery(eventId);

    console.log(oddsPerGame, 'oddspergame');

    return (
        <>
        <Navbar />
        <div className='div'>
            <div className='div-sports1'></div>

            <div className='div-sports'>
                <div className='rezult-match-div'>
                    <p>{oddsPerGame?.team1}</p>
                    <div className='point'>{oddsPerGame?.score}</div>
                    <p>{oddsPerGame?.team2}</p>
                </div>



                <div className='div-market'>
                  <div className='div-market-se'>
                    <form onSubmit=''>
                        <div className='search-match'>
                            <input
                                type='text'
                                placeholder='Search Market'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className='search-input-match'
                            />
                            <button type='submit' className='search-button'>
                                <img src={searchImage} alt='Search' style={{ width: '20px', height: '20px' }} /> {/* Përdorimi i imazhit të kërkimit */}
                            </button>
                        </div>
                    </form>
                  </div>
                </div>

                <div className='linqet'>
                    <p>Kryesore</p>
                    <p>Golat</p>
                    <p>Handikap</p>
                    <p>Gola Aziatik</p>
                    <p>Ekipet</p>
                </div>
  
                {oddsPerGame &&
                    oddsPerGame.markets.map((market, index) => {
                        if (index === 0 || oddsPerGame.markets[index - 1]?.group !== market.group) {
                            return (
                                <React.Fragment key={index}>
                                    <div className='customDiv'> 
                                        <p>{market.group}</p>
                                    </div>
                                    <div className='outerDiv'>
                                        <div className='innerDiv'> 
                                            <div className='nestedDiv1'>
                                            <p>{market.n2}</p>
                                            </div>
                                            <div className='nestedDiv2'>
                                            <p>{market.group === 'Final Score' ? '{na}' : ''}{market.coef}</p>
                                            </div>
                                        </div>
                                    </div> 
                                </React.Fragment>
                            );
                        } else{
                            return ( 
                                <div className='outerDiv' key={index}>
                                    <div className='innerDiv'> 
                                        <div className='nestedDiv1'>
                                        <p>{market.n2}</p>
                                        </div>
                                        <div className='nestedDiv2'>
                                        <p id='p-k'>{market.group === 'Final Score' ? market.na : ''}</p>
                                        <p> {market.coef}</p>
                                        </div>
                                    </div>
                                </div> 
                            );
                        }
                    })}
            </div>

            <div className='div-sports2'></div>
        </div>
        </>
    );
}

export default MatchOdds;
