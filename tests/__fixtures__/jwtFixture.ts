import jwt from 'jsonwebtoken';

type JwtInput = {
  iss: string;
  auth_time: number;
  exp: number;
  iat: number;
};

export const jwtFixture = (
  keyid = '',
  secretOrPrivateKey = 'superSecretKey',
  props: Partial<JwtInput> = {}
): string => {
  const defaultPayload = {
    iss: '',
    auth_time: 0,
    exp: 0,
    iat: 0
  };

  const payload = { ...defaultPayload, ...props };

  return jwt.sign(payload, secretOrPrivateKey, { keyid });
};
