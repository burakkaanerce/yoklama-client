import {
  createSlice,
} from '@reduxjs/toolkit';
import { addRegistrationFunc, fetchRegistrationFunc } from '../api/registration';

const initialState = {
  loading: {
    addRegistration: false,
  },
  hasErrors: {
    addRegistration: false,
  },
  registrations: []
};

const registrationSlice = createSlice({
  name: 'registration',
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
    fetchRegistrationSuccess: (state, {
      payload
    }) => {
      state.registrations = payload;
      state.loading.addRegistration = false;
      state.hasErrors.addRegistration = false;
    },
    addRegistrationSuccess: (state, {
      payload,
    }) => {
      state.loading.addRegistration = false;
      state.hasErrors.addRegistration = false;
    },
  },
});

export const {
  asyncStart,
  asyncFailure,
  fetchRegistrationSuccess,
  addRegistrationSuccess,
} = registrationSlice.actions;

export default registrationSlice.reducer;

export const registrationSelector = (state) => state.registration;

export const fetchRegistration = ({ lectureId, lecturerId }) => async (dispatch) => {
  dispatch(asyncStart('fetchRegistration'));

  try {
    const returnResponse = await fetchRegistrationFunc({ lectureId, lecturerId })
    .then((result) => {
      console.log('result: ', result);
      const { data } = result;
      console.log('data: ', data);
      if (data) {
        const { success, registration } = data;

        if (success && registration) {
          dispatch(fetchRegistrationSuccess(registration))
          return registration;
        }
        throw Error('ADDING_FAILED');
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
    dispatch(asyncFailure('fetchRegistration'));
  }
}

export const addRegistration = ({ startDate, endDate, lectureId, lecturerId }) => async (dispatch) => {
  dispatch(asyncStart('addRegistration'));

  try {
    const returnResponse = await addRegistrationFunc({ startDate, endDate, lectureId, lecturerId })
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, registration } = data;

          if (success && registration) {
            return registration;
          }
          throw Error('ADDING_FAILED');
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
    dispatch(asyncFailure('addRegistration'));
  }
};
