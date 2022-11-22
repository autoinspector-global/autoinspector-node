import { IUpdateResourceResponse } from '../types/api';
import { IBike, ICreateBikeInspection } from '../types/bike';
import { ICreateInspectionOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { generateIdempotencyHeader } from '../utils/idempotency';
import { HTTPClient } from './HTTPClient';

export class Bike implements IProductMethods<ICreateBikeInspection, Partial<IBike>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(body: ICreateBikeInspection): Promise<ICreateInspectionOutput> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/bike`,
      headers: generateIdempotencyHeader(),
      body,
    });
  }

  async update(productId: string, bike: Partial<IBike>): Promise<IUpdateResourceResponse> {
    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/bike/${productId}`,
      body: {
        bike,
      },
    });
  }
}
