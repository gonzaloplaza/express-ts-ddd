import { IAuthenticator } from '../../domain/model/authentication/IAuthenticator';
import { ILogger } from '../../../shared/domain/ILogger';

export type AuthenticationRequest = {
  username: string;
  password: string;
};

export type AuthenticationResponse = {
  accessToken: string;
  expiresIn: number;
};

export class AuthenticationService {
  constructor(private logger: ILogger, private authenticator: IAuthenticator) {}

  public async invoke(request: AuthenticationRequest): Promise<AuthenticationResponse> {
    this.logger.info(`User authentication attempt with username: ${request.username}`);

    return await this.authenticator.auth(request);
  }
}
