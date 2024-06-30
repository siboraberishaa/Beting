import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { useSelector } from 'react-redux';
import { useGetAllUsersQuery, useGetUserProfileQuery } from '../features/apiSlice';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { checkPermissions } from '../functions/Permissions';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {

  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  const { data: user, isLoading, isError } = useGetUserProfileQuery({userId: userInfo?._id})
  const { data: users } = useGetAllUsersQuery({userId: userInfo?._id, isAdmin: !!userInfo?.isAdmin})
  const [list, setlist] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (users) {
          
      setlist(users)
  }
}, [users])

useEffect(() => {
  if (users) {
      
      let filteredArray = users?.filter(person => {
          console.log(person)
          return person.userName?.toLowerCase().includes(searchText.toLowerCase()) 
          
      } )
      setlist(filteredArray);
  }
}, [users, searchText])

  return (
    <>
        <Navbar2 />
        {checkPermissions('users', 'read') ? 
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Lista e perdorueseve</h3>
        </div>

        {userInfo?.isAdmin ? null : <div style={{paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif'}}>Bilanci im</p>
            </div>
            <div style={{backgroundColor: '#666', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'end', fontSize: '14px'}}>EUR</p>
            </div>
            <div style={{backgroundColor: '#cccccc', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                <p style={{color: '#000', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Kredit</p>
                <p style={{color: '#000', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{user?.credits}</p>
            </div>

        </div>}
        <div style={{paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center'}}>Balanca e perdorueseve</p>
            </div>
            <div style={{backgroundColor: '#666', padding: '7px'}}>
            <Input placeholder="kerko" onKeyUp={(e) => setSearchText(e.target.value)} variant="borderless" addonBefore={<SearchOutlined color='#fff' />}/>
            </div>
            <div style={{backgroundColor: '#126e51', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Perdoruesi</p>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>EUR</p>
            </div>
            {list?.map((usser) => (
                <div key={usser._id} onClick={() => navigate(`/user/${usser._id}`)} style={{backgroundColor: '#cccccc', border: '1px solid #666', padding: '7px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser.userName}</p>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser.credits.toFixed(2)}</p>
                </div>
            ))}
            

        </div>
        </> : <div>
            <h4>Not authorized</h4>
        </div>}
    </>
  )
}

export default UsersList