import { IUpdateResourceResponse } from '../types/api';
import { ICreateInspectionOutput } from '../types/inspection';
import { ICreateMotoInspection, IMoto } from '../types/moto';
import { IProductMethods } from '../types/productMethods';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Moto implements IProductMethods<ICreateMotoInspection, Partial<IMoto>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(input: ICreateMotoInspection): Promise<ICreateInspectionOutput> {
    const { form } = Helper.buildFormData(input);

    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/moto`,
      body: form,
      headers: form.getHeaders(),
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
