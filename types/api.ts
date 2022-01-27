export interface IAPISucessResponse {
  message: string;
}

export interface IAutoinspectorError {
  code: string;
  status: number;
  detail: string;
}

export type APIMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';

export interface IUpdateResourceResponse {
  message: string;
}
