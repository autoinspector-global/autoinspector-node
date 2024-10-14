import { ICreateInspectionProducer, IInspectionCommonParamsV2 } from './inspection';

export interface ICellphone {
  make: string;
  model: string;
  price: number;
  serialNumber: string;
}

export interface ICreateCellphoneInspection
  extends IInspectionCommonParamsV2<ICreateInspectionProducer> {
  cellphone?: Partial<ICellphone>;
}
