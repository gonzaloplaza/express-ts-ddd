import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { Configuration } from '../../../../../config';
import { AuthenticationResponse } from '../../../application/authentication/AuthenticationService';

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

    const authenticationData = { Username: username, Password: password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) =>
      user.authenticateUser(authenticationDetails, {
        onSuccess: this.mapAuthenticationResult,
        onFailure: (err) => reject(err),
        newPasswordRequired: resolve
      })
    );
  }

  private mapAuthenticationResult = (session: CognitoUserSession): AuthenticationResponse => {
    return {
      accessToken: session.getAccessToken().getJwtToken().toString(),
      expiresIn: session.getAccessToken().getExpiration() - session.getAccessToken().getIssuedAt()
    };
  };

  private initCognitoUserPool(): CognitoUserPool {
    try {
      return new CognitoUserPool({
        UserPoolId: this.config.APP_COGNITO.USER_POOL_ID,
        ClientId: this.config.APP_COGNITO.CLIENT_ID
      });
    } catch (e) {
      console.error('Error: Invalid or required AWS Cognito UserPool and ClientID');
      process.exit(1);
    }
  }
}
