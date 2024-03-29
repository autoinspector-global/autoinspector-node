import { Colors } from './colors';
import { ICreateInspectionProducer, IInspectionCommonParamsV2 } from './inspection';

export interface ICar {
  /**
   * Plate: The plate of the vehicle.
   */
  plate: string;

  /**
   * Color: The color of the vehicle.
   */
  color?: Colors;

  /**
   * Milage: The milage of the vehicle.
   */
  milage?: number;

  /**
   * Use: The use of the vehicle.
   */
  use?: string;

  /**
   * Year: The year of the vehicle.
   */
  year?: string;

  /**
   * make: The make/brand of the vehicle.
   */
  make?: string;

  /**
   * Model: The model of the vehicle.
   */
  model?: string;

  /**
   * Chassis: The chassis of the vehicle.
   */
  chassis?: string;
}

export interface ICreateCarInspection extends IInspectionCommonParamsV2<ICreateInspectionProducer> {
  car?: Partial<ICar>;
}

export type InspectionCompletedBy = 'client' | 'expiration';

export interface IValidation {
  confidence: number;
  valid: boolean;
  _id: string;
  type: string;
}

export type InspectionType = 'goods' | 'people' | 'vehicle' | 'machinery' | 'car' | 'moto';

export type ICreateInspectionParamsV2 = IInspectionCommonParamsV2<ICreateInspectionProducer>;
