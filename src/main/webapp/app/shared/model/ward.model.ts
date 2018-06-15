import { Moment } from 'moment';
import { IDistrict } from './district.model';

export interface IWard {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districts?: IDistrict[];
  districtName?: string;
  districtId?: number;
}

export const defaultValue: Readonly<IWard> = {
  enabled: false
};
