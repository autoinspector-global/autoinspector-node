import { IAPISucessResponse } from '../types/api';
import { IConsumer } from '../types/consumer';
import { IFinishInspection, IInspection, IInspectionCommonParamsV2 } from '../types/inspection';
import { IPagination, IPaginationResponse } from '../types/pagination';
import { IProducer } from '../types/producer';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';
import { Products } from './Products';

/**
 * @classdesc Represents the class that contains the methods or actions that somebody can do using apikey and access_token.
 * @class
 */
export class Inspections extends Products {
  constructor(private readonly httpClient: HTTPClient) {
    super(httpClient);
  }

  /**
   * Finish the inspection to indicate that it will not receive more photos/images.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  finish(input: IFinishInspection): Promise<IAPISucessResponse> {
    return this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/finish/${input.inspectionId}`,
      body: {},
    });
  }

  /**
   * Get a specific inspection object.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection that you want to retrieve.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  retrieve(inspectionId: string): Promise<IInspection> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/inspection/${inspectionId}`,
    });
  }

  update(
    inspectionId: string,
    inspection: Partial<
      Pick<
        IInspectionCommonParamsV2<IProducer, Partial<IConsumer>>,
        'inputs' | 'consumer' | 'metadata'
      >
    >
  ): Promise<IAPISucessResponse> {
    const { form } = Helper.buildFormData(inspection);

    return this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/${inspectionId}`,
      body: form,
      headers: form.getHeaders(),
    });
  }

  /**
   * Get a list of n inspections with pagination.
   * @param input - An object that contains filters for list the inspections.
   * @param {Number} input.page - Represents the specific page that you want to retrieve the inspections.
   * @param {Number} input.limit - Represents the limit of the quantity of records that you want to retrieve for page.
   * @param {String} input.status - Represents the status that inspections retrieved should have.
   * @param {String} input.type - Represents the type of the inspection.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  list(input: Partial<IPagination> = {}): Promise<IPaginationResponse<IInspection[]>> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/inspection`,
      params: input,
    });
  }
}
