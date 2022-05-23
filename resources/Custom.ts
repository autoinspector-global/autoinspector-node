import { ICreateInspectionOutput } from '../types/inspection';
import { ICreatePeopleInspection } from '../types/people';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Custom {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(input: ICreatePeopleInspection): Promise<ICreateInspectionOutput> {
    const { form } = Helper.buildFormData(input);

    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/custom`,
      body: form,
      headers: form.getHeaders(),
    });
  }
}
