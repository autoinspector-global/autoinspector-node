import { Colors } from './colors';
import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import { IInspectionCommonParams } from './inspection';

export enum VehicleUse {
  OFICIAL = 'OFICIAL',
  PRIVADO = 'PRIVADO',
  PARTICULAR = 'PARTICULAR',
  TAXI = 'TAXI',
  REMIS = 'REMIS',
  AMBULANCIA = 'AMBULANCIA',
  ESCUELA_DE_CONDUCIR = 'ESCUELA DE CONDUCIR',
  TRANSPORTE_ESCOLAR_O_DE_MENORES = 'TRANSPORTE ESCOLAR O DE MENORES',
  TRANSPORTE_DE_PASAJEROS_INTERJURISDICCIONAL = 'TRANSPORTE DE PASAJEROS INTERJURISDICCIONAL',
  TRANSPORTE_DE_PASAJEROS_INTRAJURISDICCIONAL = 'TRANSPORTE DE PASAJEROS INTRAJURISDICCIONAL',
  TRANSPORTE_DE_CARGA_INTERJURISDICCIONAL = 'TRANSPORTE DE CARGA INTERJURISDICCIONAL',
  TRANSPORTE_DE_CARGA_INTRAJURISDICCIONAL = 'TRANSPORTE DE CARGA INTRAJURISDICCIONAL',
  TRANSPORTE_DE_CARGA_DE_SUSTANCIAS_PELIGROSAS = 'TRANSPORTE DE CARGA DE SUSTANCIAS PELIGROSAS',
  SERVICIO_DE_ALQUILER_SIN_CONDUCTOR = 'SERVICIO DE ALQUILER SIN CONDUCTOR',
}

export enum VehicleTypes {
  CAR = 'car',
  MOTO = 'moto',
}

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
   * Brand: Validation that verifies the brand of the product is the same as declared.
   */
  brand: IConfiguration;
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
  configuration?: IVehicleConfiguration;
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
   * Brand: The make/brand of the vehicle.
   */
  brand?: string;

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
export interface ICreateVehicleInspection extends IInspectionCommonParams {
  vehicle: IVehicle;
}
