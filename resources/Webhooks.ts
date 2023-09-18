import { createHmac } from 'crypto';
import { AutoinspectorWebhook, IWebhookEvents } from '../types/webhooks';
import { HTTPClient } from './HTTPClient';

class InvalidRequestSignature extends Error {
  constructor() {
    super();
    this.message = 'The signature provided in the request is not valid';
  }
}

export class Webhooks {
  constructor(private readonly httpClient: HTTPClient) {}

  public constructEvent(
    body: any,
    requestSignature: string,
    webhookSecret: string
  ): AutoinspectorWebhook {
    const realDigest = createHmac('sha256', webhookSecret).update(body).digest('hex');

    if (requestSignature !== realDigest) {
      throw new InvalidRequestSignature();
    }

    return JSON.parse((body as Buffer).toString('utf-8'));
  }

  public async create(input: { events: IWebhookEvents[]; endpoint: string }): Promise<{
    _id: string;
  }> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: '/notification/webhook',
      body: input,
    });
  }
}
