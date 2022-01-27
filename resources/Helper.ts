import { IHeaders } from '../types/http';

export class Helper {
  static buildOptionalHeaders(accessToken?: string): IHeaders | undefined {
    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return;
  }
}
