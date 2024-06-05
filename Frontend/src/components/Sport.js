import React from 'react' 
import SportsList from './SportsList';
import './Index.css'; 
import Navbar from './Navbar';

 function Sport() {
  return (
    <>
    <Navbar />
    <div className='div'> 
      <div className='div-sports1'> </div>
       <SportsList />   
       <div className='div-sports2'> </div>
    </div>
    </>
  )
}


export default Sport;
