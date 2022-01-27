import { IUpdateResourceResponse } from '../types/api';
import { ICreateGoodsInspection, IUpdateGoodsInspection } from '../types/goods';
import { ICreateInspectionGoodsOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Goods implements IProductMethods {
  constructor(private readonly httpClient: HTTPClient) {}

  /**
   * Create an inspection that will contains goods.
   * @param input - An object that contains the essential information for create an inspection.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.goods - Represents the goods to be attached to the inspection.
   * @param {String} input.mode - Represents the mode of the inspection. See more details: {@link https://www.autoinspector.com.ar/docs/api/start#inspection_mode}
   * @param {String} input.kindOf - Represents the template that inspection will have. This only matters if the input.mode is normal.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  create(input: ICreateGoodsInspection): Promise<ICreateInspectionGoodsOutput> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/goods`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }

  /**
   * Update a specific product.
   * @param input - An object that contains information that .
   * @param {String} input.productId - Represents the product unique identifier.
   * @param {Object} input.consumer - Represents the consumer who will do the inspection.
   * @param {Object} input.good - The information to update of the product.
   * @param {Object} input.metadata - Represents a dinamic object where you can store any key-value pairs.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  update(input: IUpdateGoodsInspection): Promise<IUpdateResourceResponse> {
    return this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/goods/${input.productId}`,
      body: input,
      headers: Helper.buildOptionalHeaders(input.accessToken),
    });
  }
}