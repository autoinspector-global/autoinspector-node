export interface IProductService {
  create(input: any): Promise<any>;

  update(input: any): Promise<any>;
}
