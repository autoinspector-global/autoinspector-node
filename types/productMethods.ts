export interface IProductMethods {
  create(input: any): Promise<any>;

  update?(input: any): Promise<any>;
}
