import { Moment } from 'moment';

export interface IUserLike {
  id?: number;
  createAt?: Moment;
  houseId?: number;
  userLogin?: string;
  userId?: number;
}

export const defaultValue: Readonly<IUserLike> = {};
