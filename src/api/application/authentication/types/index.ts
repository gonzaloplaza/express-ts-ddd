export type AuthenticationRequest = {
  username: string;
  password: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  expiresIn: number;
};