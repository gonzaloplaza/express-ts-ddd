import {
  AuthenticationRequest,
  AuthenticationResponse
} from '../../../application/authentication/AuthenticationService';

export interface IAuthenticator {
  auth(authRequest: AuthenticationRequest): Promise<AuthenticationResponse>;
}
