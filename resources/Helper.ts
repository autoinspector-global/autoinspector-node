import { IHeaders } from '../types/http';
import { lstatSync, readFileSync } from 'fs';

export class Helper {
  static buildOptionalHeaders(access_token?: string): IHeaders | undefined {
    if (access_token) {
      return {
        Authorization: `Bearer ${access_token}`,
      };
    }

    return;
  }

  static isNode() {
    return typeof window === 'undefined';
  }

  static isFile(path: string) {
    try {
      var stat = lstatSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

  static readFile(path: string) {
    return readFileSync(path);
  }
}
