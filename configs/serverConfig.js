import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const serverConfig = {
  environment: process.env.NODE_ENV ?? 'development',
  port: process.env.PORT ?? 3000,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET ?? 'super-puper-secret-words',
  jwtExpiresIn: process.env.JWT_EXPIRES ?? '15m',
  emailServiceAPI: process.env.SENDGRID_API_KEY,
  emailFrom: process.env.SEND_EMAIL_FROM,
};
