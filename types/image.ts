import { ReadStream } from 'fs';

export type ImageSide = string;

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IUploadImage {
  coordinates?: ICoordinates;
  date?: Date;
  imageToken?: string;
  side: ImageSide;
  image: ReadStream;
  productId: string;
}
