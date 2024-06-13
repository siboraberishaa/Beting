import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useParams } from 'react-router-dom'
import { useCreateTransferMutation, useEditUsersCommissionMutation, useEditUsersDescriptionMutation, useEditUsersUserNameMutation, useGetUserByIdQuery, useUpdateUsersStatusMutation } from '../features/apiSlice'
import { Modal, Switch } from 'antd'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const UserInfo = () => {

    const { id: userId } = useParams()

    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const [modal5Open, setModal5Open] = useState(false);
    const [userName, setUserName] = useState('');
    const [description, setDescription] = useState('');
    const [commissionS, setCommissionS] = useState(0);
    const [commission2, setCommission2] = useState(0);
    const [commission3, setCommission3] = useState(0);

    const { userInfo } = useSelector((state) => state.auth);

    const { data: user, isLoading, isError, refetch } = useGetUserByIdQuery(userId)
    const [ createTransfer ] = useCreateTransferMutation()
    const [ editUserName ] = useEditUsersUserNameMutation()
    const [ editDescription ] = useEditUsersDescriptionMutation()
    const [ updateUserStatus ] = useUpdateUsersStatusMutation()
    const [ updateUserCommission ] = useEditUsersCommissionMutation()


    const [transferSum, setTransferSum] = useState(0);
    const [userCredits, setUserCredits] = useState(0);


    const handleButtonClick = (value) => {
      setTransferSum(value);
    };

    const displaySum = userCredits + transferSum
    

    const handleSubmit = async () => {
        try {
          await createTransfer({ transferFrom: userInfo?.userName, transferTo: user?.userName, transferSum: transferSum, transferToId: user?._id  });
          toast.success('Transfer created successfully')
          refetch()
          setModal2Open(false)
          setTransferSum(0)
        } catch (error) {
          console.log(error, 'error while making transfer');
        }
      };

      const handleUserName = async () => {
        try {
          await editUserName({ userId, userName });
          toast.success('UserName updated successfully');
          setModal1Open(false)
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

      const handleDescription = async () => {
        try {
          await editDescription({ userId, description });
          toast.success('Shenimi u perditesua');
          setModal5Open(false)
          refetch();
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

      const statusHandler = async () => {
        try {
          const newStatus = !user.status;
          await updateUserStatus({ userId, status: newStatus })
          toast.info('Status changed')
          refetch()
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
      };

      const handleCommission = async () => {
        try {
          const response = await updateUserCommission({ userId, commissionS, commission2, commission3 });
      
          // Check if the response indicates a failure
          if (response.error) {
            throw response.error; // Throw the error object directly
          }
          toast.success('Komisioni u perditesua');
          setModal3Open(false)
          refetch();
        } catch (err) {
          const errorMessage = err.data?.message || JSON.stringify(err);
          toast.error(errorMessage);
          setCommissionS(user?.commissionS)
          setCommission2(user?.commission2)
          setCommission3(user?.commission3)
        }
        
      };
      
      
      
      
      
    useEffect(() => {
        if (user) {
            setUserName(user.userName)
            setDescription(user.description)
            setCommissionS(user.commissionS)
            setCommission2(user.commission2)
            setCommission3(user.commission3)
            setUserCredits(user.credits)
        }
    }, [user])
      


    

  return (
    <>
        <Navbar2 />
        {checkPermissions('users', 'read') ? 
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Detajet - {user?.userName} </h3>
        </div>

        <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff'}}>
                <p style={{color: '#fff',fontFamily: 'Arial, Helvetica, sans-serif'}}>Hyrja e fundit</p>
            </div>
        </div>
        <div style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={() => setModal1Open(true)}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Ndrysho username</p>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{user?.userName}</p>
            </div>
        </div>
        {userInfo?.role !== 'Agent' ? 
        <div style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={() => setModal3Open(true)}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff'}}>
                <p style={{color: '#fff',fontFamily: 'Arial, Helvetica, sans-serif'}}>Komisioni</p>
            </div>
        </div> : null}
        <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff'}} onClick={() => setModal4Open(true)}>
                <p style={{color: '#fff',fontFamily: 'Arial, Helvetica, sans-serif'}}>Perqindja</p>
            </div>
        </div>
        <div style={{paddingLeft: '10px', paddingRight: '10px'}} onClick={() => setModal5Open(true)}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff'}}>
                <p style={{color: '#fff',fontFamily: 'Arial, Helvetica, sans-serif'}}>Shenim</p>
            </div>
        </div>
        <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Status</p>
            <Switch checked={user?.status} onChange={statusHandler} />
            </div>
        </div>
        <div style={{paddingLeft: '10px', paddingRight: '10px'}}>
            <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>Bonus</p>
            <Switch disabled />
            </div>
        </div>
        <div style={{paddingLeft: '10px', paddingRight: '10px', paddingTop: '20px'}} onClick={() => setModal2Open(true)}>
        <div style={{backgroundColor: '#474747', padding: '10px', border: '1px solid #fff', display: 'flex', justifyContent: 'space-between'}}>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>EUR</p>
            <p style={{color: '#fff', alignSelf: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px'}}>{user?.credits}</p>
            </div>
        </div>
    
    <div style={{width: '100%'}}>
        <Modal
        title={<div style={{backgroundColor: '#126e51', padding: '10px'}}><p style={{color: '#fff', textAlign: 'center'}}>Transfero kredi</p></div>}
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={<div style={{backgroundColor: '#dddd', padding: '10px', display: 'flex', justifyContent: 'center'}}>
            <button disabled={!transferSum} onClick={handleSubmit} style={{backgroundColor: '#126e51', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
        </div>}
        width='80%'
        closeIcon={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <input type='number' disabled style={{width: '60%', padding: '10px', border: '1px solid #000'}} value={displaySum} />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '20px'}}>
            <button onClick={() => handleButtonClick(10)} style={{width: '20%', padding: '10px', backgroundColor: '#b7b7b7', border: 'none', fontWeight: '600'}}>10</button>
            <button onClick={() => handleButtonClick(50)} style={{width: '20%', padding: '10px', backgroundColor: '#b7b7b7', border: 'none', fontWeight: '600'}}>50</button>
            <button  onClick={() => handleButtonClick(100)} style={{width: '20%', padding: '10px', backgroundColor: '#b7b7b7', border: 'none', fontWeight: '600'}}>100</button>
            <button  onClick={() => handleButtonClick(200)} style={{width: '20%', padding: '10px', backgroundColor: '#b7b7b7', border: 'none', fontWeight: '600'}}>200</button>
        </div>
      </Modal>
      </div>

    <div style={{width: '100%'}}>
        <Modal
        title={<div style={{backgroundColor: '#126e51', padding: '10px'}}><p style={{color: '#fff', textAlign: 'center'}}>Ndrysho UserName</p></div>}
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
        footer={<div style={{backgroundColor: '#dddd', padding: '10px', display: 'flex', justifyContent: 'center'}}>
            <button onClick={handleUserName} style={{backgroundColor: '#126e51', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
        </div>}
        width='80%'
        closeIcon={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <input type='text' style={{width: '60%', padding: '10px', border: '1px solid #000'}} value={userName} onChange={(e) => setUserName(e.target.value)} />
        </div>
      </Modal>
      </div>

    <div style={{width: '100%'}}>
        <Modal
        title={<div style={{backgroundColor: '#126e51', padding: '10px'}}><p style={{color: '#fff', textAlign: 'center'}}>Komisioni</p></div>}
        centered
        open={modal3Open}
        onOk={() => setModal3Open(false)}
        onCancel={() => setModal3Open(false)}
        footer={<div style={{backgroundColor: '#dddd', padding: '10px', display: 'flex', justifyContent: 'center'}}>
            <button onClick={handleCommission} style={{backgroundColor: '#126e51', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
        </div>}
        width='80%'
        closeIcon={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', padding: '10px'}}>
                <label htmlFor='1'>Komisioni single</label>
                <input value={commissionS} onChange={(e) => setCommissionS(e.target.value)} id='1' type='number' style={{border: '1px solid #000', padding: '7px'}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', padding: '10px'}}>
                <label htmlFor='2'>2 loje</label>
                <input value={commission2} id='2' onChange={(e) => setCommission2(e.target.value)} type='number' style={{border: '1px solid #000', padding: '7px'}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', padding: '10px'}}>
                <label htmlFor='3'>3 ose me shume loje</label>
                <input value={commission3} id='3' onChange={(e) => setCommission3(e.target.value)} type='number' style={{border: '1px solid #000', padding: '7px'}} />
            </div>
            </div>

      </Modal>
      </div>
    <div style={{width: '100%'}}>
        <Modal
        title={<div style={{backgroundColor: '#126e51', padding: '10px'}}><p style={{color: '#fff', textAlign: 'center'}}>Perqindja</p></div>}
        centered
        open={modal4Open}
        onOk={() => setModal4Open(false)}
        onCancel={() => setModal4Open(false)}
        footer={<div style={{backgroundColor: '#dddd', padding: '10px', display: 'flex', justifyContent: 'center'}}>
            <button disabled style={{backgroundColor: '#ccc', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
        </div>}
        width='80%'
        closeIcon={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', padding: '10px'}}>
                <label htmlFor='4'>Beti</label>
                <input id='4' type='text' style={{border: '1px solid #000', padding: '7px'}} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '60%', padding: '10px'}}>
                <label htmlFor='5'>Casino</label>
                <input id='5' type='text' style={{border: '1px solid #000', padding: '7px'}} />
            </div>
            </div>

      </Modal>
      </div>

      <div style={{width: '100%'}}>
        <Modal
        title={<div style={{backgroundColor: '#126e51', padding: '10px'}}><p style={{color: '#fff', textAlign: 'center'}}>Shenim</p></div>}
        centered
        open={modal5Open}
        onOk={() => setModal5Open(false)}
        onCancel={() => setModal5Open(false)}
        footer={<div style={{backgroundColor: '#dddd', padding: '10px', display: 'flex', justifyContent: 'center'}}>
            <button onClick={handleDescription} style={{backgroundColor: '#126e51', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
        </div>}
        width='80%'
        closeIcon={null}
      >
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '20px'}}>
            <textarea style={{width: '60%', height: '80px', padding: '10px', border: '1px solid #000'}} value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </Modal>
      </div>
        </> : <div><h4>Not authorized!</h4></div> }
    </>
  )
}

export default UserInfo