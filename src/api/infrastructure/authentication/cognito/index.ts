//https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { Configuration } from '../../../../../config/index';
import {
  AuthenticationRequest,
  AuthenticationResponse
} from '../../../../api/application/authentication/AuthenticationService';
import { IAuthenticator } from '../../../../api/domain/model/authentication/IAuthenticator';

export class CognitoAuthenticator implements IAuthenticator {
  constructor(private config: Configuration) {}

  public async auth(authRequest: AuthenticationRequest): Promise<AuthenticationResponse> {
    const cognitoUserPool = this.initCognitoUserPool();

    const user = new CognitoUser({ Username: authRequest.username, Pool: cognitoUserPool });
    const authenticationData = { Username: authRequest.username, Password: authRequest.password };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    return new Promise((resolve, reject) => {
      user.authenticateUser(authenticationDetails, {
        onSuccess: (result) =>
          resolve({
            accessToken: result.getAccessToken().getJwtToken().toString(),
            expiresIn:
              result.getAccessToken().getExpiration() - result.getAccessToken().getIssuedAt()
          }),
        onFailure: reject,
        newPasswordRequired: resolve
      });
    });
  }

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
