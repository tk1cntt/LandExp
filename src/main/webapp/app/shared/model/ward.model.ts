import { Moment } from 'moment';

export interface IWard {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districtName?: string;
  districtId?: number;
}

export const defaultValue: Readonly<IWard> = {
  enabled: false
};
