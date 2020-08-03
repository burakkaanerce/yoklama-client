import {
  createSlice,
} from '@reduxjs/toolkit';
import { loginProcessFunc } from '../api/lecturer';

const initialState = {
  loading: {
    loginProcess: false,
  },
  hasErrors: {
    loginProcess: false,
  },
  auth: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    asyncStart: (state, {
      payload,
    }) => {
      state.loading[payload] = true;
      state.hasErrors[payload] = false;
    },
    asyncFailure: (state, {
      payload,
    }) => {
      state.loading[payload] = false;
      state.hasErrors[payload] = true;
    },
    loginProcessSuccess: (state, {
      payload,
    }) => {
      state.auth = payload;
      state.loading.loginProcess = false;
      state.hasErrors.loginProcess = false;
    },
    logoutProcessSuccess: (state, {
      payload
    }) => {
      state.auth = null;
      state.loading.logoutProcess = false;
      state.hasErrors.logoutProcess = false;
    }
  },
});

export const {
  asyncStart,
  asyncFailure,
  loginProcessSuccess,
  logoutProcessSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state) => state.auth;

export const loginAction = ({ token, user }) => async (dispatch) => {
  dispatch(asyncStart('loginProcess'));

  try {
    const userResponse = { token, user };
    
    dispatch(loginProcessSuccess(userResponse));
    return userResponse;
  } catch (error) {
    console.log('failed: ', error);
    dispatch(asyncFailure('loginProcess'));
  }
};

export const loginProcess = ({ email, password }) => async (dispatch) => {
  dispatch(asyncStart('loginProcess'));

  try {
    const returnResponse = await loginProcessFunc({ email, password })
      .then((result) => {
        
        const { data } = result;
        
        if (data) {
          const { success, token, user } = data;

          if (success && token && user) {
            const userResponse = { token, user };
            
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', token);
            }
            dispatch(loginProcessSuccess(userResponse));
            return userResponse;
          }
          throw Error('LOGIN_FAILED');
        } else {
          throw Error('REQUEST_FAILED');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
        throw error || Error('REQUEST_FAILED');
      });
    
    return returnResponse;
  } catch (error) {
    console.log('failed: ', error);
    dispatch(asyncFailure('loginProcess'));
  }
};

export const logoutProcess = () => async (dispatch) => {
  dispatch(asyncStart('logoutProcess'));

  try {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    return dispatch(logoutProcessSuccess());
  } catch (error) {
    console.log('failed: ', error);
    dispatch(asyncFailure('logoutProcess'));
  }
};