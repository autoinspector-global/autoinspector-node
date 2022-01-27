import { IAPISucessResponse } from '../types/api';
import { IFinishInspection, IGetInspection, IInspection } from '../types/inspection';
import { IPagination, IPaginationResponse } from '../types/pagination';
import { Goods } from './Goods';
import { HTTPClient } from './HTTPClient';
import { Machinery } from './Machinery';
import { People } from './People';
import { Vehicle } from './Vehicle';

/**
 * @classdesc Represents the class that contains the methods or actions that somebody can do using apikey and access_token.
 * @class
 */
export class Inspections {
  public machinery: Machinery;
  public people: People;
  public goods: Goods;
  public vehicle: Vehicle;

  constructor(private readonly httpClient: HTTPClient) {
    this.machinery = new Machinery(httpClient);
    this.people = new People(httpClient);
    this.goods = new Goods(httpClient);
    this.vehicle = new Vehicle(httpClient);
  }

  /**
   * Finish the inspection to indicate that it will not receive more photos/images.
   * @param input - An object that contains the essential information for upload the image.
   * @param {String} input.inspectionId - Represents the id of the inspection.
   * @param {Buffer} input.image - Represents the image to upload.
   * @param {String} input.side - Represents the side of the image/photo to upload.
   * @param {String} input.date - Represents the date when the photo was taken.
   * @param {Object} input.coordinates - Represents the coordinates of the image/photo.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  finishInspection(input: IFinishInspection): Promise<IAPISucessResponse> {
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
  getInspection(input: IGetInspection): Promise<IInspection> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/inspection/${input.inspectionId}`,
    });
  }

  /**
   * Get a list of n inspections with pagination.
   * @param input - An object that contains filters for list the inspections.
   * @param {Number} input.page - Represents the specific page that you want to retrieve the inspections.
   * @param {Number} input.limit - Represents the limit of the quantity of records that you want to retrieve for page.
   * @param {String} input.status - Represents the status that inspections retrieved should have.
   * @param {String} input.type - Represents the type that inspections retrieved should have.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  listInspections(input: Partial<IPagination> = {}): Promise<IPaginationResponse<IInspection[]>> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/inspection`,
      params: input,
    });
  }
}
