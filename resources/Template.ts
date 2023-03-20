import { ITemplate, ITemplateListInput } from '../types/template';
import { buildOAuthHeader } from '../utils/build-oauth-header';
import { HTTPClient } from './HTTPClient';

export class Template {
  constructor(private readonly httpClient: HTTPClient) {}

  async list(input: ITemplateListInput = {}) {
    return await this.httpClient.makeRequest<ITemplate[]>({
      method: 'GET',
      path: '/inspection/template',
      params: input,
    });
  }

  async listWithOAuth(token: string) {
    return await this.httpClient.makeRequest<ITemplate[]>({
      method: 'GET',
      path: '/inspection/template/oauth/list/all',
      headers: buildOAuthHeader(token),
    });
  }

  async preview(input: ITemplateListInput = {}) {
    return await this.httpClient.makeRequest<ITemplate[]>({
      method: 'GET',
      path: '/inspection/template/preview',
      params: input,
    });
  }

  async retrieve(templateId: string) {
    return await this.httpClient.makeRequest<ITemplate[]>({
      method: 'GET',
      path: '/inspection/template/' + templateId,
    });
  }
}
