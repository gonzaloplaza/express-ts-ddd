import { Configuration } from '../';

const TEST: Configuration = {
  NODE_ENV: 'test',
  PORT: 3000,
  APP_NAME: 'express-ts-test-ddd',
  APP_DATABASE_URL: '',
  APP_LOG_LEVEL: 'debug',
  APP_COGNITO: {
    USER_POOL_ID: 'test-central-1_testUserPool',
    CLIENT_ID: 'testCognitoClientId',
    REGION: 'test-central-1'
  }
};

export default TEST;
