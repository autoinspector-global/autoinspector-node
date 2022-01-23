import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import { IInspectionCommonParams } from './inspection';

export interface IPeopleConfiguration extends IConfigurationCommonValidations {
  /**
   * full_name: `Validation that verifies the full name that appears in the id photo is the same as declared.`.
   */
  full_name: IConfiguration;

  /**
   * sex: `Validation that verifies the person that appears in the photos has the same sex as declared.`.
   */
  sex: IConfiguration;

  /**
   * age: `Validation that verifies the person that appears in the photos has the same age as declared.`.
   */
  age: IConfiguration;

  /**
   * dni: `Validation that verifies the identification number that appears in the dni photo is the same as declared.`.
   */
  dni: IConfiguration;

  /**
   * birthdate: `Validation that verifies the birthdate that appears in the dni is the same as declared.`.
   */
  birthdate: IConfiguration;

  /**
   * face_comparison: `Validation that verifies the photos taken belongs to the same person.`.
   */
  face_comparison: IConfiguration;
}

/**
 * Represents the people object to be attached to the inspection.
 */
export interface IPeople {
  /**
   * configuration: `Validation Configuration Templated to be attached to the People inspection. If it not setted, the default configuration will be applied.`
   */
  configuration?: IPeopleConfiguration;
}

/**
 * Represents the object to be sended when create an inspection of type vehicle.
 */
export interface ICreatePeopleInspection extends IInspectionCommonParams {
  people: IPeople;
}
