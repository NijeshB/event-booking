import './alias-setup'; // Must be the first import

import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import cookieParser from 'cookie-parser'; // ✅ Import cookie-parser
import bodyParser from 'body-parser';

import logger from '@utils/logger';
import userRoutes from './routes/userRoutes';

import { errorHandler } from '@utils/errorHandler';
import authRoutes from './routes/authRoutes';
import { isProduction } from '@utils/helpers';
import { verifyAuthToken } from '@controllers/Auth';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app = express();

app.use(cookieParser()); // ✅ Enable cookie parsing

app.use(
  session({
    secret: process.env.APP_SECRET!, // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000, secure: isProduction },
  }),
);

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.ADMIN_API_URL, // Update this to match your frontend URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    credentials: true,
    //maxAge: 600, // ✅ Cache preflight response for 10 minutes
  }),
);

// app.use((req, res, next) => {
//   console.log('Incoming request:', req.method, req.url);
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Session:', req.session);
//   next();
// });

app.use('/users', verifyAuthToken, userRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port: ${PORT}`));
