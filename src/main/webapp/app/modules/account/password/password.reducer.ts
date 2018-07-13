import axios from 'axios';
import { translate } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

const client = axios.create({
  baseURL: SERVER_API_URL
});

export const ACTION_TYPES = {
  UPDATE_PASSWORD: 'account/UPDATE_PASSWORD',
  RESET: 'account/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  updateSuccess: false,
  updateFailure: false
};

export type PasswordState = Readonly<typeof initialState>;

// Reducer
export default (state: PasswordState = initialState, action): PasswordState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        loading: false,
        updateSuccess: false,
        updateFailure: true
      };
    case SUCCESS(ACTION_TYPES.UPDATE_PASSWORD):
      return {
        ...initialState,
        loading: false,
        updateSuccess: true,
        updateFailure: false
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

// Actions
const apiUrl = '/api/account';

export const savePassword = (currentPassword, newPassword) => ({
  type: ACTION_TYPES.UPDATE_PASSWORD,
  payload: client.post(`${apiUrl}/change-password`, { currentPassword, newPassword }),
  meta: {
    successMessage: translate('password.messages.success'),
    errorMessage: translate('password.messages.error')
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
