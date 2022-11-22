import { BASE_DELAY } from '../constants/http';
import { IHttpClientOpts } from '../types/http';

const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

export const calculateBackoffDelay = (retryCount: number, opts: IHttpClientOpts) => {
  let baseDelay = 325;

  if (retryCount < 1) {
    baseDelay = BASE_DELAY;
  }

  const retries: number = Math.min(retryCount, opts.maxRetries);

  const ceil = Math.min((1 << retries) * baseDelay, opts.maxBackoffTime);

  return ceil / 2 + getRandomInt(ceil / 2 + 1);
};
