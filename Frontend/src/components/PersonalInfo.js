import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery, useUpdateUserMutation } from '../features/apiSlice';
import Navbar2 from './Navbar2';
import { toast } from 'react-toastify';


const PersonalInfo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery({userId: userInfo?._id})
  const [updateUser, { isLoading: isUpdating, error: updateError }] = useUpdateUserMutation();

  const [ userName, setUserName ] = useState('')
  const [ firstName, setFirstName] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ dateOfBirth, setDateOfBirth ] = useState('')
  const [ country, setCountry ] = useState('')
  const [ city, setCity ] = useState('')
  const [ postalCode, setPostalCode ] = useState('')
  const [ street, setStreet ] = useState('')


  const handleSubmit = async () => {
    try {
        const updatedUser = await updateUser({
            userId: userInfo?._id,
            firstName,
            lastName,
            userName,
            dateOfBirth,
            country,
            city,
            postalCode: postalCode,
            street,
        });
        toast.success('User updated successfully');
    } catch (error) {
        toast.error('Failed to update user');
    }
};



 useEffect(() => {

  if(user){
    setUserName(user.userName)
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setDateOfBirth(user.dateOfBirth)
    setCountry(user.country)
    setCity(user.city)
    setPostalCode(user.postalCode)
    setStreet(user.street)
  }

 }, [user])

  return (
    <>
    <Navbar2 />

    <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
      <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Informacionet personale</h3>
    </div>
        <div style={{backgroundColor: '#666'}}>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='1'>Username</label>
                <input value={userName} onChange={(e) => setUserName(e.target.value)} style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='1' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='2'>Roli</label>
                <input value={user?.roleName} style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='2' type='text' disabled={true} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='3'>Kreditat</label>
                <input value={user?.credits}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='3' type='text' disabled={true} />
            </div>
        </div>

        <div style={{backgroundColor: '#666', paddingTop: '30px', paddingBottom: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='4'>Emri</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='4' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='5'>Mbiemri</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='5' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='6'>Data e lindjes</label>
                <input value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='6' type='date' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='7'>Shteti</label>
                <input value={country} onChange={(e) => setCountry(e.target.value)}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='7' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='8'>Qyteti</label>
                <input value={city} onChange={(e) => setCity(e.target.value)}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='8' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='9'>Kodi postar</label>
                <input value={postalCode} onChange={(e) => setPostalCode(e.target.value)}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='9' type='text' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='10'>Vendbanimi</label>
                <input value={street} onChange={(e) => setStreet(e.target.value)}  style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='10' type='text' />
            </div>

            <div style={{ textAlign: 'center', paddingTop: '30px' }}>
            <button onClick={handleSubmit} style={{ width: '90%', fontWeight: '400', textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer', border: '1px solid transparent', padding: '.375rem .75rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '.25rem', color: '#fff', backgroundColor: '#126e51', borderColor: '#126e51' }} >
                Submit
            </button>
            </div>
        </div>
    
    </>
  );
}



export default PersonalInfo;
