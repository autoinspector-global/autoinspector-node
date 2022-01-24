require('isomorphic-form-data');
import { ICreateVehicleInspection } from './types/vehicle';
import _axios from './http/_axios';
import axios, { AxiosResponse } from 'axios';
import {
  ICreateInspectionOutput,
  IFinishInspection,
  IGetInspection,
  IInspection,
} from './types/inspection';
import { ICreatePeopleInspection } from './types/people';
import { ICreateGoodsInspection } from './types/goods';
import { ICreateMachineryInspection } from './types/machinery';
import { IHeaders, IHTTPClient, IMakeRequest } from './types/http';
import { IUploadImage } from './types/image';
import { IPagination, IPaginationResponse } from './types/pagination';
import pkg from './package.json';
import { IAPISucessResponse } from './types/api';
import { IAutoinspector } from './types/autoinspector';
import {
  IExchangeCodeForAccessToken,
  IOAuth20Credentials,
  IRefreshAccessToken,
} from './types/oauth20';
import { IAuthenticatedUserListInspections, IListMemberships } from './types/authenticatedUser';

class Helper {
  static buildOptionalHeaders(accessToken?: string): IHeaders | undefined {
    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return;
  }
}

/**
 * @classdesc Represents the class that implements some HTTP client third library. It's an extra layer for in case if we need to change the implementation be one hundred percent sure we can do it without problems.
 * @class
 */
class HTTPClient {
  private headers: IHeaders;
  private timeout: number;
  private baseURL: string;
  private pathPrefix: string;

  /**
   * Create HTTPClient instance to start making request in another class.
   * @constructor
   * @param input - An object with common parameters that we need to set in the http client third party library.
   * @param {Object} input.headers - An object with the headers to send in each makeRequest() call.
   * @param {Object} input.timeout - The timeout that each request will have. That means, the time in milliseconds maximum that request will wait until cancel it.
   * @param {Object} input.baseURL - The baseURL to make the requests.
   */
  constructor(input: IHTTPClient) {
    this.headers = input.headers;
    this.timeout = input.timeout;
    this.baseURL = input.baseURL;
    this.pathPrefix = input.pathPrefix;
  }

  /**
   * Make a request to a specific endpoint.
   * @param input - An object that contains the essential information make the request.
   * @param {Object} input.method - Represents the method of the http request.
   * @param {Object} input.path - Represents the path where the request will take place.
   * @param {String} input.body - Represents the body to send. It only will be sended if input.method is not `GET`.
   * @param {String} input.params - Represents the query parameters to send in the request. It only will be sended if input.method is `GET`.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  public makeRequest(input: IMakeRequest): Promise<any> {
    const path = `${this.baseURL}${this.pathPrefix}${input.path}`;

    const options = {
      headers: input.headers || this.headers,
      params: input.params,
      timeout: this.timeout,
    };

    switch (input.method) {
      case 'GET':
        return _axios
          .get(path, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err) => this.handleError(err));

      default:
        return _axios
          .post(path, input.body, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err) => this.handleError(err));
    }
  }

  private handleError(err: any) {
    const isAxiosError = axios.isAxiosError(err);

    if (isAxiosError) {
      return Promise.reject(err.response?.data);
    }

    if (!isAxiosError) {
      return Promise.reject(err);
    }
  }
}

/**
 * @classdesc Represents the class that contains the methods or actions that somebody can do using apikey and access_token.
 * @class
 */
abstract class InspectionHandler {
  constructor(private readonly httpClient: HTTPClient) {}

  /**
   * Create an inspection of type vehicle
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.vehicle - Represents the vehicle to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  createVehicleInspection(input: ICreateVehicleInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/vehicle`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * Create an inspection of type people
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.people - Represents the people to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  createPeopleInspection(input: ICreatePeopleInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/people`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * Create an inspection of type machinery
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.machinery - Represents the machinery to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  createMachineryInspection(input: ICreateMachineryInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/machinery`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * Create an inspection of type goods
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.goods - Represents the goods to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  createGoodsInspection(input: ICreateGoodsInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/goods`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}

/**
 * @classdesc Represents the class that contains the methods/actions availables that somebody can do using the access_token received in the oauth 2.0 authorization code flow.
 * @class
 */
class AuthenticatedUser extends InspectionHandler {
  constructor(private readonly httpRef: HTTPClient) {
    super(httpRef);
  }

  /**
   * List all the inspections with a couple of filters.
   * @param  input - An object that contains the information for make the request.
   * @param {String} input.scope - Indicates if the inspections to retrieve will be where the user authenticated is the producer or where the users created by the user authenticated invite before.
   * @param {String} input.accessToken - Represents the token that belongs to the authenticated user.
   * @param  input.params - An object that contains the filters.
   * @param {String} input.params.from - Represents the base date in ISO format of the inspections to retrieve.
   * @param {String} input.params.to - Represents the limit date in ISO format of the inspections to retrieve.
   * @param {String} input.params.result - Represents the result that inspections to retrieve should have.
   * @param {String} input.params.search - Represents a general search that will match with the consumer: identification, firstName and email.
   * @param {String} input.params.status - Represents the status that inspections to retrieve should have.
   * @param {Number} input.params.page - Represents the specific page that you want to retrieve the inspections.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  listInspections(input: IAuthenticatedUserListInspections) {
    return this.httpRef.makeRequest({
      method: 'GET',
      path: `/inspection/${input.scope}?membershipId=${input.membershipId}`,
      params: input.params,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * List all the memberships that the user authenticated has with companies.
   * @param  input - An object that contains the information for make the request.
   * @param {String} input.accessToken - Represents the token that belongs to the authenticated user.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  listMemberships(input: IListMemberships) {
    return this.httpRef.makeRequest({
      method: 'GET',
      path: `/account/membership/authenticated`,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}

/**
 * @classdesc Represents the class that has the responsability for make the request to every endpoint about oauth.
 * @class
 */
class OAuth20 {
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
  exchangeCodeForAccessToken(input: IExchangeCodeForAccessToken) {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: '/oauth/exchange_code',
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
  refreshAccessToken(input: IRefreshAccessToken) {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: '/oauth/refresh_token',
      body: {
        ...input,
        ...this.credentials,
      },
    });
  }
}

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
class Autoinspector extends InspectionHandler {
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
   * @param {String} input.inspectionId - Represents the id of the inspection created.
   * @param {String} input.productInspectionItemId - Represents the id of the product inspection attached to the inspection.
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
      path: `/inspection/image/${input.inspectionId}/${input.productInspectionItemId}`,
      body: form,
    });
  }

  /**
   * Finish the inspection to indicate that it will not receive more photos/images.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection created.
   * @param {String} input.productInspectionItemId - Represents the id of the product inspection attached to the inspection.
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

export default Autoinspector;
