import {
  IExchangeCodeForAccessToken,
  IExchangeCodeForAccessTokenOutput,
  IOAuth20Credentials,
  IRefreshAccessToken,
  IRefreshAccessTokenOutput,
} from '../types/oauth20';
import { HTTPClient } from './HTTPClient';

/**
 * @classdesc Represents the class that has the responsability for make the request to every endpoint about oauth.
 * @class
 */
export class OAuth20 {
  private credentials: Partial<IOAuth20Credentials>;

  /**
   * Create OAuth20 instance to implement and execute methods in another class.
   * @constructor
   * @param httpClient - The httpClient that needs to be injected in the constructor. This is done by this way for inherit the http configuration from the Autoinspector constructor.
   * @param credentials - An object with the neccessary credentials for interact with oauth endpoints.
   * @param {String} credentials.clientappId - Represents the identification value that is generated when register an application into Autoinspector Dashboard.
   * @param {String} credentials.clientSecret - Represents the token that is generated when register an application in Autoinspector Dashboard. It's an sensitive key. so it will only be exported/used in back channel.
   */
  constructor(private readonly httpClient: HTTPClient, credentials: Partial<IOAuth20Credentials>) {
    this.credentials = credentials;
  }

  /**
   * Exchange some authorization code for a valid access_token.
   * @param input - An object that contains the essential information for make the trade.
   * @param {String} input.code - Represents the code received from Autoinspector in callbackURL.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  exchangeCodeForAccessToken(
    input: IExchangeCodeForAccessToken
  ): Promise<IExchangeCodeForAccessTokenOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: '/account/oauth/exchange_code',
      body: {
        ...input,
        ...this.credentials,
      },
    });
  }

  /**
   * Refresh some access_token for obtain a new one. This is useful for keep a long-term access_token.
   * @param input - An object that contains the essential information refresh the token.
   * @param {String} input.refreshToken - Represents the refresh token received when exchanged the code for an access_token.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  refreshAccessToken(input: IRefreshAccessToken): Promise<IRefreshAccessTokenOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: '/account/oauth/refresh_token',
      body: {
        ...input,
        ...this.credentials,
      },
    });
  }
}
