import React, { useState } from 'react'
import Navbar2 from './Navbar2'
import { useNavigate } from 'react-router-dom';
import { useGetRolesForAgentQuery, useGetRolesForManagerQuery, useGetRolesQuery, useRegisterUserMutation } from '../features/apiSlice';
import { toast } from 'react-toastify';
import { checkPermissions } from '../functions/Permissions';
import { Button, Form, Input, Select } from 'antd';
import { useSelector } from 'react-redux';


const { Option } = Select;



const RegisterUser = () => {

    const [form] = Form.useForm();
   
  const navigate = useNavigate();

  const [register, { isLoading, }] = useRegisterUserMutation();
  
  const { userInfo } = useSelector((state) => state.auth);
  
  const {data: rolesData} = useGetRolesQuery()
  const {data: getRolesForManager} = useGetRolesForManagerQuery()
  const {data: getRolesForAgent} = useGetRolesForAgentQuery()

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        await register({ userName: values.userName, password: values.password, rolesId: values.role, userId: userInfo?._id }).unwrap();
        // dispatch(setCredentials({ ...res }));
        // navigate(`/admin/user/${registerData._id}/edit`);
        toast.success('User registered successfully!')
        form.resetFields();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  
  return (
    <>
      <Navbar2 />
      {checkPermissions('users', 'create') ? 
        <>
          <div style={{paddingLeft: '15px', paddingRight: '15px', paddingTop: '20px'}}>
            <Form
              layout={'vertical'}
              form={form}
              onFinish={onFinish}
              style={{ width: '100%' }}
            >
              <Form.Item label="Perdoruesi" name="userName" rules={[{ required: true, message: 'zgjidhni nje userName!' }]}>
                <Input style={{backgroundColor: '#3A3A3A', border: 'none', height: '40px'}} placeholder="username" />
              </Form.Item>
              <Form.Item label="Fjalekalimi" name="password" rules={[{ required: true, message: 'shtoni passwordin!' }]}>
                <Input.Password style={{backgroundColor: '#3A3A3A', border: 'none', height: '40px'}} placeholder="fjalekalimi" />
              </Form.Item>
              <Form.Item label="Konfirmo fjalekalimin" name="confirmPassword" rules={[{ required: true, message: 'konfirmo passwordin!' }]}>
                <Input.Password style={{backgroundColor: '#3A3A3A', border: 'none', height: '40px'}} placeholder="konfirmo fjalekalimin" />
              </Form.Item>
              {userInfo?.isAdmin ? <Form.Item label="Selekto rolin" name="role" rules={[{ required: true, message: 'sekeltoni nje rol!' }]}>
                <Select style={{ width: '100%' }} className='selector' defaultValue='Select'>
                  <Option disabled>Select</Option>
                  {rolesData && rolesData.map((rl) => (
                    <Option key={rl._id} value={rl._id}>
                      {rl.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> : userInfo?.role === 'Manager' ? <Form.Item label="Selekto rolin" name="role" rules={[{ required: true, message: 'sekeltoni nje rol!' }]}>
                <Select style={{ width: '100%' }} className='selector' defaultValue='Select'>
                  <Option disabled>Select</Option>
                  {getRolesForManager && getRolesForManager.map((rl) => (
                    <Option key={rl._id} value={rl._id}>
                      {rl.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> : userInfo?.role === 'Agent' ? <Form.Item label="Selekto rolin" name="role" rules={[{ required: true, message: 'sekeltoni nje rol!' }]}>
                <Select style={{ width: '100%' }} className='selector' defaultValue='Select'>
                  <Option disabled>Select</Option>
                  {getRolesForAgent && getRolesForAgent.map((rl) => (
                    <Option key={rl._id} value={rl._id}>
                      {rl.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> : null }
              <Form.Item>
                <Button loading={isLoading} type="primary" htmlType="submit">Regjistro perdoruesin</Button>
              </Form.Item>
            </Form>
          </div>
        </> : <div>
          <h4>Not authorized</h4>
        </div>}
    </>
  )
  
}

export default RegisterUser