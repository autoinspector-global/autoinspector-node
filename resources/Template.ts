import { ITemplate, ITemplateListInput } from '../types/template';
import { HTTPClient } from './HTTPClient';

export class Template {
  constructor(private readonly httpClient: HTTPClient) {}

  async list(input: ITemplateListInput = {}) {
    return await this.httpClient.makeRequest<ITemplate[]>({
      method: 'GET',
      path: '/inspection/template/list',
      params: input,
    });
  }
}
