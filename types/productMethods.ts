import { ICreateInspectionProducer, IInspectionCommonParamsV2 } from './inspection';

export interface IProductMethods<
  C extends IInspectionCommonParamsV2<ICreateInspectionProducer>,
  U extends object = any
> {
  create(input: C): Promise<any>;

  update?(productId: string, update: U): Promise<any>;
}
