import FormData from 'form-data';
import { lstatSync } from 'fs';
import { IFilterInputValuesOutput } from '../types/helper';
import { IHeaders } from '../types/http';
import { IInputFile, IInputValue } from '../types/inspection';

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

  static filterInputs(inputs: IInputValue[]): IFilterInputValuesOutput {
    const inputValuesNonFiles: IInputValue[] = [];
    const inputValuesFiles: IInputFile[] = [];

    for (const inputValue of inputs) {
      if (inputValue.value instanceof Buffer) {
        inputValuesFiles.push(inputValue as IInputFile);
        continue;
      }

      inputValuesNonFiles.push(inputValue);
    }

    return {
      inputValuesFiles,
      inputValuesNonFiles,
    };
  }

  static buildFormData(input: { inputs?: IInputValue[]; [key: string]: any }) {
    const form = new FormData();

    if (!input.inputs) {
      form.append('data', JSON.stringify(input));
      return {
        form,
      };
    }

    const { inputs, ...rest } = input;

    const { inputValuesFiles, inputValuesNonFiles } = this.filterInputs(inputs);

    for (const inputFile of inputValuesFiles) {
      form.append(inputFile.identifier, inputFile.value, {
        contentType: inputFile.contentType,
        filename: inputFile.filename,
      });
    }

    form.append('data', JSON.stringify({ ...rest, inputs: inputValuesNonFiles }));

    return {
      form,
    };
  }
}
