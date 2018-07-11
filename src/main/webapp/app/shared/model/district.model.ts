import { Moment } from 'moment';
import { IWard } from './ward.model';

export interface IDistrict {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  regionId?: number;
  cityId?: number;
  wards?: IWard[];
}

export const defaultValue: Readonly<IDistrict> = {
  enabled: false
};
