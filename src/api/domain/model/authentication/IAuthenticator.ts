import {
  AuthenticationRequest,
  AuthenticationResponse
} from '../../../application/authentication/types';

export interface IAuthenticator {
  auth(t: AuthenticationRequest): Promise<AuthenticationResponse>;
}
