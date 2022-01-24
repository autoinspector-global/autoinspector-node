export type Sex = 0 | 1 | 2 | 9;

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
