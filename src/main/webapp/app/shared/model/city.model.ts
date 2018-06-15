import { Moment } from 'moment';

export interface ICity {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districtId?: number;
}

export const defaultValue: Readonly<ICity> = {
  enabled: false
};
