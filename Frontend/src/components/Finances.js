import React from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';

const Finances = () => {
  return (
    <>
        <Navbar2 />
        {checkPermissions('finances', 'read') ?
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Financat</h3>
        </div>

        <div style={{display: 'flex', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'space-evenly', backgroundColor: 'transparent', paddingTop: '20px'}}>
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}} />
        <input type='date' style={{width: '35%', height: '40px', backgroundColor: '#333333', color: '#fff', paddingLeft: '10px', paddingRight: '10px'}}/>

        <button style={{width: '20%', backgroundColor: '#126e51', color: '#fff', border: 'none', fontWeight: '600'}}>Filtro</button>

        </div>
        <div style={{backgroundColor: '#666', padding: '7px', marginTop: '10px'}}>
            <Input placeholder="kerko" variant="borderless" addonBefore={<SearchOutlined color='#fff' />}/>
        </div>
        <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'start'}}>Bastet - EUR</p>
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
        </div>

        <div style={{backgroundColor: '#126e51', padding: '9px', marginTop: '30px'}}>
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
        </div>
        </> : <div><h4>Not authorized!</h4></div> }
    </>
  )
}

export default Finances