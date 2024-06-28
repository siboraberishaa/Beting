import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useGetAllCommissionsQuery, useGetAllFinancesQuery, useGetCommissionsByUserIdQuery, useGetUserByIdQuery } from '../features/apiSlice';


const AgentCommissionData = ({ agentId, userCommissions }) => {
    const userId = agentId;
    const { data: user, isLoading, refetch } = useGetUserByIdQuery(userId);
  
    const singleGameCommissions = userCommissions.filter(commission => commission.gamesLength === 1);
    const totalPlayedSum = singleGameCommissions.reduce((total, commission) => total + commission.playedSum, 0);
  
    const commissionPercentage = user?.commissionS; // Replace with the actual field name in your user data if it is different
    const totalAfterCommission1 = totalPlayedSum - (totalPlayedSum * commissionPercentage / 100);

    const twoGameCommissions = userCommissions.filter(commission => commission.gamesLength === 2);
    const totalPlayedSum2 = twoGameCommissions.reduce((total, commission) => total + commission.playedSum, 0);
  
    const commissionPercentage2 = user?.commission2; // Replace with the actual field name in your user data if it is different
    const totalAfterCommission2 = totalPlayedSum2 - (totalPlayedSum2 * commissionPercentage2 / 100);

    const threeGameCommissions = userCommissions.filter(commission => commission.gamesLength >= 3);
    const totalPlayedSum3 = threeGameCommissions.reduce((total, commission) => total + commission.playedSum, 0);
  
    const commissionPercentage3 = user?.commission3; // Replace with the actual field name in your user data if it is different
    const totalAfterCommission3 = totalPlayedSum3 - (totalPlayedSum3 * commissionPercentage3 / 100);

    const totaltotal = totalAfterCommission1 + totalAfterCommission2 + totalAfterCommission3
  
    return (
        <div key={user?._id} style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'grey', padding: '10px', border: '1px solid #000', width: '100%'}}>
            <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%'}}>{user?.userName}</div>
            <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{totalAfterCommission1.toFixed(2)}</div>
            <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{totalAfterCommission2.toFixed(2)}</div>
            <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{totalAfterCommission3.toFixed(2)}</div>
            <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{totaltotal.toFixed(2)}</div>
        </div>
    );
  };

const Finances = () => {

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [startDate, setStartDate] = useState(formattedDate);
    const [endDate, setEndDate] = useState(formattedDate);
    const [filterApplied, setFilterApplied] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);


    const { data: finances } = useGetAllFinancesQuery({userId: userInfo?._id, isAdmin: !!userInfo?.isAdmin })
    const { data: commissions } = useGetAllCommissionsQuery()
    const { data: commissionsForAgent } = useGetCommissionsByUserIdQuery()


    const startDateAdjusted = startDate && new Date(new Date(startDate).setHours(0, 0, 0, 0));
    const endDateAdjusted = endDate && new Date(new Date(endDate).setHours(23, 59, 59, 999));


    const filteredFinances = finances?.filter(finance => {
    const createdAt = new Date(finance.createdAt);
    return (!filterApplied || ((!startDateAdjusted || createdAt >= startDateAdjusted) && (!endDateAdjusted || createdAt <= endDateAdjusted)));
    });

    const totalCommission = filteredFinances?.reduce((total, finance) => total + finance.commission, 0);
    const totalBet = filteredFinances?.reduce((total, finance) => total + finance.bet, 0);
    const totalOfTotal = filteredFinances?.reduce((total, finance) => total + finance.total, 0);
    const totalWin = filteredFinances?.reduce((total, finance) => total + finance.win, 0);
    const totalCancelled = filteredFinances?.reduce((total, finance) => total + finance.cancelled, 0);


    const commissionsByUser = commissions?.reduce((acc, commission) => {
        const userName = commission.agentId;
      
        // If this userName does not exist in the accumulator, initialize it
        if (!acc[userName]) {
          acc[userName] = [];
        }
      
        // Push this commission to the appropriate userName
        acc[userName].push(commission);
      
        return acc;
      }, {});

      
    



  return (
    <>
        <Navbar2 />
        {checkPermissions('finances', 'read') ?
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Financat</h3>
        </div>

        <div style={{display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-evenly', backgroundColor: 'transparent', paddingTop: '20px', paddingBottom: '20px'}}>
        <input onChange={(e) => setStartDate(e.target.value)} type='date' value={startDate} style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}} />
        <input onChange={(e) => setEndDate(e.target.value)} type='date' value={endDate} style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}/>


        <button onClick={() => setFilterApplied(true)} style={{width: '20%', backgroundColor: '#126e51', color: '#fff', border: 'none', fontWeight: '600'}}>Filtro</button>

        </div>
        <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'start'}}>Bastet - EUR</p>
        </div>

        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px', width: '100%'}}>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%'}}>Perdoruesi</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Komisioni</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Beti</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Fituara</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Anuluar</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Totali</div>
            </div>
            {filteredFinances?.length === 0 ? <div><p>Financat nuk u gjeten!</p></div> : filteredFinances?.map((finance) => (
            <div key={finance._id} style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'grey', padding: '10px', border: '1px solid #000', width: '100%'}}>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%'}}>{finance.player}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{finance.commission}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{finance.bet}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{finance.win}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{finance.cancelled}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>{finance.total.toFixed(2)}</div>
            </div>
            ))}
            
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px', width: '100%', alignItems: 'center'}}>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%'}}>Totali</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalCommission?.toFixed(2)}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalBet?.toFixed(2)}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalWin?.toFixed(2)}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalCancelled}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalOfTotal?.toFixed(2)}</div>
            </div>

        </div>

        {userInfo?.role === 'Manager' ? <>
        <div style={{backgroundColor: '#126e51', padding: '7px', marginTop: '90px'}}>
            <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'start'}}>Fitimet ditore</p>
        </div>
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px', width: '100%'}}>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%'}}>Perdoruesi</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Single</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>2</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>3+</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', width: '16.6%', textAlign: 'center'}}>Totali</div>
            </div>
            {commissionsByUser && Object.entries(commissionsByUser).map(([userName, userCommissions]) => {
               return <AgentCommissionData agentId={userName} userCommissions={userCommissions} />

                })}
            
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px', width: '100%', alignItems: 'center'}}>
            </div>

        </div>
        
        
        
        </> : null }

        {/*<div style={{backgroundColor: '#126e51', padding: '9px', marginTop: '30px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'start'}}>Casino - EUR</p>
        </div>

         <div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px'}}>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Perdoruesi</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Komisioni</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Beti</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Fituara</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Anuluar</div>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Totali</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'grey', padding: '10px', border: '1px solid #000'}}>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>Sample User</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>00.00</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>0.00</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>0.00</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>0.00</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif'}}>0.00</div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: '#cccccc', padding: '10px'}}>
                <div style={{fontSize: '20px',  fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Totali</div>
            </div>
        </div> */}
        </> : <div><h4>Not authorized!</h4></div> }
    </>
  )
}

export default Finances