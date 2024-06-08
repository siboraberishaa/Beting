import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useCreateRoleMutation } from '../features/apiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateRole = () => {

    const navigate = useNavigate()

    const [role, setRole] = useState({
        name: "",
    });

    const [createRole, { isLoading: loadingUpdate, data: createData }] =
    useCreateRoleMutation();

    useEffect(() => {
        if (createData) {
          navigate(`/role/${createData._id}`);
        }
      }, [createData, navigate]);
    
      const submitHandler = async (event) => {
        event.preventDefault();
        try {
          await createRole(role).unwrap();
          toast.success("Role created");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };

  return (
    <>
        <Navbar2 />
        {checkPermissions('roles', 'create') ? 
        <>
        <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Krijo rol</h3>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '40px'}}>
            <label style={{color: '#fff', fontWeight: '600', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif'}} htmlFor='1'>Emri rolit</label>
            <input value={role.name} onChange={(e) => setRole({ ...role, name: e.target.value })} id='1' type='text' style={{width: '30%', backgroundColor: 'transparent', border: '1px solid #fff', padding: '10px', color: '#fff'}} />
            <div style={{paddingTop: '20px', width: '100%', textAlign: 'center'}}>
                <button onClick={submitHandler} style={{backgroundColor: '#126e51', padding: '10px', width: '20%', border: 'none', color: '#fff', fontWeight: '600'}}>Submit</button>
            </div>
        </div>
        </> : <div><h4>Not authorized!</h4></div>} 
    </>
  )
}

export default CreateRole