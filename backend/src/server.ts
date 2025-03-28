import './alias-setup'; // Must be the first import

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

import bodyParser from 'body-parser';

import logger from '@utils/logger';
import userRoutes from './routes/userRoutes';

import { errorHandler } from '@utils/errorHandler';
import authRoutes from './routes/authRoutes';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

console.log(process.env.ADMIN_API_URL);
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.ADMIN_API_URL, // Update this to match your frontend URL
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);

app.use('/users', userRoutes);
app.use('/', authRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port: ${PORT}`));
