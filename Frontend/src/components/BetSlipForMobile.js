import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useCreateTicketMutation, useGetUserProfileQuery } from '../features/apiSlice';
import { clearBets, clearOdds, deleteBet, toggleOdd } from '../features/betSlice';
import { Button } from 'antd';
import { toast } from 'react-toastify';

const BetSlipForMobile = () => {

    const [price, setPrice] = useState(0);
    const dispatch = useDispatch()

    const bets = useSelector((state) => state.bets.betItems) 
    const { userInfo } = useSelector((state) => state.auth);

    const [ createTicket, {isLoading: load} ] = useCreateTicketMutation();
    const { data: user, refetch: refetchUser } = useGetUserProfileQuery({userId: userInfo?._id});



    const handlePriceChange = (event) => {
        setPrice(event.target.value);
      };

      const handleDeleteClick = (id) => {
        dispatch(deleteBet(id));
        dispatch(toggleOdd(id));
      };

      
    
      let totalCoef = 1;
    if (Array.isArray(bets)) {
      totalCoef = bets.reduce((total, bet) => total * bet.coef, 1);
    }
    
      const winningChance = price * totalCoef;

      const submitTicket = async() => {
        try {
            const ticketType = bets?.length > 1 ? 'Combined' : 'Single';
      
            // Create an array of games from the bets
            const games = bets?.map(bet => ({
                team1: bet.teams.team1,
                team2: bet.teams.team2,
                coefficientPlayed: bet.n2,
                eventId: bet.eventId,
                startTime: bet.timer
            }));
      
            const response = await createTicket({
                userName: userInfo?.userName,
                ticketWin: winningChance.toFixed(2),
                playedSum: parseFloat(price),
                playerOf: user?.registeredBy,
                playerId: userInfo?._id,
                ticketType: ticketType, 
                games: games, 
            })

            console.log('Response:', response);
            
            if (response.data) {
              toast.success('Ticket created successfully')
              setPrice(null)
              dispatch(clearBets())
              dispatch(clearOdds())
              refetchUser()
            }else if (response.error) {
              toast.error(response.error.data.message);
            }
        } catch (err) {
          console.error('Error object:', err);
          const errorMessage = err?.error?.data?.message || err.message || "An unknown error occurred";
          toast.error(errorMessage);
      }
    }
    

  return (
    <div style={bets?.length === 0 ? {display: 'none'} : {display: 'block'}} className="bet-slip-container2">
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
                  <p className="winning-chance-rezult">{price?.length !== 0 ? winningChance.toFixed(2) : '0.00'}</p>
                </div>
              </div>

              <div className="place-bet-section">
                <Button disabled={!price} loading={load} style={{backgroundColor: '#4b4b4b', border: 'none', color: 'white', width: '100%', height: '100%', textAlign: 'center', display: 'inline-block', fontSize: '16px', cursor: 'pointer'}} onClick={submitTicket}>Place Bet</Button>    
              </div>
            </div>
          </div>
  )
}

export default BetSlipForMobile