import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });


  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production if the connection is HTTPS
    sameSite: 'none', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}  

export default generateToken;