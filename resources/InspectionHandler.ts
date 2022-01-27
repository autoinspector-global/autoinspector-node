import { ICreateGoodsInspection } from '../types/goods';
import { ICreateInspectionGoodsOutput, ICreateInspectionOutput } from '../types/inspection';
import { ICreateMachineryInspection } from '../types/machinery';
import { ICreatePeopleInspection } from '../types/people';
import { ICreateVehicleInspection } from '../types/vehicle';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

/**
 * @classdesc Represents the class that contains the methods or actions that somebody can do using apikey and access_token.
 * @class
 */
export abstract class InspectionHandler {
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
  createGoodsInspection(input: ICreateGoodsInspection): Promise<ICreateInspectionGoodsOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/goods`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}
