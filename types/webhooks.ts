import { IConsumer } from './consumer';
import {
  IImageDamage,
  InspectionStatus,
  InspectionVeredict,
  IProduct,
  IValidation,
} from './inspection';

export type IWebhookEvents =
  | 'inspection_started'
  | 'image_processed'
  | 'inspection_blocked'
  | 'inspection_completed'
  | 'inspection_reviewed';

export interface IWebhookProducer {
  companyId: string;
  userId?: string;
}

export interface IWebhookEvent<P, E extends IWebhookEvents> {
  event: E;
  payload: {
    producer: IWebhookProducer;
    metadata: {
      [key: string]: string;
    };
  } & P;
}

export interface IWebhookImage {
  side: string;
  processed: boolean;
  uploadedAt: string;
  _id: string;
  approved: boolean;
  src: string;
  validations: IValidation[];
  damages?: IImageDamage[];
}

export interface IWebhookInspectionStarted
  extends IWebhookEvent<
    {
      status: InspectionStatus;
    },
    'inspection_started'
  > {}

export type IWebhookImageProcessedProduct = {
  type: 'product';
  product: {
    _id: string;
    image: IWebhookImage[];
  };
};

export type IWebhookImageRestType<T extends 'identity' | 'custom'> = { type: T } & Record<
  T,
  { image: IWebhookImage }
>;

export interface IWebhookImageProcessed
  extends IWebhookEvent<
    | IWebhookImageProcessedProduct
    | IWebhookImageRestType<'custom'>
    | IWebhookImageRestType<'identity'>,
    'image_processed'
  > {}

export interface IWebhookInspectionBlocked
  extends IWebhookEvent<
    {
      status: 'blocked';
    },
    'inspection_blocked'
  > {}

export interface IWebhookInspectionCompleted
  extends IWebhookEvent<
    {
      status: 'completed';
      products: IProduct[];
      identity: IConsumer & {
        images: IWebhookImage[];
        extraImages: IWebhookImage[];
      };
      custom: {
        images: IWebhookImage[];
        extraImages: IWebhookImage[];
      };
      veredict: InspectionVeredict;
    },
    'inspection_completed'
  > {}

export type IWebhook =
  | IWebhookInspectionStarted
  | IWebhookImageProcessed
  | IWebhookInspectionBlocked
  | IWebhookInspectionCompleted;
