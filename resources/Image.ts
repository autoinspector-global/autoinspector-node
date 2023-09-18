import { IAPISucessResponse } from '../types/api';
import { IUploadImage } from '../types/image';
import { HTTPClient } from './HTTPClient';
//@ts-ignore
import FormData from 'form-data';
import { IImageToken } from '../types/inspection';

export class Image {
  constructor(private readonly httpClient: HTTPClient) {}

  generateToken(input: Omit<IUploadImage, 'image' | 'imageToken'>): Promise<IImageToken> {
    const { productId, ...restImage } = input;

    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/image/token/${productId}`,
      body: restImage,
    });
  }

  /**
   * Upload an image for specific product inspection item. For the moment, this method is only available for the inspection with mode full_control.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.productId - Represents the id of the product that you would like to attach a new photo.
   * @param {ReadStream} input.image - Represents the image to upload.
   * @param {String} input.side - Represents the side of the image/photo to upload.
   * @param {String} input.date - Represents the date when the photo was taken. If you can extract this information from the EXIF data, it's better because it's more reliable.
   * @param {Object} input.coordinates - Represents the coordinates of the image/photo.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  upload(input: IUploadImage): Promise<IAPISucessResponse> {
    const form = new FormData();

    const { image, ...restImage } = input;

    form.append('image', image);
    form.append('data', JSON.stringify(restImage));

    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/image/${input.productId}`,
      body: form,
      headers: {
        ...form.getHeaders(),
        ...(input.imageToken ? { 'x-image-token': input.imageToken } : {}),
      },
      withoutPredefinedHeaders: !!input.imageToken,
    });
  }
}
