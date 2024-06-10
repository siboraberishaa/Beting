import {defaultPermissions} from '../constants.js'

const getAdminPermissions = () => {
    let obj = {}
    Object.keys(defaultPermissions).map((element) => {
        obj[element] = {
            read: true,
            create: true,
            update: true,
            delete: true
        }
    })
    return obj
}

const getManagerPermissions = () => {
    let obj = {}
    Object.keys(defaultPermissions).map((element) => {
        obj[element] = {
            read: true,
            create: true,
            update: false,
            delete: false
        }
    })
    return obj
}

const getRegisteredUserPermissions = () => {
    let obj = {}
    Object.keys(defaultPermissions).map((element) => {
        obj[element] = {
            read: true,
            create: false,
            update: false,
            delete: false
        }
    })
    return obj
}



const roles = [
    {
        name: 'Super Admin',
        permissions: getAdminPermissions()
    },
    {
        name: 'Manager',
        permissions: getManagerPermissions()
    },
    {
        name: 'Player',
        permissions: getRegisteredUserPermissions()
    },
]

  
  export default roles
  