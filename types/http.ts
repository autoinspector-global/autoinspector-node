import { APIMethods } from './api';

export interface IDynamicMap<T = any> {
  [key: string]: T;
}

export interface IHeaders extends IDynamicMap<string | number> {}

export interface IParams extends IDynamicMap<any> {}

export interface IMakeRequest {
  method: APIMethods;
  path: string;
  body?: any;
  params?: IParams;
  headers?: IHeaders;
  withoutPredefinedHeaders?: boolean;
}

export interface IHttpClientOpts {
  maxBackoffTime: number;
  timeout: number;
  maxRetries: number;
}

export interface IHTTPClient extends Partial<IHttpClientOpts> {
  headers: IHeaders;
  baseURL: string;
  pathPrefix: string;
}
