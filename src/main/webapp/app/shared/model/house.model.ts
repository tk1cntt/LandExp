import { Moment } from 'moment';
import { IHousePhoto } from './house-photo.model';

export const enum UserActionType {
  FOR_BUY = 'FOR_BUY',
  FOR_SELL = 'FOR_SELL',
  FOR_RENT = 'FOR_RENT',
  FOR_HIRE = 'FOR_HIRE'
}

export const enum MoneyType {
  MILLION = 'MILLION',
  BILLION = 'BILLION'
}

export const enum DirectionType {
  NORTH = 'NORTH',
  SOUTH = 'SOUTH',
  EAST = 'EAST',
  WEST = 'WEST',
  EAST_NORTH = 'EAST_NORTH',
  WEST_NORTH = 'WEST_NORTH',
  EAST_SOUTH = 'EAST_SOUTH',
  WEST_SOUTH = 'WEST_SOUTH'
}

export const enum LandType {
  APARTMENT = 'APARTMENT',
  PEN_HOUSE = 'PEN_HOUSE',
  HOME = 'HOME',
  HOME_VILLA = 'HOME_VILLA',
  HOME_STREET_SIDE = 'HOME_STREET_SIDE',
  MOTEL_ROOM = 'MOTEL_ROOM',
  OFFICE = 'OFFICE',
  LAND_SCAPE = 'LAND_SCAPE',
  LAND_OF_PROJECT = 'LAND_OF_PROJECT',
  LAND_FARM = 'LAND_FARM',
  LAND_RESORT = 'LAND_RESORT',
  WAREHOUSES = 'WAREHOUSES',
  KIOSKS = 'KIOSKS',
  OTHER = 'OTHER'
}

export const enum SaleType {
  SALE_BY_MYSELF = 'SALE_BY_MYSELF',
  SALE_BY_MYSELF_VIP = 'SALE_BY_MYSELF_VIP',
  SALE_SUPPORT = 'SALE_SUPPORT',
  SALE_SUPPORT_VIP = 'SALE_SUPPORT_VIP'
}

export const enum PresentType {
  NONE = 'NONE',
  BASIC_FURNITURE = 'BASIC_FURNITURE',
  FULL_FURNITURE = 'FULL_FURNITURE',
  DISCOUNT_PRICE = 'DISCOUNT_PRICE',
  SUPPORT_EXHIBIT = 'SUPPORT_EXHIBIT',
  SUPPORT_FEE = 'SUPPORT_FEE',
  HAVE_PRESENT = 'HAVE_PRESENT'
}

export const enum StatusType {
  PENDING = 'PENDING',
  PAID = 'PAID',
  APPROVED = 'APPROVED',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  SOLD = 'SOLD'
}

export interface IHouse {
  id?: number;
  avatar?: string;
  actionType?: UserActionType;
  address?: string;
  money?: number;
  moneyType?: MoneyType;
  acreage?: number;
  acreageStreetSide?: number;
  discount?: number;
  direction?: DirectionType;
  directionBalcony?: DirectionType;
  floor?: string;
  numberOfFloor?: number;
  bathRoom?: number;
  bedRoom?: number;
  parking?: boolean;
  furniture?: boolean;
  summary?: string;
  landType?: LandType;
  saleType?: SaleType;
  fee?: number;
  feeMax?: number;
  present?: PresentType;
  hits?: number;
  customer?: string;
  mobile?: string;
  email?: string;
  facebook?: string;
  zalo?: string;
  statusType?: StatusType;
  googleId?: string;
  latitude?: number;
  longitude?: number;
  createAt?: Moment;
  updateAt?: Moment;
  districtId?: number;
  photos?: IHousePhoto[];
  cityName?: string;
  cityId?: number;
  streetName?: string;
  streetId?: number;
  projectName?: string;
  projectId?: number;
  createByLogin?: string;
  createById?: number;
  updateByLogin?: string;
  updateById?: number;
}

export const defaultValue: Readonly<IHouse> = {
  parking: false,
  furniture: false
};
