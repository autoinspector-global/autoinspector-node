import { IUpdateResourceResponse } from '../types/api';
import { ICreateInspectionOutput } from '../types/inspection';
import { ICreateMotoInspection, IMoto } from '../types/moto';
import { IProductMethods } from '../types/productMethods';
import { generateIdempotencyHeader } from '../utils/idempotency';
import { HTTPClient } from './HTTPClient';

export class Moto implements IProductMethods<ICreateMotoInspection, Partial<IMoto>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(body: ICreateMotoInspection): Promise<ICreateInspectionOutput> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/moto`,
      headers: generateIdempotencyHeader(),
      body,
    });
  }

  async update(productId: string, moto: Partial<IMoto>): Promise<IUpdateResourceResponse> {
    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/moto/${productId}`,
      body: {
        moto,
      },
    });
  }
}
