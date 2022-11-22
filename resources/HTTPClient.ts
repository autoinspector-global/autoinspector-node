import axios, { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { DEFAULT_TIMEOUT } from '../constants/http';
import { IHeaders, IHTTPClient, IMakeRequest } from '../types/http';
import { httpRetryHandler } from '../utils/http-retry-handler';

/**
 * @classdesc Represents the class that implements some HTTP client third library. It's an extra layer for in case if we need to change the implementation be one hundred percent sure we can do it without problems.
 * @class
 */
export class HTTPClient {
  private headers: IHeaders = {};
  private baseURL: string;
  private pathPrefix: string;
  private instance: AxiosInstance;
  private timeout: number;

  /**
   * Create HTTPClient instance to start making request in another class.
   * @constructor
   * @param input - An object with common parameters that we need to set in the http client third party library.
   * @param {Object} input'''.headers - An object with the headers to send in each makeRequest() call.
   * @param {Object} input.timeout - The timeout that each request will have. That means, the time in milliseconds maximum that request will wait until cancel it.
   * @param {Object} input.baseURL - The baseURL to make the requests.
   */
  constructor(input: IHTTPClient) {
    this.headers = input.headers;
    this.baseURL = input.baseURL;
    this.timeout = input.timeout || DEFAULT_TIMEOUT;
    this.pathPrefix = input.pathPrefix;

    const httpClient = axios.create();

    axiosRetry(httpClient, {
      retryDelay: httpRetryHandler(input),
      retries: input.maxRetries,
      retryCondition: (error) => {
        if (axios.isAxiosError(error)) {
          return false;
        }

        return true;
      },
    });

    this.instance = httpClient;
  }

  /**
   * Make a request to a specific endpoint.
   * @param input - An object that contains the essential information make the request.
   * @param {Object} input.method - Represents the method of the http request.
   * @param {Object} input.path - Represents the path where the request will take place.
   * @param {String} input.body - Represents the body to send. It only will be sended if input.method is not `GET`.
   * @param {String} input.params - Represents the query parameters to send in the request. It only will be sended if input.method is `GET`.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  public makeRequest<F = any>(input: IMakeRequest): Promise<F> {
    const path = `${this.baseURL}${this.pathPrefix}${input.path}`;

    const options = {
      headers: {
        ...input.headers,
        ...(!input.withoutPredefinedHeaders ? this.headers : {}),
      },
      params: input.params,
      timeout: this.timeout,
    };

    switch (input.method) {
      case 'GET':
        return this.instance
          .get(path, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err: any) => this.handleError(err));

      case 'PUT':
        return this.instance
          .put(path, input.body, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err: any) => this.handleError(err));

      case 'POST':
        return this.instance
          .post(path, input.body, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err: any) => this.handleError(err));

      case 'DELETE':
        return this.instance
          .post(path, input.body, options)
          .then((res: AxiosResponse<any>) => {
            return res.data;
          })
          .catch((err: any) => this.handleError(err));
    }
  }

  private handleError(err: any) {
    const isAxiosError = axios.isAxiosError(err);

    if (isAxiosError) {
      return Promise.reject(err.response?.data);
    }

    if (!isAxiosError) {
      return Promise.reject(err);
    }
  }
}
