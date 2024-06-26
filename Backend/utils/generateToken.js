import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  if (!token) {
    console.error("Failed to generate JWT token");
  } else {
    console.log("Generated JWT token:", token);
  }

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    // domain: '.ameba-rks.com', // Match the domain used when setting the cookie
    // path: '/',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
