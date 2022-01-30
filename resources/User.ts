import {
  IAuthenticatedUserListInspections,
  IListAuthenticatedUserInspectionsOutput,
} from '../types/authenticatedUser';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';
import { Memberships } from './Memberships';
import { Products } from './Products';

class UserInspections extends Products {
  constructor(private readonly httpClient: HTTPClient) {
    super(httpClient);
  }

  /**
   * List all the inspections with a couple of filters.
   * @param  input - An object that contains the information for make the request.
   * @param {String} input.scope - Indicates if the inspections to retrieve will be where the user authenticated is the producer or where the users created by the user authenticated invite before.
   * @param {String} input.accessToken - Represents the token that belongs to the authenticated user.
   * @param  input.params - An object that contains the filters.
   * @param {String} input.params.from - Represents the base date in ISO format of the inspections to retrieve.
   * @param {String} input.params.to - Represents the limit date in ISO format of the inspections to retrieve.
   * @param {String} input.params.result - Represents the result that inspections to retrieve should have.
   * @param {String} input.params.search - Represents a general search that will match with the consumer: identification, firstName and email.
   * @param {String} input.params.status - Represents the status that inspections to retrieve should have.
   * @param {Number} input.params.page - Represents the specific page that you want to retrieve the inspections.
   *  @param {Object} input.producer - Represents the entity that has the ownership of the inspection to be created.
   * @return {Promise} - Returns a Promise that, when fulfilled, will either return an JSON Object with the requested
   * data or an Error with the problem.
   */
  list(input: IAuthenticatedUserListInspections): Promise<IListAuthenticatedUserInspectionsOutput> {
    return this.httpClient.makeRequest({
      method: 'GET',
      path: `/inspection/${input.scope || 'me'}?membershipId=${input.membershipId}`,
      params: input.params,
      headers: Helper.buildOptionalHeaders(input.access_token),
    });
  }
}

/**
 * @classdesc Represents the class that contains the methods/actions availables that somebody can do using the access_token received in the oauth 2.0 authorization code flow.
 * @class
 */
export class User {
  public inspections: UserInspections;
  public memberships: Memberships;

  constructor(httpClient: HTTPClient) {
    this.inspections = new UserInspections(httpClient);
    this.memberships = new Memberships(httpClient);
  }
}
