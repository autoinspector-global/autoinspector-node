import { IAPISucessResponse } from '../types/api';
import { IAutoinspector } from '../types/autoinspector';
import { IUploadImage } from '../types/image';
import { IFinishInspection, IGetInspection, IInspection } from '../types/inspection';
import { IPagination, IPaginationResponse } from '../types/pagination';
import { AuthenticatedUser } from './AuthenticatedUser';
import { HTTPClient } from './HTTPClient';
import { InspectionHandler } from './InspectionHandler';
import { OAuth20 } from './OAuth20';
import pkg from '../package.json';

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
export class Autoinspector extends InspectionHandler {
  private http: HTTPClient;
  public oauth: OAuth20;
  public authenticatedUser: AuthenticatedUser;

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
      baseURL: process.env.AUTOINSPECTOR_API_BASE_URL || 'https://api.autoinspector.com.ar',
      headers: {
        'x-api-key': input.apikey,
        'User-Agent': 'autoinspector-node-sdk/' + pkg.version,
      },
      timeout: input.timeout || 80000,
      pathPrefix: '/v1',
    });

    super(httpClient);

    this.oauth = new OAuth20(httpClient, input.oauthCredentials || {});
    this.authenticatedUser = new AuthenticatedUser(httpClient);
    this.http = httpClient;
  }

  /**
   * Upload an image for specific product inspection item. For the moment, this method is only available for the inspection with mode full_control.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.productId - Represents the id of the product that you would like to attach a new photo.
   * @param {Buffer} input.image - Represents the image to upload.
   * @param {String} input.side - Represents the side of the image/photo to upload.
   * @param {String} input.date - Represents the date when the photo was taken.
   * @param {Object} input.coordinates - Represents the coordinates of the image/photo.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  uploadImage(input: IUploadImage): Promise<IAPISucessResponse> {
    const form = new FormData();

    form.append('side', input.side);
    form.append('image', input.image.toString('base64'));

    if (input.coordinates) {
      form.append('coordinates', JSON.stringify(input.coordinates));
    }

    if (input.date) {
      form.append('date', input.date.toISOString());
    }

    return this.http.makeRequest({
      method: 'POST',
      path: `/inspection/image/${input.productId}`,
      body: form,
    });
  }

  /**
   * Finish the inspection to indicate that it will not receive more photos/images.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection.
   * @param {Buffer} input.image - Represents the image to upload.
   * @param {String} input.side - Represents the side of the image/photo to upload.
   * @param {String} input.date - Represents the date when the photo was taken.
   * @param {Object} input.coordinates - Represents the coordinates of the image/photo.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  finishInspection(input: IFinishInspection): Promise<IAPISucessResponse> {
    return this.http.makeRequest({
      method: 'POST',
      path: `/inspection/finish/${input.inspectionId}`,
      body: {},
    });
  }

  /**
   * Get a specific inspection object.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection that you want to retrieve.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  getInspection(input: IGetInspection): Promise<IInspection> {
    return this.http.makeRequest({
      method: 'GET',
      path: `/inspection/${input.inspectionId}`,
    });
  }

  /**
   * Get a list of n inspections with pagination.
   * @param input - An object that contains filters for list the inspections.
   * @param {Number} input.page - Represents the specific page that you want to retrieve the inspections.
   * @param {Number} input.limit - Represents the limit of the quantity of records that you want to retrieve for page.
   * @param {String} input.status - Represents the status that inspections retrieved should have.
   * @param {String} input.type - Represents the type that inspections retrieved should have.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  listInspections(input: Partial<IPagination> = {}): Promise<IPaginationResponse<IInspection[]>> {
    return this.http.makeRequest({
      method: 'GET',
      path: `/inspection`,
      params: input,
    });
  }
}
