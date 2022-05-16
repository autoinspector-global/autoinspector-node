import { IUpdateResourceResponse } from '../types/api';
import { ICreateCarInspection, IUpdateCarInspection } from '../types/car';
import { ICreateInspectionOutput } from '../types/inspection';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Car {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(input: ICreateCarInspection): Promise<ICreateInspectionOutput> {
    const { form } = Helper.buildFormData(input);

    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/car`,
      body: form,
      headers: form.getHeaders(),
    });
  }

  async update(
    input: Pick<IUpdateCarInspection, 'car' | 'productId'>
  ): Promise<IUpdateResourceResponse> {
    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/car/${input.productId}`,
      body: {
        car: input.car,
      },
    });
  }
}
