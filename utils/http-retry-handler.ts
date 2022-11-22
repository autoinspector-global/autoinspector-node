import {
  DEFAULT_MAX_BACKOFF_TIME,
  DEFAULT_MAX_RETRIES_DEFAULT,
  DEFAULT_TIMEOUT,
} from '../constants/http';
import { IHttpClientOpts } from '../types/http';
import { calculateBackoffDelay } from './backoff-delay';

export const httpRetryHandler = (opts: Partial<IHttpClientOpts>) => {
  return (retryCount: number, error: Error): number => {
    if (error) {
      console.log('[AUTOINSPECTOR SDK] An error occurred:', error);
    }

    return calculateBackoffDelay(retryCount, {
      maxBackoffTime: opts.maxBackoffTime || DEFAULT_MAX_BACKOFF_TIME,
      maxRetries: opts.maxRetries || DEFAULT_MAX_RETRIES_DEFAULT,
      timeout: opts.timeout || DEFAULT_TIMEOUT,
    });
  };
};
