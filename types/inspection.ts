import { IConsumer } from './consumer';

export type InspectionCompletedBy = 'client' | 'expiration';

export interface IValidation {
  confidence: number;
  valid: boolean;
  id: string;
  type: string;
}

export type InspectionType = 'goods' | 'people' | 'vehicle' | 'machinery';

export type InspectionResult = 'approved' | 'disapproved' | 'not_defined' | 'not_provided';

export type ImageGeneratedBy = 'configuration' | 'damage_declaration' | 'full_control';

export type InspectionStatus = 'created' | 'started' | 'completed' | 'blocked' | 'processing';

export type InspectionMode = 'full_control' | 'normal';

export interface IImageDetection {
  name: string;
  result: any;
}

export interface IImage {
  side: IImage;
  processed: boolean;
  uploadedAt: Date;
  _id: string;
  validations: IValidation[];
  approved: boolean;
  src: string;
  detections: IImageDetection[];
  generatedBy: ImageGeneratedBy;
}

export type KindOf = 'easy' | 'deep' | 'damage' | 'full_control';

export interface IInspectionCommonParams {
  consumer: IConsumer;
  isAPI: boolean;
  producer?: IProducer;
  kindOf?: KindOf;
  mode?: InspectionMode;
  metadata?: object;
  accessToken?: string;
}

export interface IFinishInspection extends IGetInspection {}

export interface ICreateInspectionOutput {
  message: string;
  _id: string;
}

export interface IGetInspection {
  inspectionId: string;
}

export interface IInspectionItem {
  images: IImage[];
  extraImages: string[];
}

export interface IProducer {
  userId: string;
  companyId: string;
  internalId?: string;
}

export interface IInspection {
  result: InspectionResult;
  status: InspectionStatus;
  completedBy: InspectionCompletedBy;
  items: IInspectionItem[];
  _id: string;
  producer: IProducer;
  metadata: object;
}

export interface IInspectionHandler {}
