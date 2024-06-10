import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useEditUsersUserNameMutation, useGetUserProfileQuery } from '../features/apiSlice';
import { Button, Collapse, Input, Select } from 'antd';
import Navbar2 from './Navbar2';
import { toast } from 'react-toastify';

const { Panel } = Collapse;

const PersonalInfo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, isError, refetch } = useGetUserProfileQuery({userId: userInfo?._id})

  const [userName, setUserName] = useState('');

  const [ editUserName ] = useEditUsersUserNameMutation()

  const handleUserName = async () => {
    try {
      await editUserName({ userId: user?._id, userName });
      toast.success('UserName updated successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };


  useEffect(() => {
    if (user) {
        setUserName(user.userName)
    }
}, [user])


  return (
    <>
    <Navbar2 />
    <div style={{marginTop: '50px'}}>
      <Collapse defaultActiveKey={['1']} style={{backgroundColor: '#939393', borderColor: '#939393'}}>
        <Panel header="Account Details" key="1">
          <div style={{ padding: '20px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <label htmlFor='input1'>UserName</label>
                <input id='input1' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} type='text' placeholder='username' value={userName} onChange={(e) => setUserName(e.target.value)} />
                <button type='button' onClick={handleUserName}>Ndrysho username</button>
              {/* <Input id='input1' placeholder="UserName" value={user?.userName} /> */}
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input2'>Role</label>
              <input id='input2' type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} placeholder="Role" value={user?.roleName} disabled />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input3'>Krediti</label>
              <input id='input3' type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} placeholder="Krediti" value={user?.credits} disabled />
            </div>
          </div>
          
        </Panel>
        <Panel header="User Information" key="2">
        <div style={{ padding: '20px'}}>
            <div>
              <label htmlFor='input4'>First Name</label>
              <input id='input4' type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} placeholder="First name" value={user?.firstName} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input5'>Last Name</label>
              <input id='input5' type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} placeholder="Last name" value={user?.lastName} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input6'>Date of birth</label>
              <input id='input6' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} placeholder="date of birth" value={user?.dateOfBirth} type='date' />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label for="input7">Citizenship</label>
              <select style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} id="input7">
                  <option value="select" disabled>Select</option>
                  <option value="Shqiptar">Shqiptar</option>
              </select>
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input8'>Country</label>
            <select style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} id="input8">
                  <option value="select" disabled>Select</option>
                  <option value="Kosove">Kosove</option>
              </select>
            </div>
            <div style={{paddingTop: '20px'}}>
            <label for="input9">City</label>
            <select id="input9" style={{width: '100%', padding: '10px', border:'1px solid #ddd'}}>
                <option value="select" disabled>Select</option>
                <option value="Prishtine">Prishtine</option>
                <option value="Mitrovice">Mitrovice</option>
                <option value="Pej">Pej</option>
                <option value="Prizren">Prizren</option>
                <option value="Ferizaj">Ferizaj</option>
                <option value="Gjilan">Gjilan</option>
                <option value="Gjakov">Gjakov</option>
            </select>
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input10'>Post code</label>
              <input type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} id='input10' placeholder="post code" value={user?.postCode} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input11'>Street</label>
              <input type='text' style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} id='input11' placeholder="street" value={user?.street} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input12'>Phone Number</label>
              <input style={{width: '100%', padding: '10px', border:'1px solid #ddd'}} id='input12' placeholder="phone number" value={user?.phoneNumber} type='number' />
            </div>
            <div style={{paddingTop: '20px'}}>
              <Button type='primary'>Ruaj ndryshimet</Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
    </>
  );
}

export default PersonalInfo;
