import { createHmac } from 'crypto';
import { AutoinspectorWebhook } from '../types/webhooks';

class InvalidRequestSignature extends Error {
  constructor() {
    super();
    this.message = 'The signature provided in the request is not valid';
  }
}

export class Webhooks {
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
}
