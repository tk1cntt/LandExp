import axios from 'axios';
import { Storage, ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

import { ICity, defaultValue } from 'app/shared/model/city.model';

export const ACTION_TYPES = {
  FETCH_CITY_LIST: 'city/FETCH_CITY_LIST',
  FETCH_CITY: 'city/FETCH_CITY',
  CREATE_CITY: 'city/CREATE_CITY',
  UPDATE_CITY: 'city/UPDATE_CITY',
  DELETE_CITY: 'city/DELETE_CITY',
  RESET: 'city/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICity>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CityState = Readonly<typeof initialState>;

// Reducer

export default (state: CityState = initialState, action): CityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CITY):
    case REQUEST(ACTION_TYPES.UPDATE_CITY):
    case REQUEST(ACTION_TYPES.DELETE_CITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CITY):
    case FAILURE(ACTION_TYPES.CREATE_CITY):
    case FAILURE(ACTION_TYPES.UPDATE_CITY):
    case FAILURE(ACTION_TYPES.DELETE_CITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CITY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CITY):
    case SUCCESS(ACTION_TYPES.UPDATE_CITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/cities';

// Actions

export const getEntities: ICrudGetAllAction<ICity> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CITY_LIST,
  payload: client.get<ICity>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getAllEntities: ICrudGetAllAction<ICity> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CITY_LIST,
  payload: client.get<ICity>(`${apiUrl}/all?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICity> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CITY,
    payload: client.get<ICity>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICity> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CITY,
    payload: client.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICity> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CITY,
    payload: client.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICity> = id => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CITY,
    payload: client.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
