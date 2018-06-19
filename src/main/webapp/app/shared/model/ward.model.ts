import { Moment } from 'moment';
import { IStreet } from './street.model';

export interface IWard {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districtId?: number;
  streets?: IStreet[];
  districtName?: string;
}

export const defaultValue: Readonly<IWard> = {
  enabled: false
};
