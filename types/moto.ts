import { ICar } from './car';
import { ICreateInspectionParamsV2, IUpdateInspectionParamsV2 } from './inspection';

export interface IMoto extends ICar {}

export interface ICreateMotoInspection extends ICreateInspectionParamsV2 {
  moto: IMoto;
}

export interface IUpdateMotoInspection extends IUpdateInspectionParamsV2 {
  moto?: Partial<IMoto>;
}
