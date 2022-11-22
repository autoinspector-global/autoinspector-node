import { IConfiguration, IConfigurationCommonValidations } from './configuration';
import { ICreateInspectionProducer, IInspectionCommonParamsV2 } from './inspection';

export interface IGoodConfiguration extends IConfigurationCommonValidations {
  /**
   * object: `Validation that verifies the serial number that appears in the serialNumber photo is the same as declared.`
   */
  serialNumber: IConfiguration;
}

export type GoodsCategory =
  | 'sports'
  | 'electronics'
  | 'instruments'
  | 'jewellery'
  | 'art'
  | 'home'
  | 'mobility';

export type GoodsType =
  | 'skies'
  | 'surf_table'
  | 'kayak'
  | 'golf_set'
  | 'skate_board'
  | 'mobile'
  | 'laptop'
  | 'tablets'
  | 'monitor'
  | 'watch_digital'
  | 'printer_3d'
  | 'headsets'
  | 'camera'
  | 'controllers'
  | 'drone'
  | 'sax'
  | 'violin'
  | 'guitar'
  | 'drums'
  | 'keyboard'
  | 'amplifier'
  | 'jewel'
  | 'watch_luxury'
  | 'paint'
  | 'refrigerator'
  | 'microwave'
  | 'tv'
  | 'freezer'
  | 'bike'
  | 'scuter';

/**
 * Represents the people object to be attached to the inspection.
 */
export interface IGood {
  /**
   * make: `The make of the good item.`
   */
  make: string;
  /**
   * model: `The model of the good item.`
   */
  model: string;
  /**
   * type: `The type of the good item.`
   */
  type: GoodsType;
  /**
   * category: `The category of the good item.`
   */
  category: GoodsCategory;
  /**
   * serialNumber: `The serialNumber of the good item.`
   */
  serialNumber?: string;
  /**
   * price: `The price of the good item.`
   */
  price: string;
}

/**
 * Represents the object to be sended when create an inspection of type vehicle.
 */
export interface ICreateGoodsInspection
  extends IInspectionCommonParamsV2<ICreateInspectionProducer> {
  goods?: Partial<IGood>[];
}


