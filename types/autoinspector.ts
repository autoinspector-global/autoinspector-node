import { IOAuth20Credentials } from './oauth20';

export interface IAutoinspector {
  /**
   * The apikey for authenticate to Autoinspector API.
   */
  apikey: string;
  /**
   * The timeout limit that one request can take
   */
  timeout?: number;
  /**
   * Credentials for make OAuth Authorization Code Flow
   */
  oauthCredentials?: IOAuth20Credentials;
}
