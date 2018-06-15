import { Moment } from 'moment';
import { ICity } from './city.model';
import { IHouse } from './house.model';

export interface IDistrict {
  id?: number;
  name?: string;
  enabled?: boolean;
  createAt?: Moment;
  updateAt?: Moment;
  regionId?: number;
  cities?: ICity[];
  houses?: IHouse[];
  cityName?: string;
  cityId?: number;
  wardId?: number;
}

export const defaultValue: Readonly<IDistrict> = {
  enabled: false
};
