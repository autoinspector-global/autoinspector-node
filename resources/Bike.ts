import { IUpdateResourceResponse } from '../types/api';
import { IBike, ICreateBikeInspection } from '../types/bike';
import { ICreateInspectionOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Bike implements IProductMethods<ICreateBikeInspection, Partial<IBike>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(input: ICreateBikeInspection): Promise<ICreateInspectionOutput> {
    const { form } = Helper.buildFormData(input);

    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/bike`,
      body: form,
      headers: form.getHeaders(),
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
