import { IConsumer } from './consumer';

export enum InspectionCompletedBy {
  CLIENT = 'client',
  EXPIRATION = 'expiration',
}

export interface IValidation {
  confidence: number;
  valid: boolean;
  id: string;
  type: string;
}

export enum InspectionType {
  GOODS = 'goods',
  PEOPLE = 'people',
  VEHICLE = 'vehicle',
  MACHINERY = 'machinery',
}

export enum InspectionResult {
  APPROVED = 'approved',
  DISAPPROVED = 'disapproved',
  NOT_DEFINED = 'not_defined',
  NOT_PROVIDED = 'not_provided',
}

export enum ImageGeneratedBy {
  CONFIGURATION = 'configuration',
  DAMAGE_DECLARATION = 'damage_declaration',
  FULL_CONTROL = 'full_control',
}

export enum InspectionStatus {
  CREATED = 'created',
  STARTED = 'started',
  COMPLETED = 'completed',
  BLOCKED = 'blocked',
  PROCESSING = 'processing',
}

export enum InspectionMode {
  FULL_CONTROL = 'full_control',
  NORMAL = 'normal',
}

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

export enum KindOf {
  EASY = 'easy',
  DEEP = 'deep',
  DAMAGE = 'damage',
  FULL_CONTROL = 'full_control',
}

export interface IInspectionCommonParams {
  consumer: IConsumer;
  isAPI: boolean;
  producer?: IProducer;
  kindOf?: KindOf;
  mode?: InspectionMode;
  metadata?: object;
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
