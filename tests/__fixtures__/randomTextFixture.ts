import * as crypto from 'crypto';

export const randomTextFixture = (max = 18): string => {
  return crypto.randomBytes(max).toString('hex');
};
