import axios from 'axios';
import { Storage, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

import { IPayment, defaultValue } from 'app/shared/model/payment.model';

export const ACTION_TYPES = {
  FETCH_PAYMENT_LIST: 'payment/FETCH_PAYMENT_LIST',
  FETCH_PAYMENT: 'payment/FETCH_PAYMENT',
  CREATE_PAYMENT: 'payment/CREATE_PAYMENT',
  UPDATE_PAYMENT: 'payment/UPDATE_PAYMENT',
  DELETE_PAYMENT: 'payment/DELETE_PAYMENT',
  RESET: 'payment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPayment>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PaymentState = Readonly<typeof initialState>;

// Reducer

export default (state: PaymentState = initialState, action): PaymentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENT):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENT):
    case REQUEST(ACTION_TYPES.DELETE_PAYMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENT):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENT):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENT):
    case FAILURE(ACTION_TYPES.DELETE_PAYMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENT_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYMENT):
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

const apiUrl = SERVER_API_URL + '/api/payments';

// Actions

export const getEntities: ICrudGetAllAction<IPayment> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENT_LIST,
    payload: client.get<IPayment>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPayment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENT,
    payload: client.get<IPayment>(requestUrl)
  };
};

export const getPaymentOfHouse: ICrudGetAction<IPayment> = id => {
  const requestUrl = `${apiUrl}/${id}/houses`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENT,
    payload: client.get<IPayment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPayment> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENT,
    payload: client.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPayment> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENT,
    payload: client.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const approvePayment: ICrudPutAction<IPayment> = id => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const requestUrl = `${apiUrl}/${id}/approve`;
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENT,
    payload: client.put(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPayment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYMENT,
    payload: client.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
