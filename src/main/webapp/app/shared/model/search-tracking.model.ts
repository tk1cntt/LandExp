import { Moment } from 'moment';

export const enum UserActivityType {
  USER_SEARCH_BUY = 'USER_SEARCH_BUY',
  USER_SEARCH_RENT = 'USER_SEARCH_RENT',
  USER_VIEW_NEWS = 'USER_VIEW_NEWS',
  USER_LIKE_NEWS = 'USER_LIKE_NEWS',
  USER_CREATE_NEWS = 'USER_CREATE_NEWS',
  USER_UPDATE_NEWS = 'USER_UPDATE_NEWS',
  USER_SUBSCRIPTION = 'USER_SUBSCRIPTION',
  USER_UNSUBSCRIPTION = 'USER_UNSUBSCRIPTION',
  USER_REGISTERED_CONSULTING = 'USER_REGISTERED_CONSULTING',
  USER_UPDATE_SALE_TYPE = 'USER_UPDATE_SALE_TYPE',
  USER_PAID_NEWS = 'USER_PAID_NEWS',
  USER_SOLD_HOUSE = 'USER_SOLD_HOUSE',
  USER_BOUGTH_HOUSE = 'USER_BOUGTH_HOUSE',
  USER_CREATE_BANNER = 'USER_CREATE_BANNER',
  USER_UPDATE_BANNER = 'USER_UPDATE_BANNER'
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

export interface ISearchTracking {
  id?: number;
  actionType?: UserActivityType;
  keyword?: string;
  costFrom?: number;
  costTo?: number;
  acreageFrom?: number;
  acreageTo?: number;
  direction?: DirectionType;
  floor?: string;
  bathRoom?: number;
  bedRoom?: number;
  parking?: boolean;
  landType?: LandType;
  createAt?: Moment;
  userLogin?: string;
  userId?: number;
  cityName?: string;
  cityId?: number;
  districtName?: string;
  districtId?: number;
}

export const defaultValue: Readonly<ISearchTracking> = {
  parking: false
};
