import { Colors } from './colors';
import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import {
  ICreateInspectionProducer,
  IInspectionCommonParams,
  IInspectionUpdateCommonParams,
} from './inspection';

export type VehicleUse =
  | 'OFICIAL'
  | 'PRIVADO'
  | 'PARTICULAR'
  | 'TAXI'
  | 'REMIS'
  | 'AMBULANCIA'
  | 'ESCUELA DE CONDUCIR'
  | 'TRANSPORTE ESCOLAR O DE MENORES'
  | 'TRANSPORTE DE PASAJEROS INTERJURISDICCIONAL'
  | 'TRANSPORTE DE PASAJEROS INTRAJURISDICCIONAL'
  | 'TRANSPORTE DE CARGA INTERJURISDICCIONAL'
  | 'TRANSPORTE DE CARGA INTRAJURISDICCIONAL'
  | 'TRANSPORTE DE CARGA DE SUSTANCIAS PELIGROSAS'
  | 'SERVICIO DE ALQUILER SIN CONDUCTOR';

export type VehicleTypes = 'car' | 'moto';

/**
 * Represents the vehicle configuration template for run the validations.
 */
export interface IVehicleConfiguration extends IConfigurationCommonValidations {
  /**
   * Object: Validation that verifies if the object in the image is the same as declared.
   */
  object: IConfiguration;

  /**
   * Color: Validation that verifies the color of the object is the same as declared.
   */
  color: IConfiguration;
  /**
   * Angle: Validation that verifies the color of the object is the same as declared.
   */
  angle: IConfiguration;
  /**
   * Make: Validation that verifies the make of the product is the same as declared.
   */
  make: IConfiguration;
  /**
   * Model: Validation that verifies the color of the object is the same as declared.
   */
  model: IConfiguration;
  /**
   * Use: Validation that verifies the use of the vehicle is the same that appears in the ID of the vehicle.
   */
  use: IConfiguration;
  /**
   * Damage: Validation that verifies the object does not have any damage.
   */
  damage: IConfiguration;
  /**
   * Damage: Validation that verifies the object appears completly in the photo taken.
   */
  complete: IConfiguration;
  /**
   * Damage: Validation that verifies VIN (vehicle identification number) is the same as declared.
   */
  vin: IConfiguration;
  /**
   * Plate: Validation that verifies the plate of the vehicle is the same as declared.
   */
  plate: IConfiguration;
  /**
   * SpareTire: Validation that verifies there is a spareTire in the photo taken.
   *
   * * IMPORTANT: This validation will only run if the vehicle type is car.
   */
  spareTire: IConfiguration;
  /**
   * gnc: Validation that verifies there is a gnc in the photo taken.
   *
   * * IMPORTANT: This validation will only run if the vehicle type is car.
   */
  gnc: IConfiguration;
}

/**
 * Vehicle: Represents the vehicle to be attached to the inspection.
 */
export interface IVehicle {
  /**
   * Configuration: The validation configuration template for the inspection.
   */
  configuration?: Partial<IVehicleConfiguration>;
  /**
   * Type: The type of vehicle.
   */
  type: VehicleTypes;
  /**
   * Color: The color of the vehicle.
   */
  color?: Colors;
  /**
   * Plate: The plate of the vehicle.
   */
  plate?: string;

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

/**
 * Represents the object to be sended when create an inspection of type vehicle.
 */
export interface ICreateVehicleInspection
  extends IInspectionCommonParams<ICreateInspectionProducer> {
  vehicle: IVehicle;
}

export interface IUpdateVehicleInspection extends Partial<IInspectionUpdateCommonParams> {
  vehicle?: IVehicle;
}
