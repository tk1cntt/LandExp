import axios from 'axios';
import { Storage, ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

import { IHouse, defaultValue } from 'app/shared/model/house.model';

export const ACTION_TYPES = {
  SEARCH_HOUSES: 'house/SEARCH_HOUSES',
  FETCH_HOUSE_LIST: 'house/FETCH_HOUSE_LIST',
  FETCH_HOUSE: 'house/FETCH_HOUSE',
  CREATE_HOUSE: 'house/CREATE_HOUSE',
  UPDATE_HOUSE: 'house/UPDATE_HOUSE',
  DELETE_HOUSE: 'house/DELETE_HOUSE',
  SET_BLOB: 'house/SET_BLOB',
  RESET: 'house/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IHouse>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type HouseState = Readonly<typeof initialState>;

// Reducer

export default (state: HouseState = initialState, action): HouseState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_HOUSES):
    case REQUEST(ACTION_TYPES.FETCH_HOUSE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_HOUSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_HOUSE):
    case REQUEST(ACTION_TYPES.UPDATE_HOUSE):
    case REQUEST(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_HOUSES):
    case FAILURE(ACTION_TYPES.FETCH_HOUSE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_HOUSE):
    case FAILURE(ACTION_TYPES.CREATE_HOUSE):
    case FAILURE(ACTION_TYPES.UPDATE_HOUSE):
    case FAILURE(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_HOUSES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_HOUSE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_HOUSE):
    case SUCCESS(ACTION_TYPES.UPDATE_HOUSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_HOUSE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/houses';
const apiSearchUrl = SERVER_API_URL + '/api/_search/houses';

// Actions

export const getSearchEntities: ICrudSearchAction<IHouse> = query => ({
  type: ACTION_TYPES.SEARCH_HOUSES,
  payload: client.get<IHouse>(`${apiSearchUrl}?query=` + query)
});

export const getEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/users${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: client.get<IHouse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getOwnerEntities: ICrudGetAllAction<IHouse> = (page, size, sort) => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const requestUrl = `${apiUrl}/owner${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE_LIST,
    payload: client.get<IHouse>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IHouse> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_HOUSE,
    payload: client.get<IHouse>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IHouse> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_HOUSE,
    payload: client.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IHouse> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_HOUSE,
    payload: client.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IHouse> = id => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_HOUSE,
    payload: client.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
