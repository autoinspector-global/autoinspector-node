import { IAutoinspector } from '../types/autoinspector';
import { HTTPClient } from './HTTPClient';
import { OAuth20 } from './OAuth20';
import pkg from '../package.json';
import { Inspections } from './Inspections';

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
export class Autoinspector {
  public oauth: OAuth20;
  public inspections: Inspections;

  /**
   * Create Autoinspector SDK.
   * @constructor
   * @see {@link https://autoinspector.com.ar/docs/api/start}
   * @param {String} apikey - The apikey for authentication.
   */
  constructor(input: IAutoinspector) {
    if (typeof input.apikey !== 'string') {
      throw new Error('apikey should be a string.');
    }

    const httpClient = new HTTPClient({
      baseURL: 'https://api.autoinspector.com.ar',
      headers: {
        'x-api-key': input.apikey,
        'User-Agent': 'autoinspector-node-sdk/' + pkg.version,
      },
      timeout: input.timeout || 80000,
      pathPrefix: '/v1',
    });

    this.oauth = new OAuth20(httpClient, input.oauthCredentials || {});
    this.inspections = new Inspections(httpClient);
  }
}
