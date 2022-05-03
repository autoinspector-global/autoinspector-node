import FormData from 'form-data';
import { ICreateCarInspection } from '../types/car';
import { ICreateInspectionOutput, IInputValue } from '../types/inspection';
import { Helper } from './Helper';
import { HTTPClient } from './HTTPClient';

export class Car {
  constructor(private readonly httpClient: HTTPClient) {}

  async create(input: ICreateCarInspection): Promise<ICreateInspectionOutput> {
    const form = new FormData();

    const { inputValues, ...rest } = input;

    const inputValuesNonFiles: IInputValue[] = [];

    for (const inputValue of inputValues) {
      const isFile = inputValue.value instanceof Buffer || Helper.isFile(inputValue.value);

      if (isFile) {
        form.append(
          inputValue.label,
          inputValue.value instanceof Buffer ? inputValue.value : Helper.readFile(inputValue.value)
        );
        continue;
      }

      inputValuesNonFiles.push(inputValue);
    }

    form.append('data', JSON.stringify({ ...rest, inputValues: inputValuesNonFiles }));

    return await this.httpClient.makeRequest({
      method: 'POST',
      path: `/inspection/car`,
      body: input,
      headers: form.getHeaders(),
    });
  }
}
