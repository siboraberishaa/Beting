import bcrypt from 'bcryptjs';

const users = [
  {
    firstName: 'Super Admin',
    lastName: 'Super Admin',
    userName: 'admin123',
    password: bcrypt.hashSync('123456', 10),
    rolesId: "Super Admin",
    isAdmin: true
  },
  {
    firstName: 'Manager',
    lastName: 'Manager',
    userName: 'manager123',
    password: bcrypt.hashSync('123456', 10),
    rolesId: "Manager"
  },
  {
    firstName: 'User',
    lastName: 'User',
    userName: 'user123',
    password: bcrypt.hashSync('123456', 10),
    rolesId: "Player"
  },
  
];

export default users;