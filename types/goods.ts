import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import { IInspectionCommonParams } from './inspection';

export interface IGoodConfiguration extends IConfigurationCommonValidations {
  /**
   * object: `Validation that verifies the serial number that appears in the serialNumber photo is the same as declared.`
   */
  serialNumber: IConfiguration;
}

/**
 * Represents the people object to be attached to the inspection.
 */
export interface IGood {
  /**
   * brand: `The brand of the good item.`
   */
  brand: string;
  /**
   * model: `The model of the good item.`
   */
  model: string;
  /**
   * type: `The type of the good item.`
   */
  type: string;
  /**
   * category: `The category of the good item.`
   */
  category: string;
  /**
   * serialNumber: `The serialNumber of the good item.`
   */
  serialNumber?: string;
  /**
   * price: `The price of the good item.`
   */
  price: string;
  /**
   * configuration: `Validation Configuration Template to be attached to the Good Inspection Item. If it not setted, the default configuration will be applied.`
   */
  configuration?: IGoodConfiguration;
}

/**
 * Represents the object to be sended when create an inspection of type vehicle.
 */
export interface ICreateGoodsInspection extends IInspectionCommonParams {
  goods: IGood[];
}
