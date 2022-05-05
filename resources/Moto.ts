import { IUpdateResourceResponse } from '../types/api';
import { ICreateInspectionOutput } from '../types/inspection';
import { ICreateMotoInspection, IUpdateMotoInspection } from '../types/moto';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Moto {
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

  async update(input: IUpdateMotoInspection): Promise<IUpdateResourceResponse> {
    const { form } = Helper.buildFormData(input);

    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/moto/${input.productId}`,
      body: form,
      headers: form.getHeaders(),
    });
  }
}
