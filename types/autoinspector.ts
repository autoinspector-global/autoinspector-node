import { IOAuth20Credentials } from './oauth20';

export interface IAutoinspector {
  apikey: string;
  timeout?: number;
  oauthCredentials?: IOAuth20Credentials;
}
