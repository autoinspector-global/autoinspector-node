import { IAPISucessResponse } from '../types/api';
import { IUploadImage } from '../types/image';
import { HTTPClient } from './HTTPClient';
import FormData from 'form-data';

export abstract class Image {
  constructor(private readonly httpRef: HTTPClient) {}

  /**
   * Upload an image for specific product inspection item. For the moment, this method is only available for the inspection with mode full_control.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.productId - Represents the id of the product that you would like to attach a new photo.
   * @param {Buffer} input.image - Represents the image to upload.
   * @param {String} input.side - Represents the side of the image/photo to upload.
   * @param {String} input.date - Represents the date when the photo was taken.
   * @param {Object} input.coordinates - Represents the coordinates of the image/photo.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  uploadImage(input: IUploadImage): Promise<IAPISucessResponse> {
    const form = new FormData();

    form.append('side', input.side);
    form.append('image', input.image);

    if (input.coordinates) {
      form.append('coordinates', JSON.stringify(input.coordinates));
    }

    if (input.date) {
      form.append('date', input.date.toISOString());
    }

    console.log('FORM DATA!', form);

    return this.httpRef.makeRequest({
      method: 'POST',
      path: `/inspection/image/${input.productId}`,
      body: form,
      headers: {
        ...form.getHeaders(),
      },
    });
  }
}
