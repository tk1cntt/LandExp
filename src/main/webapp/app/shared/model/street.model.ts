import { Moment } from 'moment';

export interface IStreet {
  id?: number;
  name?: string;
  postalCode?: string;
  stateProvince?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  wardId?: number;
}

export const defaultValue: Readonly<IStreet> = {
  enabled: false
};
