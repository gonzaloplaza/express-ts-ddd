import {
  AuthenticationRequest,
  AuthenticationResponse
} from '../../../application/authentication/AuthenticationService';

export interface IAuthenticator {
  auth(t: AuthenticationRequest): Promise<AuthenticationResponse>;
}
