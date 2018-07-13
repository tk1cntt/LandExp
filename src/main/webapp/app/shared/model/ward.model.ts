import { Moment } from 'moment';

export interface IWard {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districtId?: number;
  districtName?: string;
}

export const defaultValue: Readonly<IWard> = {
  enabled: false
};
