export enum Sex {
  NOT_KNOWN = 0,
  MALE = 1,
  FEMALE = 2,
  NOT_APPLICABLE = 9,
}

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
