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

export interface IPaginationOutput {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage?: number;
  page: number;
  pagingCounter: number;
  prevPage?: number;
  totalDocs: number;
  totalPages: number;
}

export interface IInspectionItemOutput {
  accessCode: string;
  consumer: {
    firstName: string;
    identification: string;
    lastName: string;
  };
  createdAt: string;
  id: string;
  producer: {
    companyId: string;
    user: { _id: string; username: string };
    userId: string;
  };
  status: string;
  type: string;
  _id: string;
}

export interface IListAuthenticatedUserInspectionsOutput {
  pagination: IPaginationOutput;
  inspection: IInspectionItemOutput[];
}

export interface IListMemberships extends IAuthenticatedUserCommonParams {}

export interface ICompany {
  logo: string;
  societyReason: string;
}

export interface IMembershipItem {
  role: string;
  company: ICompany;
  _id: string;
}

export type IListMembershipsOutput = IMembershipItem[];
