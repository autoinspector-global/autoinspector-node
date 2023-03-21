import { IConsumer } from './consumer';
import { ITemplateInputTypes } from './template';

export type InspectionCompletedBy = 'client' | 'expiration';

export interface IValidation {
  confidence: number;
  valid: boolean;
  _id: string;
  type: string;
}

export type InspectionType = 'goods' | 'people' | 'machinery' | 'car' | 'moto' | 'custom' | 'bike';

export type InspectionVeredict = 'approved' | 'disapproved' | 'not_defined' | 'not_provided';

export type ImageGeneratedBy = 'configuration' | 'damage_declaration' | 'full_control';

export type InspectionStatus = 'created' | 'started' | 'completed' | 'blocked' | 'processing';

export type InspectionMode = 'full_control' | 'normal';

export interface IImageDetection {
  name: string;
  result: any;
}

export type ImageSide =
  | 'front'
  | 'sideLeft'
  | 'sideRight'
  | 'side'
  | 'back'
  | 'id'
  | 'wheel'
  | 'tank'
  | 'board'
  | 'chassis_number'
  | 'serial_number'
  | 'dni'
  | 'selfie'
  | 'backSideLeft'
  | 'backSideRight'
  | 'frontSideRight'
  | 'frontSideLeft'
  | 'roof'
  | 'cabin'
  | 'backBumper'
  | 'tailgate'
  | 'hood'
  | 'frontBumper'
  | 'backRightDoor'
  | 'backLeftDoor'
  | 'frontLeftDoor'
  | 'frontRightDoor'
  | 'backRightDefense'
  | 'backLeftDefense'
  | 'frontLeftDefense'
  | 'frontRightDefense'
  | 'inferiorRightPanel'
  | 'inferiorLeftPanel'
  | 'backRightWindow'
  | 'backLeftWindow'
  | 'frontLeftWindow'
  | 'frontRightWindow'
  | 'backWindow'
  | 'windShield'
  | 'backRightLight'
  | 'backLeftLight'
  | 'frontLeftLight'
  | 'frontRightLight'
  | 'leftMirror'
  | 'rightMirror'
  | 'frontLeftWheel'
  | 'frontRightWheel'
  | 'backLeftWheel'
  | 'backRightWheel'
  | 'under_hood'
  | 'backTires'
  | 'frontTires'
  | 'chassis'
  | 'body'
  | 'gasTank'
  | 'seat'
  | 'handlebar'
  | 'tailOptic'
  | 'headOptic'
  | 'backFender'
  | 'frontFender';

export type IImageDamagePart =
  | 'light_broken'
  | 'glass_broken'
  | 'corrosion'
  | 'dent'
  | 'scratch'
  | 'missing'
  | 'broken';

export type IDamage =
  | 'light_broken'
  | 'glass_broken'
  | 'corrosion'
  | 'dent'
  | 'scratch'
  | 'missing'
  | 'broken';

export interface IImageDamage {
  percentage: number;
  part: IImageDamagePart;
  type: IDamage;
}

export interface IImage {
  side: ImageSide;
  processed: boolean;
  uploadedAt: Date;
  _id: string;
  validations: IValidation[];
  approved: boolean;
  src: string;
  generatedBy: ImageGeneratedBy;
  damages: IImageDamage[];
}

export type KindOf = 'easy' | 'deep' | 'damage' | 'full_control';

export type IInputFile = {
  value: string;
  contentType: string;
  filename: string;
  identifier: string;
};

export interface IInputValue {
  identifier: string;
  value: any;
}

export type DeliveryChannels = 'email' | 'wsp';

export type Delivery =
  | {
      disabled: true;
    }
  | {
      channel: 'wsp' | 'sms';
      destination: string;
      countryISO: string;
      disabled: false;
    }
  | {
      channel: 'email';
      destination: string;
      disabled: false;
    };

export interface IUpdateInspection extends Pick<IInspectionCommonParamsV2, 'inputs' | 'consumer'> {
  inspectionId: string;
}

export interface IInspectionMetadata {
  [key: string]: string;
}

export interface IInspectionCommonParamsV2<P = IProducer, C = IConsumer> {
  callbackURL?: string;
  delivery: Delivery;
  locale: 'es_AR' | 'es_MX' | 'es_CL' | 'es_UY' | 'es_PE' | string;
  inputs?: IInputValue[];
  consumer?: Partial<C>;
  producer?: P;
  templateId: string;
  initialStatus?: 'created' | 'started';
  metadata?: IInspectionMetadata;
  access_token?: string;
}

export interface IFinishInspection extends IGetInspection {}

export interface ICreateInspectionGoodsOutput extends ICreateInspectionOutputCommon {
  productIds: string[];
}

export interface ICreateInspectionOutput extends ICreateInspectionOutputCommon {
  productId: string;
}

export interface ICreateInspectionOutputCommon {
  magicLink: string;
  message: string;
  inspectionId: string;
}

export interface IGetInspection {
  inspectionId: string;
}

export type InspectionTargets = 'product' | 'identity' | 'custom';

export interface IInspectionInput {
  value?: any;
  label: string;
  type: ITemplateInputTypes;
  identifier: string;
}

export interface IInspectionSection {
  images: IImage[];
  extraImages: {
    target: InspectionTargets;
    uploadedAt: string;
    side: string;
    _id: string;
    src: string;
  }[];
  inputs: IInspectionInput[];
}

export interface IProduct extends IInspectionSection {
  type: InspectionType;
  _id: string;
}

export interface ICreateInspectionProducer {
  internalId: string;
  mustMatchUser?: boolean;
}

export interface IProducer {
  userId: string;
  companyId: string;
  internalId: string;
}

export interface IImageToken {
  token: string;
}

export interface IInspectionIdentity extends IInspectionSection {
  address: string;
  city: string;
  country: string;
  state: string;
  phone: string;
  sex: string;
  birthdate: string;
  email: string;
  identification: string;
  lastName: string;
  firstName: string;
}

export type InspectionTemplateTypes = 'built-in' | 'created';

export interface IInspection {
  template: {
    name: string;
    type: InspectionTemplateTypes;
  };
  testing: boolean;
  veredict: InspectionVeredict;
  type: InspectionType;
  status: InspectionStatus;
  completedBy: InspectionCompletedBy;
  products: IProduct[];
  _id: string;
  producer: IProducer;
  custom: IInspectionSection;
  metadata: IInspectionMetadata;
  identity: IInspectionIdentity;
}

export interface IInspectionHandler {}
