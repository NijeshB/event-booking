//import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import bodyParser from 'body-parser';

import logger from './utils/logger';
import userRoutes from './routes/userRoutes';

import { errorHandler } from './utils/errorHandler';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('🎬 Event Booking API is running!!');
});

app.use('/users', userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🚀 Server running on port: ${PORT}`));
