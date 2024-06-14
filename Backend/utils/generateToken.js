import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });


  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'none', // Allow the cookie to be sent in cross-origin requests
    // domain: 'https://website-665aeeac.ameba-rks.com/', // Set the domain to your client's domain
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}  

export default generateToken;