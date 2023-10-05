import { InspectionStatus, InspectionType, InspectionVeredict } from './inspection';

export interface IPagination {
  plate: string;
  page: number;
  limit: number;
  status: InspectionStatus;
  type: InspectionType;
  veredict: InspectionVeredict;
  consumerIdentification: string;
  templateId?: string;
}

export interface IPaginationResponse<R = any> {
  totalInspections: number;
  inspections: R;
  limit: number;
  page?: number | undefined;
  totalPages: number;
  nextPage?: number | null | undefined;
  prevPage?: number | null | undefined;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}
