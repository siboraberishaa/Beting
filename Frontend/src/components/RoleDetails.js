import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { checkPermissions } from '../functions/Permissions'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRoleDetailsQuery, useUpdateRoleMutation } from '../features/apiSlice';
import { toast } from 'react-toastify';

const RoleDetails = () => {

    const navigate = useNavigate()

    const { id: roleId } = useParams();

    const [role, setRole] = useState({
        name: "",
    });

    const { data: roles, refetch } = useGetRoleDetailsQuery(roleId);

    const [updateRole, { isLoading: loadingUpdate }] = useUpdateRoleMutation();

    useEffect(() => {
        if (roles) {
          console.log(roles);
          setRole(roles);
        }
      }, [roles]);

      const submitHandler = async (event) => {
        event.preventDefault();
    
        console.log("event", event);
    
        try {
          await updateRole({ roleId, data: role }).unwrap();
          toast.success("Role edited");
          refetch();
          navigate("/roles");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
    
      const onChangeCheckbox = (e) => {
        if (role.permissions) {
          const newPermission = e.target.id.split("_");
          let permissionsT = JSON.parse(JSON.stringify(role.permissions));
          let abc = permissionsT[newPermission[0]];
          abc[newPermission[1]] = e.target.checked;
          // console.log(permissionsT,  permissionsT[newPermission[0]][newPermission[1]])
          setRole({ ...role, permissions: permissionsT });
        }
        // console.log(newPermission, , e.target.checked, "sjdijsidjis")
      };
    
      useEffect(() => {
        console.log("jsdhsdihsidsidhi", role.permissions);
      }, [role.permissions]);
    



  return (
    <>
        <Navbar2 />
        {checkPermissions('roles', 'update') ? 
        <>
         <div style={{width: '100%', backgroundColor: '#474747', padding: '10px'}}>
            <h3 style={{textAlign: 'center', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif'}}>Shto privilegje</h3>
        </div>
           <form onSubmit={submitHandler}>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '100px', paddingLeft: '30px', paddingRight: '30px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
    <label htmlFor="name" style={{fontWeight: '600', color: '#fff', paddingBottom: '10px', fontFamily: 'Arial, Helvetica, sans-serif'}}>Emri rolit</label>
      <input
        type="text"
        style={{ padding: '.375rem .75rem', fontSize: '1rem', lineHeight: '1.5', color: '#495057', backgroundColor: '#fff', backgroundClip: 'padding-box', border: '1px solid #ced4da', borderRadius: '.25rem' }}
        id="name"
        placeholder={"name"}
        value={role.name}
        onChange={(e) =>
          setRole({ ...role, name: e.target.value })
        }
        required
      />
    </div>
    <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff', fontFamily: 'Arial, Helvetica, sans-serif' }}>
  <thead>
    <tr>
      <th scope="col" style={{ border: '1px solid black', padding: '10px' }}>TABELA</th>
      <th scope="col" style={{ border: '1px solid black', padding: '10px' }}>SHIKO</th>
      <th scope="col" style={{ border: '1px solid black', padding: '10px' }}>KRIJO</th>
      <th scope="col" style={{ border: '1px solid black', padding: '10px' }}>NDRYSHO</th>
      <th scope="col" style={{ border: '1px solid black', padding: '10px' }}>FSHIJ</th>
    </tr>
  </thead>
  <tbody>
    {role?.permissions &&
      Object.keys(role?.permissions).map((item, key) => (
        <tr key={key}>
          <td style={{ border: '1px solid black', padding: '10px' }}>{item}</td>
          <td style={{ border: '1px solid black', padding: '10px' }}>
            <input
              type="checkbox"
              id={`${item}_read`}
              name={`${item}_read`}
              style={{ transform: 'scale(2)' }}
              defaultChecked={role?.permissions?.[item]?.read}
              onChange={onChangeCheckbox}
            />
          </td>
          <td style={{ border: '1px solid black', padding: '10px' }}>
            <input
              type="checkbox"
              id={`${item}_create`}
              name={`${item}_create`}
              style={{ transform: 'scale(2)' }}
              defaultChecked={role?.permissions?.[item]?.create}
              onChange={onChangeCheckbox}
            />
          </td>
          <td style={{ border: '1px solid black', padding: '10px' }}>
            <input
              type="checkbox"
              id={`${item}_update`}
              name={`${item}_update`}
              style={{ transform: 'scale(2)' }}
              defaultChecked={role?.permissions?.[item]?.update}
              onChange={onChangeCheckbox}
            />
          </td>
          <td style={{ border: '1px solid black', padding: '10px' }}>
            <input
              type="checkbox"
              id={`${item}_delete`}
              name={`${item}_delete`}
              style={{ transform: 'scale(2)' }}
              defaultChecked={role?.permissions?.[item]?.delete}
              onChange={onChangeCheckbox}
            />
          </td>
        </tr>
      ))}
  </tbody>
</table>


    <div
      style={{ textAlign: 'center', paddingBottom: '150px' }}
    >
      <button style={{ display: 'block', width: '100%', fontWeight: '400', textAlign: 'center', verticalAlign: 'middle', cursor: 'pointer', border: '1px solid transparent', padding: '.375rem .75rem', fontSize: '1rem', lineHeight: '1.5', borderRadius: '.25rem', color: '#fff', backgroundColor: '#126e51', borderColor: '#126e51' }} type="submit">
        Shto privilegje
      </button>
    </div>
  </div>
</form>
        </> : <div><h4>Not authorized</h4></div> }
    </>
  )
}

export default RoleDetails