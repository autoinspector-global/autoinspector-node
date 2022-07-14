import { InspectionType } from './inspection';

export interface ITemplateFeature {
  _id: string;
  isActive: boolean;
  feature: string;
}

export type TemplateTypes = 'built-in' | 'created';

export type IInputStages = 'create' | 'update';

export interface IInputOptions {
  label: string;
}

export interface IInputValidationSchema {
  required: boolean;
  maxLength?: number;
  minLength?: number;
  minimum?: number;
  maximum?: number;
  email?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export type ITemplateInputTypes =
  | 'text'
  | 'date'
  | 'textare'
  | 'select'
  | 'numeric'
  | 'check'
  | 'file';

export interface ITemplateInput {
  _id: string;
  options: IInputOptions[];
  stages: IInputStages;
  type: ITemplateInputTypes;
  label: string;
  helperMessage?: string;
  validationSchema: IInputValidationSchema;
}

export interface ITemplateValidation {
  validation: string;
  required: boolean;
  run: boolean;
}

export interface ITemplateImage {
  _id: string;
  side: string;
  validations: ITemplateValidation[];
  inputs: ITemplateInput[];
  features: ITemplateFeature[];
}

export interface ITemplate {
  type: TemplateTypes;
  _id: string;
  inspectionType: InspectionType;
  lastSave: string;
  name: string;
  images: ITemplateImage[];
  inputs: ITemplateInput[];
  features: ITemplateFeature[];
}

export interface ITemplateListInput {
  inspectionType?: InspectionType;
  type?: TemplateTypes;
}
