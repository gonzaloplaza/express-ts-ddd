import { Configuration } from '../../../../../config';
import {
  AuthenticationRequest,
  AuthenticationResponse
} from '../../../application/authentication/types';
import { IAuthenticator } from '../../../domain/model/authentication/IAuthenticator';
import { CognitoClient } from './CognitoClient';

export class CognitoAuthenticator implements IAuthenticator {
  constructor(private config: Configuration, private client: CognitoClient) {}

  public async auth(authRequest: AuthenticationRequest): Promise<AuthenticationResponse> {
    return await this.client.authenticateUser(authRequest.username, authRequest.password);
  }
}
