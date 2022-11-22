import { ICreateInspectionProducer, IInspectionCommonParamsV2 } from './inspection';

export interface IBike {
  make: string;
  model: string;
  price: number;
  serialNumber: string;
}

export interface ICreateBikeInspection
  extends IInspectionCommonParamsV2<ICreateInspectionProducer> {
  bike?: Partial<IBike>;
}
