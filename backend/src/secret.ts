import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env' });

export const secrets = {
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export const TOKEN_EXPIRES_IN = Number(process.env.TOKEN_EXPIRES_IN ?? 15);
