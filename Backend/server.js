import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import transferRoutes from './routes/transferRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import helmet from 'helmet';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
    origin: ['https://website-665aeeac.ameba-rks.com', 'https://666cb2f5e04051d4e29de3a6--admirable-creponne-e5f66c.netlify.app'], // replace with your actual origin
  credentials: true, // Include cookies in cross-origin requests
}));

const port = process.env.PORT || 5000;


// Add cache-control header middleware
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});


app.use(helmet());

// Additional custom headers if needed
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/finances', financeRoutes);

if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
