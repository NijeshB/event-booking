import './alias-setup'; // Must be the first import

import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';


//import * as path from 'node:path';

import cors from 'cors';

import cookieParser from 'cookie-parser'; // ✅ Import cookie-parser
// import bodyParser from 'body-parser';

import logger from '@utils/logger';
import userRoutes from './routes/userRoutes';

import { errorHandler } from '@utils/errorHandler';
import authRoutes from './routes/authRoutes';
import { isProduction } from '@utils/helpers';
import { verifyAuthToken } from '@controllers/Auth';
import { eventRoutes } from './routes/eventRoutes';
import rateLimit from 'express-rate-limit';


//dotenv.config({ path: path.resolve(path.dirname, './../.env') });

dotenv.config({ path: __dirname + '/../.env' });

const app = express();

app.use(express.json());
// app.use(bodyParser.json());
app.use(cookieParser()); // ✅ Enable cookie parsing

// Use helmet in all environments
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],                  // Only allow resources from your own domain
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"], // Allow scripts from your domain and CDN
    styleSrc: ["'self'", "'unsafe-inline'"], // Allow styles from your domain and inline styles
    imgSrc: ["'self'", "data:"],             // Allow images from your domain and base64
    connectSrc: ["'self'"],                  // Restrict AJAX/fetch/WebSocket to your domain
    frameSrc: ["'none'"],                    // Disallow embedding in iframes
    objectSrc: ["'none'"],                   // Disallow Flash/plugins
  }
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, // Limit each IP to 100 requests per 15 minutes
  legacyHeaders: false, 
  		message: { error: 'Too many requests, please try again later.' },
}));


// Only compress responses larger than 1024 bytes (1 KB)
app.use(compression({
  threshold: 10 // in bytes
}));

// Set security-related HTTP headers
app.use(
  session({
    secret: process.env.APP_SECRET!, // Change this to a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5 * 60 * 1000, secure: isProduction },
  }),
);


app.use(
  cors({
    origin: process.env.ADMIN_API_URL, // Update this to match your frontend URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],
    credentials: true,
    maxAge: 600, // ✅ Cache preflight response for 10 minutes
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
app.use('/event', eventRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port: ${PORT}`));
