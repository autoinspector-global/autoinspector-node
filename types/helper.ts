import { IInputFile, IInputValue } from './inspection';

export interface IFilterInputValuesOutput {
  inputValuesFiles: IInputFile[];
  inputValuesNonFiles: IInputValue[];
}
