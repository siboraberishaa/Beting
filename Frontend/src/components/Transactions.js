import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useGetAllTicketsQuery, useGetAllUsersQuery } from '../features/apiSlice'
import { useSelector } from 'react-redux'

const Transactions = () => {

    const [selectedUser, setSelectedUser] = useState('all');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterApplied, setFilterApplied] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);


    const { data: users } = useGetAllUsersQuery(userInfo?._id)
    const { data: tickets } = useGetAllTicketsQuery()


    const startDateAdjusted = startDate && new Date(startDate.setHours(0, 0, 0, 0));
    const endDateAdjusted = endDate && new Date(endDate.setHours(23, 59, 59, 999));

    const filteredTickets = tickets?.filter(ticket => {
    const createdAt = new Date(ticket.createdAt);
    return (selectedUser === 'all' || ticket.userName === selectedUser) &&
            (!filterApplied || ((!startDateAdjusted || createdAt >= startDateAdjusted) && (!endDateAdjusted || createdAt <= endDateAdjusted)));
    });
      
      

  return (
    <>
        <Navbar2 />
        {checkPermissions('transactions', 'read') ? 
            
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Transaksionet</h3>
        </div>

        <div style={{display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-evenly', backgroundColor: 'transparent', paddingTop: '20px'}}>
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
        onChange={(e) => setStartDate(new Date(e.target.value))} />
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
       onChange={(e) => setEndDate(new Date(e.target.value))} />

        <button style={{width: '20%', backgroundColor: '#126e51', color: '#fff', border: 'none', fontWeight: '600'}}
        onClick={() => setFilterApplied(true)}>Filtro</button>

        </div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px', backgroundColor: 'transparent', paddingTop: '20px'}}>
        <select style={{width: '100%', border: 'none', height: '30px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
                onChange={(e) => setSelectedUser(e.target.value)}>
            <option selected value="all">All</option>
            {users?.map((user) => (
                <option key={user._id} value={user.userName}>{user.userName}</option>
            ))}
        </select>

        </div>
    <div>
    {filteredTickets?.length === 0 ? <div><p>Transaksioni nuk u gjet!</p></div> : 
    filteredTickets?.map((ticket) => (
        <div key={ticket._id} style={{paddingBottom: '20px'}}>
        <div style={{width: '100%', backgroundColor: '#126e51', height: '30px', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginLeft: '20px'}}>Coupon Gain - Single Coupon</p>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginRight: '20px'}}>-{ticket.playedSum} EUR</p>
        </div>
        <div style={{width: '100%', backgroundColor: '#333333', height: '30px', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginLeft: '20px'}}>Ticket: {ticket.ticketId}</p>
            <p style={{color: '#126e51', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginRight: '20px'}}>{ticket.ticketWin} EUR</p>
        </div>
    </div>
    ))}
    

</div>



        </> : <div>
            <h4>Not authorized</h4>
        </div>}
    </>
  )
}

export default Transactions