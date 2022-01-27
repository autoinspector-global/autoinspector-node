import { IUpdateResourceResponse } from '../types/api';
import { ICreateInspectionOutput } from '../types/inspection';
import { ICreatePeopleInspection, IUpdatePeopleInspection } from '../types/people';
import { IProductMethods } from '../types/productMethods';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';
import { Image } from './Image';

export class People extends Image implements IProductMethods {
  constructor(private readonly httpClient: HTTPClient) {
    super(httpClient);
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
  create(input: ICreatePeopleInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/people`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * Update an inspection of type people
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the user who do the inspection.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  update(input: IUpdatePeopleInspection): Promise<IUpdateResourceResponse> {
    return this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/people/${input.productId}`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}
