import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

export const secrets = {
  JWT_SECRET: process.env.JWT_SECRET as string,
};
