import axios from 'axios';
import { Storage, ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

import { IArticle, defaultValue } from 'app/shared/model/article.model';

export const ACTION_TYPES = {
  FETCH_ARTICLE_LIST: 'article/FETCH_ARTICLE_LIST',
  FETCH_ARTICLE_LIST_3: 'article/FETCH_ARTICLE_LIST_3',
  FETCH_ARTICLE_LIST_4: 'article/FETCH_ARTICLE_LIST_4',
  FETCH_ARTICLE_LIST_5: 'article/FETCH_ARTICLE_LIST_5',
  FETCH_ARTICLE_TOP: 'article/FETCH_ARTICLE_TOP',
  FETCH_ARTICLE_TOP_3: 'article/FETCH_ARTICLE_TOP_3',
  FETCH_ARTICLE_TOP_4: 'article/FETCH_ARTICLE_TOP_4',
  FETCH_ARTICLE_TOP_5: 'article/FETCH_ARTICLE_TOP_5',
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
  loadingTop3: false,
  top3Entities: [] as ReadonlyArray<IArticle>,
  loadingTop4: false,
  top4Entities: [] as ReadonlyArray<IArticle>,
  loadingTop5: false,
  top5Entities: [] as ReadonlyArray<IArticle>,
  allEntities: [] as ReadonlyArray<IArticle>,
  allTotalItems: 0,
  all3Entities: [] as ReadonlyArray<IArticle>,
  all3TotalItems: 0,
  all4Entities: [] as ReadonlyArray<IArticle>,
  all4TotalItems: 0,
  all5Entities: [] as ReadonlyArray<IArticle>,
  all5TotalItems: 0
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
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_TOP_3):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loadingTop3: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_TOP_4):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loadingTop4: true
      };
    case REQUEST(ACTION_TYPES.FETCH_ARTICLE_TOP_5):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loadingTop5: true
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
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_TOP_3):
      return {
        ...state,
        loadingTop3: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_TOP_4):
      return {
        ...state,
        loadingTop4: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case FAILURE(ACTION_TYPES.FETCH_ARTICLE_TOP_5):
      return {
        ...state,
        loadingTop5: false,
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
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_TOP_3):
      return {
        ...state,
        loadingTop3: false,
        top3Entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_TOP_4):
      return {
        ...state,
        loadingTop4: false,
        top4Entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARTICLE_TOP_5):
      return {
        ...state,
        loadingTop5: false,
        top5Entities: action.payload.data
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

export const getTopOfCategory5: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/5/top${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_TOP_5,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getTopOfCategory4: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/4/top${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_TOP_4,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getTopOfCategory3: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/3/top${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_TOP_3,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getBy5: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/5/all${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getBy4: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/4/all${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST,
    payload: client.get<IArticle>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getBy3: ICrudGetAllAction<IArticle> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/3/all${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ARTICLE_LIST,
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
