import { ICreateInspectionOutput } from '../types/inspection';
import { ICreateMachineryInspection, IUpdateMachineryInspection } from '../types/machinery';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

/**
 * @classdesc Represents the class that handle all the requests related to an inspection of type machinery.
 * @class
 */
export class Machinery {
  constructor(private readonly httpClient: HTTPClient) {}

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
  createInspection(input: ICreateMachineryInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/machinery`,
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
  updateInspection(input: IUpdateMachineryInspection): Promise<ICreateInspectionOutput> {
    return this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/machinery`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}
