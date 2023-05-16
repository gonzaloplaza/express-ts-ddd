import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  IAuthenticationDetailsData
} from 'amazon-cognito-identity-js';
import { Configuration } from '../../../../../config';
import { AuthenticationResponse } from '../../../application/authentication/types';

export class CognitoClient {
  private readonly userPool: CognitoUserPool;

  constructor(private config: Configuration) {
    this.userPool = this.initCognitoUserPool();
  }

  public async authenticateUser(
    username: string,
    password: string
  ): Promise<AuthenticationResponse> {
    const user = new CognitoUser({ Username: username, Pool: this.userPool });
    const authenticationData: IAuthenticationDetailsData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const authenticationResponse = new Promise<AuthenticationResponse>((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (session) => resolve(this.mapAuthenticationResult(session)),
        onFailure: (err) => reject(err),
        newPasswordRequired: resolve
      });
    });

    return await authenticationResponse;
  }

  private mapAuthenticationResult = (session: CognitoUserSession): AuthenticationResponse => ({
    accessToken: session.getAccessToken().getJwtToken().toString(),
    expiresIn: session.getAccessToken().getExpiration() - session.getAccessToken().getIssuedAt()
  });

  private initCognitoUserPool = (): CognitoUserPool => {
    try {
      return new CognitoUserPool({
        UserPoolId: this.config.APP_COGNITO.USER_POOL_ID,
        ClientId: this.config.APP_COGNITO.CLIENT_ID
      });
    } catch (error) {
      throw new Error('Error: Invalid or required AWS Cognito UserPool and ClientID');
    }
  };
}
