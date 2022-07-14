import pkg from '../package.json';
import { IAutoinspector } from '../types/autoinspector';
import { HTTPClient } from './HTTPClient';
import { Image } from './Image';
import { Inspections } from './Inspections';
import { OAuth } from './OAuth';
import { Template } from './Template';
import { Webhooks } from './Webhooks';

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
export class Autoinspector {
  public oauth: OAuth;
  public images: Image;
  public inspections: Inspections;
  public webhooks: Webhooks;
  public templates: Template;

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
    this.images = new Image(httpClient);
    this.templates = new Template(httpClient);
    this.webhooks = new Webhooks();
  }
}
