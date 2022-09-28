import { Colors } from './colors';
import { ICreateInspectionProducer, IIInspectionCommonParamsV2 } from './inspection';

export interface IBike {
  make: string;
  model: string;
  price: number;
  serialNumber: string;
}

export interface ICreateBikeInspection
  extends IIInspectionCommonParamsV2<ICreateInspectionProducer> {
  bike?: Partial<IBike>;
}
