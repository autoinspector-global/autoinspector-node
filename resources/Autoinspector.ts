import pkg from '../package.json';
import { IAutoinspector } from '../types/autoinspector';
import { HTTPClient } from './HTTPClient';
import { Inspections } from './Inspections';
import { OAuth } from './OAuth';

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
export class Autoinspector {
  public oauth: OAuth;
  public inspections: Inspections;

  /**
   * Create Autoinspector SDK.
   * @constructor
   * @see {@link https://autoinspector.com.ar/docs/api/start}
   * @param input - An object with credentials and configuration.
   */
  constructor(input: IAutoinspector) {
    if (typeof input.apikey !== 'string') {
      throw new Error('apikey should be a string.');
    }

    const httpClient = new HTTPClient({
      baseURL: process.env.AUTOINSPECTOR_API_BASE_URL || 'https://api.autoinspector.com.ar',
      headers: {
        'x-api-key': input.apikey,
        'User-Agent': 'autoinspector-node-sdk/' + pkg.version,
      },
      timeout: input.timeout || 80000,
      pathPrefix: '/v1',
    });

    this.oauth = new OAuth(httpClient, input.oauthCredentials || {});
    this.inspections = new Inspections(httpClient);
  }
}
