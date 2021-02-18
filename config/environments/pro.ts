import { Configuration } from 'config';

const PRO: Configuration = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: +(process.env.PORT || 3000),
  APP_NAME: process.env.APP_NAME || 'express-ts-ddd',
  APP_DATABASE_URL: process.env.APP_DATABASE_URL || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'info',
  APP_COGNITO: {
    USER_POOL_ID: process.env.COGNITO_USER_POOL || '',
    CLIENT_ID: process.env.COGNITO_CLIENT_ID || ''
  }
};

export default PRO;
