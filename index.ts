require('isomorphic-form-data');
import { ICreateVehicleInspection } from './types/vehicle';
import _axios from './http/_axios';
import { AxiosError, AxiosResponse } from 'axios';
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

/**
 * @classdesc Represents the class that implements some HTTP client third library. It's an extra layer for in case if we need to change the implementation be one hundred percent sure we can do it without problems.
 * @class
 */
class HTTPClient {
  private headers: IHeaders;
  private timeout: number;
  private baseURL: string;

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
  makeRequest(input: IMakeRequest): Promise<any> {
    switch (input.method) {
      case 'GET':
        return _axios
          .get(`${this.baseURL}${input.path}`, {
            headers: this.headers,
            timeout: this.timeout,
            params: input.params,
          })
          .then((res: AxiosResponse<any>) => {
            return res.data;
          });

      default:
        return _axios
          .post(`${this.baseURL}${input.path}`, input.body, {
            headers: this.headers,
            timeout: this.timeout,
            params: input.params,
          })
          .then((res: AxiosResponse<any>) => {
            return res.data;
          });
    }
  }
}

/**
 * @classdesc Represents the Autoinspector SDK. It allows the user to make every call to the API with a single function.
 * @class
 */
export class Autoinspector extends HTTPClient {
  private version: string = 'v1';

  /**
   * Create Autoinspector SDK.
   * @constructor
   * @see {@link https://autoinspector.com.ar/docs/api/start}
   * @param {String} apikey - The apikey for authentication.
   */
  constructor(apikey: string) {
    super({
      baseURL: process.env.AUTOINSPECTOR_API_BASE_URL || 'https://api.autoinspector.com.ar',
      headers: {
        'x-api-key': apikey,
        'User-Agent': 'autoinspector-node-sdk/' + pkg.version,
      },
      timeout: 10000,
    });

    if (typeof apikey !== 'string') {
      throw new Error('apikey should be a string.');
    }
  }

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
    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/vehicle`,
      body: input,
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
    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/people`,
      body: input,
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
    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/machinery`,
      body: input,
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
    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/goods`,
      body: input,
    });
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

    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/image/${input.inspectionId}/${input.productInspectionItemId}`,
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
    return this.makeRequest({
      method: 'POST',
      path: `/${this.version}/inspection/finish/${input.inspectionId}`,
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
    return this.makeRequest({
      method: 'GET',
      path: `/${this.version}/inspection/${input.inspectionId}`,
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
    return this.makeRequest({
      method: 'GET',
      path: `/${this.version}/inspection`,
      params: input,
    });
  }
}
