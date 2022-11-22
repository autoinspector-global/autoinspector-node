import { IUpdateResourceResponse } from '../types/api';
import { ICar, ICreateCarInspection } from '../types/car';
import { ICreateInspectionOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { generateIdempotencyHeader } from '../utils/idempotency';
import { HTTPClient } from './HTTPClient';

export class Car implements IProductMethods<ICreateCarInspection, Partial<ICar>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(body: ICreateCarInspection): Promise<ICreateInspectionOutput> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/car`,
      headers: generateIdempotencyHeader(),
      body,
    });
  }

  async update(productId: string, car: Partial<ICar>): Promise<IUpdateResourceResponse> {
    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/car/${productId}`,
      body: {
        car,
      },
    });
  }
}
