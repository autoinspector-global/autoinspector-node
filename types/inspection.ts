import { IConsumer } from './consumer';
import { GoodsType } from './goods';
import { MachineryType } from './machinery';
import { PeopleType } from './people';
import { VehicleType } from './vehicle';

export type InspectionCompletedBy = 'client' | 'expiration';

export interface IValidation {
  confidence: number;
  valid: boolean;
  _id: string;
  type: string;
}

export type InspectionType = 'goods' | 'people' | 'vehicle' | 'machinery' | 'car' | 'moto';

export type InspectionVeredict = 'approved' | 'disapproved' | 'not_defined';

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

export interface IInspectionUpdateCommonParams
  extends Pick<IInspectionCommonParams, 'consumer' | 'metadata'> {
  productId: string;
}

export interface IInspectionCommonParams<P = IProducer> {
  consumer: IConsumer;
  producer: P;
  kindOf?: KindOf;
  mode?: InspectionMode;
  metadata?: object;
  access_token?: string;
}

export interface IInputValue {
  label: string;
  value: string | Buffer;
}

export interface IUpdateInspection extends Pick<IIInspectionCommonParamsV2, 'inputs' | 'consumer'> {
  inspectionId: string;
}

export type DeliveryChannels = 'email' | 'wsp';

export type Delivery =
  | {
      disabled: true;
    }
  | {
      channel: DeliveryChannels;
      destination: string;
      disabled?: false;
    };

export interface IIInspectionCommonParamsV2<P = IProducer> {
  delivery: Delivery;
  inputs: IInputValue[];
  consumer: IConsumer;
  producer: P;
  templateId: string;
  initialStatus?: 'created' | 'started';
  metadata?: object;
  access_token?: string;
}

export interface IUpdateInspectionParamsV2 {
  productId: string;
  inputs?: IInputValue[];
  consumer?: Partial<IConsumer>;
  metadata?: object;
}

export interface IFinishInspection extends IGetInspection {}

export interface ICreateInspectionGoodsOutput extends ICreateInspectionOutputCommon {
  productIds: string[];
}

export interface ICreateInspectionOutput extends ICreateInspectionOutputCommon {
  productId: string;
}

export interface ICreateInspectionOutputCommon {
  message: string;
  inspectionId: string;
}

export interface IGetInspection {
  inspectionId: string;
}

export type ProductTypes = GoodsType | VehicleType | PeopleType | MachineryType;

export interface IProduct {
  images: IImage[];
  extraImages: string[];
  _id: string;
  type: ProductTypes;
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

export interface IInspection {
  veredict: InspectionVeredict;
  type: InspectionType;
  status: InspectionStatus;
  completedBy: InspectionCompletedBy;
  products: IProduct[];
  _id: string;
  producer: IProducer;
  metadata: object;
}

export interface IInspectionHandler {}

export type ICreateInspectionParamsV2 = IIInspectionCommonParamsV2<ICreateInspectionProducer>;
