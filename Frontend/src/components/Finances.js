import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useGetAllFinancesQuery } from '../features/apiSlice';

const Finances = () => {


    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filterApplied, setFilterApplied] = useState(false);
    const { userInfo } = useSelector((state) => state.auth);


    const { data: finances } = useGetAllFinancesQuery({userId: userInfo?._id, isAdmin: !!userInfo?.isAdmin, isAgent: !!userInfo?.isAgent })


    const startDateAdjusted = startDate && new Date(startDate.setHours(0, 0, 0, 0));
    const endDateAdjusted = endDate && new Date(endDate.setHours(23, 59, 59, 999));

    const filteredFinances = finances?.filter(finance => {
    const createdAt = new Date(finance.createdAt);
    return (!filterApplied || ((!startDateAdjusted || createdAt >= startDateAdjusted) && (!endDateAdjusted || createdAt <= endDateAdjusted)));
    });

    const totalCommission = filteredFinances?.reduce((total, finance) => total + finance.commission, 0);
    const totalBet = filteredFinances?.reduce((total, finance) => total + finance.bet, 0);
    const totalOfTotal = filteredFinances?.reduce((total, finance) => total + finance.total, 0);
    const totalWin = filteredFinances?.reduce((total, finance) => total + finance.win, 0);
    const totalCancelled = filteredFinances?.reduce((total, finance) => total + finance.cancelled, 0);

    



  return (
    <>
        <Navbar2 />
        {checkPermissions('finances', 'read') ?
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Financat</h3>
        </div>

        <div style={{display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-evenly', backgroundColor: 'transparent', paddingTop: '20px', paddingBottom: '20px'}}>
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}} />
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}/>

        <button style={{width: '20%', backgroundColor: '#126e51', color: '#fff', border: 'none', fontWeight: '600'}}>Filtro</button>

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
            <div style={{display: 'flex', justifyContent: 'space-between', backgroundColor: 'grey', padding: '10px', border: '1px solid #000', width: '100%'}}>
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
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalWin}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalCancelled}</div>
                <div style={{fontSize: '20px', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: '600', width: '16.6%', textAlign: 'center'}}>{totalOfTotal?.toFixed(2)}</div>
            </div>

        </div>

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