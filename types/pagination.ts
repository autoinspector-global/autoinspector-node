import { InspectionResult, InspectionStatus, InspectionType } from './inspection';

export interface IPagination {
  page: number;
  limit: number;
  status: InspectionStatus;
  result: InspectionResult;
  type: InspectionType;
}

export interface IPaginationResponse<R = any> {
  totalDocs: number;
  data: R;
  limit: number;
  page?: number | undefined;
  totalPages: number;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
