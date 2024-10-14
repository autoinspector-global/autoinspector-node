import { IUpdateResourceResponse } from '../types/api';
import { ICreateCellphoneInspection, ICellphone } from '../types/cellphone';
import { ICreateInspectionOutput } from '../types/inspection';
import { IProductMethods } from '../types/productMethods';
import { generateIdempotencyHeader } from '../utils/idempotency';
import { HTTPClient } from './HTTPClient';

export class Cellphone implements IProductMethods<ICreateCellphoneInspection, Partial<ICellphone>> {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(body: ICreateCellphoneInspection): Promise<ICreateInspectionOutput> {
    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/cellphone`,
      headers: generateIdempotencyHeader(),
      body,
    });
  }

  async update(
    productId: string,
    cellphone: Partial<ICellphone>
  ): Promise<IUpdateResourceResponse> {
    return await this.httpClient.makeRequest({
      method: 'PUT',
      path: `/inspection/cellphone/${productId}`,
      body: {
        cellphone,
      },
    });
  }
}
