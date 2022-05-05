import FormData from 'form-data';
import { lstatSync, readFileSync } from 'fs';
import { IFilterInputValuesOutput } from '../types/helper';
import { IHeaders } from '../types/http';
import { IInputValue, IInspectionCommonParams } from '../types/inspection';

export class Helper {
  static buildOptionalHeaders(access_token?: string): IHeaders | undefined {
    if (access_token) {
      return {
        Authorization: `Bearer ${access_token}`,
      };
    }

    return;
  }

  static isNode() {
    return typeof window === 'undefined';
  }

  static isFile(path: string) {
    try {
      var stat = lstatSync(path);
      return stat.isFile();
    } catch (e) {
      return false;
    }
  }

  static readFile(path: string) {
    return readFileSync(path);
  }

  static filterInputValues(inputValues: IInputValue[]): IFilterInputValuesOutput {
    const inputValuesNonFiles: IInputValue[] = [];
    const inputValuesFiles: IInputValue[] = [];

    for (const inputValue of inputValues) {
      const isFile = inputValue.value instanceof Buffer || Helper.isFile(inputValue.value);

      if (isFile) {
        inputValuesFiles.push({
          label: inputValue.label,
          value:
            inputValue.value instanceof Buffer
              ? inputValue.value
              : Helper.readFile(inputValue.value),
        });

        continue;
      }

      inputValuesNonFiles.push(inputValue);
    }

    return {
      inputValuesFiles,
      inputValuesNonFiles,
    };
  }

  static buildFormData(input: { inputValues?: IInputValue[]; [key: string]: any }) {
    const form = new FormData();

    if (!input.inputValues) {
      form.append('data', JSON.stringify(input));
      return {
        form,
      };
    }

    const { inputValues, ...rest } = input;

    const { inputValuesFiles, inputValuesNonFiles } = this.filterInputValues(inputValues);

    for (const inputFile of inputValuesFiles) {
      form.append(inputFile.label, inputFile.value);
    }

    form.append('data', JSON.stringify({ ...rest, inputValues: inputValuesNonFiles }));

    return {
      form,
    };
  }
}
