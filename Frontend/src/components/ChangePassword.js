import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation, usePasswordMutation } from '../features/apiSlice'
import { toast } from 'react-toastify'
import { logout, setCredentials } from '../features/authSlice'

const ChangePassword = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordChange] = usePasswordMutation();
    const [logoutApiCall] = useLogoutMutation();

    const passwordHandler = async () => {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
        } else {
          try {
            const data = {
              oldPassword: oldPassword,
              newPassword: password,
            };
    
            const pass = await passwordChange(data).unwrap();
            dispatch(setCredentials({ ...pass }));
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate("/");
            toast.success("Passwordi u ndryshua. Ju duhet te kyqeni perseri!");
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };

  return (
    <>
        <Navbar2 />
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Ndrysho Passwordin</h3>
        </div>

        <div style={{backgroundColor: '#666', height: '500px'}}>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='1'>Passwordi tanishem</label>
                <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='passwordi tanishem' style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='1' type='password' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='2'>Passwordi i ri</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='passwordi i ri' style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='2' type='password' />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', paddingLeft: '30px', paddingRight: '30px', paddingTop: '30px'}}>
                <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif' }} htmlFor='3'>Konfirmo passwordin e ri</label>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='konfirmo passwordin e ri' style={{color: '#fff', backgroundColor: '#444444', border: 'none', padding: '10px'}} id='3' type='password' />
            </div>

            <div
            style={{ textAlign: 'center', paddingTop: '30px' }}
            >
            <button style={{ display: 'block', width: '100%', fontWeight: '400', textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer', border: '1px solid transparent', padding: '.375rem .75rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '.25rem', color: '#fff', backgroundColor: '#126e51', borderColor: '#126e51' }} onClick={passwordHandler}>
                Submit
            </button>
            </div>
        </div>
    </>
  )
}

export default ChangePassword