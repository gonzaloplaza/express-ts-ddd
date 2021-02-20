import { Configuration } from '../';

const DEV: Configuration = {
  NODE_ENV: 'development',
  PORT: +(process.env.PORT || 3000),
  APP_NAME: process.env.APP_NAME || 'express-ts-ddd',
  APP_DATABASE_URL: process.env.APP_DATABASE_URL || '',
  APP_LOG_LEVEL: process.env.APP_LOG_LEVEL || 'debug',
  APP_COGNITO: {
    USER_POOL_ID: process.env.COGNITO_USER_POOL || '',
    CLIENT_ID: process.env.COGNITO_CLIENT_ID || '',
    REGION: process.env.COGNITO_REGION || ''
  }
};

export default DEV;
