import { IListMemberships, IListMembershipsOutput } from '../types/authenticatedUser';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Memberships {
  constructor(private readonly httpClient: HTTPClient) {}
  /**
   * List all the memberships accepted by the user authenticated related with companies.
   * @param  input - An object that contains the information for make the request.
   * @param {String} input.access_token - Represents the token that belongs to the authenticated user.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  list(input: IListMemberships): Promise<IListMembershipsOutput> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/account/membership/authenticated`,
      headers: Helper.buildOptionalHeaders(input.access_token),
    });
  }
}
