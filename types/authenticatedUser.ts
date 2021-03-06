import { InspectionStatus, InspectionVeredict } from './inspection';

export interface IListInspections {
  from: Date;
  to: Date;
  veredict: InspectionVeredict;
  search: string;
  status: InspectionStatus;
  page: number;
}

export interface IAuthenticatedUserCommonParams {
  access_token: string;
}

export interface IAuthenticatedUserListInspections extends IAuthenticatedUserCommonParams {
  scope: 'all' | 'me';
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
  inspections: IInspectionItemOutput[];
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
