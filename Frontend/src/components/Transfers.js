import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useGetAllTransfersQuery, useGetAllUsersQuery } from '../features/apiSlice'
import moment from 'moment';
import { useSelector } from 'react-redux';

const Transfers = () => {

    const [selectedUser, setSelectedUser] = useState('all');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterApplied, setFilterApplied] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const { data: users } = useGetAllUsersQuery({userId: userInfo?._id, isAdmin: !!userInfo?.isAdmin, isAgent: !!userInfo?.isAgent})
    const { data: transfers } = useGetAllTransfersQuery()

    const startDateAdjusted = startDate && new Date(startDate.setHours(0, 0, 0, 0));
    const endDateAdjusted = endDate && new Date(endDate.setHours(23, 59, 59, 999));

    const filteredTransfers = transfers?.filter(transfer => {
    const createdAt = new Date(transfer.createdAt);
    return (selectedUser === 'all' || transfer.transferTo === selectedUser) &&
            (!filterApplied || ((!startDateAdjusted || createdAt >= startDateAdjusted) && (!endDateAdjusted || createdAt <= endDateAdjusted)));
    });


  return (
    <>
        <Navbar2 />
        {checkPermissions('transfers', 'read') ? 
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Transfertat</h3>
        </div>
        <div style={{display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-evenly', backgroundColor: 'transparent', paddingTop: '20px'}}>
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
        onChange={(e) => setStartDate(new Date(e.target.value))} />
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
       onChange={(e) => setEndDate(new Date(e.target.value))} />

        <button style={{width: '20%', backgroundColor: '#126e51', color: '#fff', border: 'none', fontWeight: '600'}}
        onClick={() => setFilterApplied(true)}>Filtro</button>

        </div>
        {userInfo?.role !== 'Player' ? <div style={{ paddingLeft: '20px', paddingRight: '20px', backgroundColor: 'transparent', paddingTop: '20px'}}>
        <select style={{width: '100%', border: 'none', height: '30px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}
                onChange={(e) => setSelectedUser(e.target.value)}>
            <option selected value="all">All</option>
            {users?.map((user) => (
                <option key={user._id} value={user.userName}>{user.userName}</option>
            ))}
        </select>

        </div> : null}

        <div>
        {filteredTransfers?.length === 0 ? <div><p>Transferi nuk u gjet!</p></div> : 
        filteredTransfers?.map((transfer) => (
        <div key={transfer._id} style={{paddingTop: '20px'}}>
        <div style={{width: '100%', backgroundColor: '#9c4646', height: '30px', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginLeft: '20px'}}>Prej: {transfer.transferFrom}</p>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginRight: '20px'}}>Te: {transfer.transferTo}</p>
        </div>
        <div style={{width: '100%', backgroundColor: '#333333', height: '30px', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginLeft: '20px'}}>Data: {moment(transfer.createdAt).format('DD.MM.YYYY, HH:mm')} </p>
            <p style={{color: '#126e51', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px', fontWeight: '600', marginRight: '20px'}}>{transfer.transferSum} EUR</p>
        </div>
    </div>) ) }
    

</div>

        </> : <div><h4>Not authorized! </h4></div>}
    </>
  )
}

export default Transfers