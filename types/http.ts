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

export interface IHTTPClient {
  headers: IHeaders;
  timeout: number;
  baseURL: string;
  pathPrefix: string;
}
