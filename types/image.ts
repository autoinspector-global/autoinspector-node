export enum ImageSides {
  front = 'front',
  side_left = 'sideLeft',
  side_right = 'sideRight',
  side = 'side',
  back = 'back',
  id = 'id',
  wheel = 'wheel',
  tank = 'tank',
  board = 'board',
  chasis_number = 'chassis_number',
  serial_number = 'serial_number',
  dni = 'dni',
  selfie = 'selfie',
  back_side_left = 'backSideLeft',
  back_side_right = 'backSideRight',
  front_side_right = 'frontSideRight',
  front_side_left = 'frontSideLeft',
  roof = 'roof',
  cabin = 'cabin',
  backBumper = 'backBumper',
  tailgate = 'tailgate',
  hood = 'hood',
  frontBumper = 'frontBumper',
  backRightDoor = 'backRightDoor',
  backLeftDoor = 'backLeftDoor',
  frontLeftDoor = 'frontLeftDoor',
  frontRightDoor = 'frontRightDoor',
  backRightDefense = 'backRightDefense',
  backLeftDefense = 'backLeftDefense',
  frontLeftDefense = 'frontLeftDefense',
  frontRightDefense = 'frontRightDefense',
  inferiorRightPanel = 'inferiorRightPanel',
  inferiorLeftPanel = 'inferiorLeftPanel',
  backRightWindow = 'backRightWindow',
  backLeftWindow = 'backLeftWindow',
  frontLeftWindow = 'frontLeftWindow',
  frontRightWindow = 'frontRightWindow',
  backWindow = 'backWindow',
  windShield = 'windShield',
  backRightLight = 'backRightLight',
  backLeftLight = 'backLeftLight',
  frontLeftLight = 'frontLeftLight',
  frontRightLight = 'frontRightLight',
  leftMirror = 'leftMirror',
  rightMirror = 'rightMirror',
  frontLeftWheel = 'frontLeftWheel',
  frontRightWheel = 'frontRightWheel',
  backLeftWheel = 'backLeftWheel',
  backRightWheel = 'backRightWheel',
  under_hood = 'under_hood',
  backTires = 'backTires',
  frontTires = 'frontTires',
  chassis = 'chassis',
  body = 'body',
  gasTank = 'gasTank',
  seat = 'seat',
  handlebar = 'handlebar',
  tailOptic = 'tailOptic',
  headOptic = 'headOptic',
  backFender = 'backFender',
  frontFender = 'frontFender',
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface IUploadImage {
  coordinates?: ICoordinates;
  date?: Date;
  side: ImageSides;
  image: Buffer;
  productId: string;
}
