import { ReadStream } from 'fs';

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

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IUploadImage {
  coordinates?: ICoordinates;
  date?: Date;
  side: ImageSide;
  image: Buffer | ReadStream;
  productId: string;
}
