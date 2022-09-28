import { ICar, ICreateInspectionParamsV2 } from './car';

export interface IMoto extends ICar {}

export interface ICreateMotoInspection extends ICreateInspectionParamsV2 {
  moto?: Partial<IMoto>;
}
