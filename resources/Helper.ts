import { IHeaders } from '../types/http';

export class Helper {
  static buildOptionalHeaders(access_topken?: string): IHeaders | undefined {
    if (access_topken) {
      return {
        Authorization: `Bearer ${access_topken}`,
      };
    }

    return;
  }
}
