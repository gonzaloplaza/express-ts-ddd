import * as dotenv from 'dotenv';

dotenv.config();

import PRODUCTION from './environments/pro';
import DEVELOPMENT from './environments/dev';

const { NODE_ENV } = process.env;

let currentEnv = DEVELOPMENT;

switch (NODE_ENV) {
    case 'development':
        currentEnv = DEVELOPMENT;
        break;
    case 'production':
        currentEnv = PRODUCTION;
        break;
    default:
        currentEnv = DEVELOPMENT;
}

export default currentEnv;
