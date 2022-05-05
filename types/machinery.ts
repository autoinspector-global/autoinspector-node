import { Colors } from './colors';
import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import {
  ICreateInspectionParamsV2,
  ICreateInspectionProducer,
  IInspectionCommonParams,
  IInspectionUpdateCommonParams,
  IUpdateInspectionParamsV2,
} from './inspection';

export type MachineryPurpose = 'Agrícola' | 'Vial' | 'Industrial';

export type MachineryUse = 'OFICIAL' | 'PRIVADO' | 'PÚBLICO';

export type MachineryType =
  | 'tractor'
  | 'combine_harvester'
  | 'sprayer'
  | 'seeder'
  | 'fumigator'
  | 'baler'
  | 'round_baler'
  | 'paver'
  | 'leveler'
  | 'crane'
  | 'excavator'
  | 'carts'
  | 'grader'
  | 'loader'
  | 'scrapers'
  | 'compacting_machine'
  | 'machine_soil_treatment'
  | 'forklift'
  | 'motor_vehicle_with_coupling_device'
  | 'fertilizer'
  | 'backhoe'
  | 'bulldozer'
  | 'compactor'
  | 'hidrogua'
  | 'trencher'
  | 'mixer'
  | 'hopper'
  | 'mechanical_shovel';

export interface IMachineryConfiguration extends IConfigurationCommonValidations {
  /**
   * type: `Validation that verifies the type that appears in the identification product card is the same as declared.`
   */
  type: IConfiguration;

  /**
   * purpose: `Validation that verifies the purpose that appears in the identification product card is the same as declared.`
   */
  purpose: IConfiguration;

  /**
   * use: `Validation that verifies the use that appears in the identification product card is the same as declared.`
   */
  use: IConfiguration;
  /**
   * plate: `Validation that verifies the plate that appears in the identification product card is the same as declared.`
   */
  plate: IConfiguration;
}

export interface IMachinery {
  /**
   * make: `The make of the machinery.`
   */
  make?: string;
  /**
   * color: `The color of the machinery.`
   */
  color?: Colors;
  /**
   * year: `The year of the machinery.`
   */
  year?: number;
  /**
   * model: `The model of the machinery.`
   */
  model?: string;
  /**
   * purpose: `The purpose of the machinery.`
   */
  purpose?: MachineryPurpose;
  /**
   * use: `The use of the machinery.`
   */
  use?: string;

  /**
   * type: `The type of the machinery.`
   */
  type: MachineryType;
  /**
   * configuration: `The validation configuration template to be attached to the machinery.`
   */
  configuration?: Partial<IMachineryConfiguration>;
}

export interface ICreateMachineryInspection extends ICreateInspectionParamsV2 {
  machinery: IMachinery;
}

export interface IUpdateMachineryInspection extends IUpdateInspectionParamsV2 {
  machinery?: Partial<IMachinery>;
}
