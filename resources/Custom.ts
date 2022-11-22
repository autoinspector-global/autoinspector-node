import { ICreateInspectionOutput } from '../types/inspection';
import { ICreatePeopleInspection } from '../types/people';
import { IProductMethods } from '../types/productMethods';
import { generateIdempotencyHeader } from '../utils/idempotency';
import { HTTPClient } from './HTTPClient';

export class Custom implements IProductMethods<ICreatePeopleInspection> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(body: ICreatePeopleInspection): Promise<ICreateInspectionOutput> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/custom`,
      body,
      headers: generateIdempotencyHeader(),
    });
  }
}
