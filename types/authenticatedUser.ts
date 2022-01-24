import { InspectionResult, InspectionStatus } from './inspection';

export interface IListInspections {
  from: Date;
  to: Date;
  result: InspectionResult;
  search: string;
  status: InspectionStatus;
  page: number;
}

export interface IAuthenticatedUserCommonParams {
  accessToken: string;
}

export interface IAuthenticatedUserListInspections extends IAuthenticatedUserCommonParams {
  scope: 'all' | 'mine';
  params: IListInspections;
  membershipId: string;
}

export interface IListMemberships extends IAuthenticatedUserCommonParams {}
