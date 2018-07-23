import axios from 'axios';
import { Storage, ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

import { IArticle, defaultValue } from 'app/shared/model/article.model';
import { IMapArticle } from 'app/shared/model/article.all.model';

export const ACTION_TYPES = {
  FETCH_ARTICLE_LIST: 'article/FETCH_ARTICLE_LIST',
  FETCH_ARTICLE_TOP: 'article/FETCH_ARTICLE_TOP',
  FETCH_ARTICLE_TOP_LIST: 'article/FETCH_ARTICLE_TOP_LIST',
  FETCH_ARTICLE: 'article/FETCH_ARTICLE',
  CREATE_ARTICLE: 'article/CREATE_ARTICLE',
  UPDATE_ARTICLE: 'article/UPDATE_ARTICLE',
  DELETE_ARTICLE: 'article/DELETE_ARTICLE',
  SET_BLOB: 'article/SET_BLOB',
  RESET: 'article/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArticle>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
  loadingTop: false,
  topEntities: [] as ReadonlyArray<IArticle>,
  loadingTopList: false,
  topListEntities: [] as ReadonlyArray<IMapArticle>
};

export type ArticleState = Readonly<typeof initialState>;

// Reducer

export default (state: ArticleState = initialState, action): ArticleState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_TOP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loadingTop: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_TOP_LIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loadingTopList: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARTICLE):
    case REQUEST(ACTION_TYPES.UPDATE_ARTICLE):
    case REQUEST(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE):
    case FAILURE(ACTION_TYPES.CREATE_ARTICLE):
    case FAILURE(ACTION_TYPES.UPDATE_ARTICLE):
    case FAILURE(ACTION_TYPES.DELETE_ARTICLE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_TOP):
      return {
        ...state,
        loadingTop: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_TOP_LIST):
      return {
        ...state,
        loadingTopList: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_TOP):
      return {
        ...state,
        loadingTop: false,
        topEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_TOP_LIST):
      return {
        ...state,
        loadingTopList: false,
        topListEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARTICLE):
    case SUCCESS(ACTION_TYPES.UPDATE_ARTICLE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARTICLE):
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

const apiUrl = SERVER_API_URL + '/api/articles';

// Actions

export const getEntities: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getTopEntities: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/top${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_TOP,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getTopList: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/5/top${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_TOP_LIST,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IArticle> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE,
    payload: client.get<IArticle>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArticle> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARTICLE,
    payload: client.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IArticle> = entity => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARTICLE,
    payload: client.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArticle> = id => async dispatch => {
  const jwt = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (jwt) {
    client.defaults.headers['Authorization'] = `Bearer ${jwt}`;
  }
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARTICLE,
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
