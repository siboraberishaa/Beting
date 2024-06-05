import React from 'react';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../features/apiSlice';
import { Button, Collapse, Input, Select } from 'antd';
import Navbar2 from './Navbar2';

const { Panel } = Collapse;

const PersonalInfo = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, isError } = useGetUserProfileQuery({userId: userInfo?._id})

  console.log(user, 'user')

  return (
    <>
    <Navbar2 />
    <div style={{marginTop: '50px'}}>
      <Collapse defaultActiveKey={['1']} style={{backgroundColor: '#939393', borderColor: '#939393'}}>
        <Panel header="Account Details" key="1">
          <div style={{ padding: '20px'}}>
            <div>
              <label htmlFor='input1'>UserName</label>
              <Input id='input1' placeholder="UserName" value={user?.userName} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input2'>Role</label>
              <Input id='input2' placeholder="Role" value={user?.roleName} disabled />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input3'>Krediti</label>
              <Input id='input3' placeholder="Krediti" value={user?.credits} disabled />
            </div>
          </div>
          
        </Panel>
        <Panel header="User Information" key="2">
        <div style={{ padding: '20px'}}>
            <div>
              <label htmlFor='input4'>First Name</label>
              <Input id='input4' placeholder="First name" value={user?.firstName} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input5'>Last Name</label>
              <Input id='input5' placeholder="Last name" value={user?.lastName} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input6'>Date of birth</label>
              <Input id='input6' placeholder="date of birth" value={user?.dateOfBirth} type='date' />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input7'>Citizenship</label>
            <Select
                id='input7'
                defaultValue="Select"
                style={{
                  width: '100%',
                }}
                options={[
                  {
                    value: 'select',
                    label: 'Select',
                    disabled: true,
                  },
                  {
                    value: 'Shqiptar',
                    label: 'Shqiptar',
                  },
                  
                ]}
              />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input8'>Country</label>
            <Select
                id='input8'
                defaultValue="Select"
                style={{
                  width: '100%',
                }}
                options={[
                  {
                    value: 'select',
                    label: 'Select',
                    disabled: true,
                  },
                  {
                    value: 'Kosove',
                    label: 'Kosove',
                  },
                ]}
              />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input9'>City</label>
            <Select
                id='input9'
                defaultValue="Select"
                style={{
                  width: '100%',
                }}
                options={[
                  {
                    value: 'select',
                    label: 'Select',
                    disabled: true,
                  },
                  {
                    value: 'Prishtine',
                    label: 'Prishtine',
                  },
                  {
                    value: 'Mitrovice',
                    label: 'Mitrovice',
                  },
                  {
                    value: 'Pej',
                    label: 'Pej',
                  },
                  {
                    value: 'Prizren',
                    label: 'Prizren',
                  },
                  {
                    value: 'Ferizaj',
                    label: 'Ferizaj',
                  },
                  {
                    value: 'Gjilan',
                    label: 'Gjilan',
                  },
                  {
                    value: 'Gjakov',
                    label: 'Gjakov',
                  },
                  
                ]}
              />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input10'>Post code</label>
              <Input id='input10' placeholder="post code" value={user?.postCode} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input11'>Street</label>
              <Input id='input11' placeholder="street" value={user?.street} />
            </div>
            <div style={{paddingTop: '20px'}}>
            <label htmlFor='input12'>Phone Number</label>
              <Input id='input12' placeholder="phone number" value={user?.phoneNumber} type='number' />
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
