import { Colors } from './colors';
import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import { IInspectionCommonParams } from './inspection';

export enum MachineryPurpose {
  AGRICOLA = 'Agrícola',
  VIAL = 'Vial',
  INDUSTRIAL = 'Industrial',
}

export enum MachineryUse {
  OFICIAL = 'OFICIAL',
  PRIVADO = 'PRIVADO',
  PÚBLICO = 'PÚBLICO',
}

export enum MachineryTypes {
  TRACTOR = 'tractor',
  COMBINE_HARVESTER = 'combine_harvester',
  SPRAYER = 'sprayer',
  SEEDER = 'seeder',
  FUMIGATOR = 'fumigator',
  BALER = 'baler',
  ROUND_BALER = 'round_baler',
  PAVER = 'paver',
  LEVELER = 'leveler',
  CRANE = 'crane',
  EXCAVATOR = 'excavator',
  CARTS = 'carts',
  GRADER = 'grader',
  LOADER = 'loader',
  SCRAPERS = 'scrapers',
  COMPACTING_MACHINE = 'compacting_machine',
  MACHINE_SOIL_TREATMENT = 'machine_soil_treatment',
  FORKLIFT = 'forklift',
  MOTOR_VEHICLE_WITH_COUPLING_DEVICE = 'motor_vehicle_with_coupling_device',
  FERTILIZER = 'fertilizer',
  BACKHOE = 'backhoe',
  BULLDOZER = 'bulldozer',
  COMPACTOR = 'compactor',
  HIDROGUA = 'hidrogua',
  TRENCHER = 'trencher',
  MIXER = 'mixer',
  HOPPER = 'hopper',
  MECHANICAL_SHOVEL = 'mechanical_shovel',
}

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
   * brand: `The brand of the machinery.`
   */
  brand?: string;
  /**
   * color: `The color of the machinery.`
   */
  color?: Colors;
  /**
   * year: `The year of the machinery.`
   */
  year?: string;
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
  type: MachineryTypes;
  /**
   * configuration: `The validation configuration template to be attached to the machinery.`
   */
  configuration?: IMachineryConfiguration;
}

export interface ICreateMachineryInspection extends IInspectionCommonParams {
  machinery: ICreateMachineryInspection;
}
