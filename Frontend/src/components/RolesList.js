import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useGetRolesForAgentQuery, useGetRolesForManagerQuery, useGetRolesQuery } from '../features/apiSlice'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RolesList = () => {

    const navigate = useNavigate()

    const [list, setlist] = useState([])
    const [list2, setlist2] = useState([])
    const [list3, setlist3] = useState([])
    const [searchText, setSearchText] = useState('')
    const { userInfo } = useSelector((state) => state.auth);
    const {data: roles} = useGetRolesQuery()
    const {data: getRolesForManager} = useGetRolesForManagerQuery()
    const {data: getRolesForAgent} = useGetRolesForAgentQuery()

    useEffect(() => {
        if (roles || getRolesForAgent || getRolesForAgent) {
              
          setlist(roles)
          setlist2(getRolesForManager)
          setlist3(getRolesForAgent)
      }
    }, [roles, getRolesForManager, getRolesForManager])
    
    useEffect(() => {
      if (roles || getRolesForAgent || getRolesForAgent) {
          
          let filteredArray = roles?.filter(person => {
              console.log(person)
              return person.name?.toLowerCase().includes(searchText.toLowerCase()) 
              
          } )
          setlist(filteredArray);

          let filteredArray2 = getRolesForManager?.filter(person => {
              console.log(person)
              return person.name?.toLowerCase().includes(searchText.toLowerCase()) 
              
          } )
          setlist2(filteredArray2);

          let filteredArray3 = getRolesForAgent?.filter(person => {
              console.log(person)
              return person.name?.toLowerCase().includes(searchText.toLowerCase()) 
              
          } )
          setlist3(filteredArray3);
      }
    }, [roles, searchText])



  return (
    <>
        <Navbar2 />
        {checkPermissions('roles', 'read') ? 
        <>
        {userInfo?.isAdmin ? 
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Lista e roleve</h3>
        </div>

        <div style={{paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center'}}>Rolet</p>
            </div>
            <div style={{backgroundColor: '#666', padding: '7px'}}>
            <Input placeholder="kerko" onKeyUp={(e) => setSearchText(e.target.value)} variant="borderless" addonBefore={<SearchOutlined color='#fff' />}/>
            </div>
            <div style={{backgroundColor: '#126e51', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>ID</p>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Emri rolit</p>
            </div>
            {list?.map((usser) => (
                <div key={usser._id} onClick={() => navigate(`/role/${usser._id}`)} style={{backgroundColor: '#cccccc', border: '1px solid #666', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser._id}</p>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser.name}</p>
                </div>
            ))}
            

        </div></> : userInfo?.role === 'Manager' ? <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Lista e roleve</h3>
        </div>

        <div style={{paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center'}}>Rolet</p>
            </div>
            <div style={{backgroundColor: '#666', padding: '7px'}}>
            <Input placeholder="kerko" onKeyUp={(e) => setSearchText(e.target.value)} variant="borderless" addonBefore={<SearchOutlined color='#fff' />}/>
            </div>
            <div style={{backgroundColor: '#126e51', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>ID</p>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Emri rolit</p>
            </div>
            {list2?.map((usser) => (
                <div key={usser._id} onClick={() => navigate(`/role/${usser._id}`)} style={{backgroundColor: '#cccccc', border: '1px solid #666', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser._id}</p>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser.name}</p>
                </div>
            ))}
            

        </div>
        </> : userInfo?.role === 'Agent' ? <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Lista e roleve</h3>
        </div>

        <div style={{paddingTop: '10px', paddingLeft: '15px', paddingRight: '15px'}}>
            <div style={{backgroundColor: '#126e51', padding: '7px'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', textAlign: 'center'}}>Rolet</p>
            </div>
            <div style={{backgroundColor: '#666', padding: '7px'}}>
            <Input placeholder="kerko" onKeyUp={(e) => setSearchText(e.target.value)} variant="borderless" addonBefore={<SearchOutlined color='#fff' />}/>
            </div>
            <div style={{backgroundColor: '#126e51', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>ID</p>
                <p style={{color: '#fff', fontWeight: '600', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Emri rolit</p>
            </div>
            {list3?.map((usser) => (
                <div key={usser._id} onClick={() => navigate(`/role/${usser._id}`)} style={{backgroundColor: '#cccccc', border: '1px solid #666', padding: '7px', display: 'flex', justifyContent: 'space-between'}}>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser._id}</p>
                    <p style={{color: '#000', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{usser.name}</p>
                </div>
            ))}
            

        </div>
        </> : null }
        </> : <div><h4>Not authorized!</h4></div>}
    </>
  )
}

export default RolesList