import { Moment } from 'moment';
import { IDistrict } from './district.model';

export interface ICity {
  id?: number;
  name?: string;
  index?: number;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  districts?: IDistrict[];
}

export const defaultValue: Readonly<ICity> = {
  enabled: false
};
