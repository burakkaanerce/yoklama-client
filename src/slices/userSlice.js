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
  },
});

export const {
  asyncStart,
  asyncFailure,
  loginProcessSuccess,
} = authSlice.actions;

export default authSlice.reducer;

export const authSelector = (state) => state.auth;

export const loginProcess = ({ email, password }) => async (dispatch) => {
  dispatch(asyncStart('loginProcess'));

  try {
    const returnResponse = await loginProcessFunc({ email, password })
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, token, user } = data;

          if (success && token && user) {
            const userResponse = { token, user };
            console.log('userResponse: ', userResponse);
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
    console.log('returnResponse: ', returnResponse);
    return returnResponse;
  } catch (error) {
    console.log('failed: ', error);
    dispatch(asyncFailure('loginProcess'));
  }
};
