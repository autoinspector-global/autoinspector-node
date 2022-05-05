import dotenv from 'dotenv';
import { Autoinspector } from '../resources/Autoinspector';

dotenv.config();

export const setup = () => {
  const autoinspector = new Autoinspector({
    apikey: process.env.AUTOINSPECTOR_API_KEY as string,
  });

  return { autoinspector };
};
