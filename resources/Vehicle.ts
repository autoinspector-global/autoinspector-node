import { IUpdateResourceResponse } from '../types/api';
import { ICreateInspectionOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { ICreateVehicleInspection, IUpdateVehicleInspection } from '../types/vehicle';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';
import { Image } from './Image';

export class Vehicle extends Image implements IProductMethods {
  constructor(private readonly httpClient: HTTPClient) {
    super(httpClient);
  }

  /**
   * Create an inspection of type vehicle
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.vehicle - Represents the vehicle to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @param {Object} input.producer - Represents the entity that has the ownership of the inspection to be created.
   * @param {Object} input.access_token - Represents the token that belongs to some user into Autoinspector and was generated thanks to OAuth 2.0. When pass this argument, the apikey will not being send.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  create(input: ICreateVehicleInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/vehicle`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.access_token),
    });
  }

  /**
   * Update an inspection of type vehicle.
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.vehicle - Represents the vehicle to be attached to the inspection.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  update(input: IUpdateVehicleInspection): Promise<IUpdateResourceResponse> {
    return this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/vehicle/${input.productId}`,
      body: input,
    });
  }
}
