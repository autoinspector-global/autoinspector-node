export type Sex = 'male' | 'female' | 'not_applicable';

export interface IConsumer {
  firstName: string;
  lastName: string;
  identification: string;
  email: string;
  birthdate?: string;
  sex?: Sex;
  phone?: string;
  state?: string;
  country?: string;
  city?: string;
  address?: string;
}
