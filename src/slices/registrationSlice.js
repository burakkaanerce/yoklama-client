import {
  createSlice,
} from '@reduxjs/toolkit';
import { addRegistrationFunc, fetchRegistrationFunc, fetchRegistrationsFunc, registerFunc, closeAccessRegistrationFunc, downloadRegistrationListFunc } from '../api/registration';

const initialState = {
  loading: {
    addRegistration: false,
    fetchRegistration: false,
    fetchRegistrations: false,
    register: false,
    closeAccessRegistration: false,
    downloadRegistrationList: false,
  },
  hasErrors: {
    addRegistration: false,
    fetchRegistration: false,
    fetchRegistrations: false,
    register: false,
    closeAccessRegistration: false,
    downloadRegistrationList: false,
  },
  registrations: [],
  registration: null,
  registered: false
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
      payload,
    }) => {
      state.registration = payload;
      state.loading.addRegistration = false;
      state.hasErrors.addRegistration = false;
    },
    fetchRegistrationsSuccess: (state, {
      payload,
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
    closeAccessRegistrationSuccess: (state, {
      payload,
    }) => {
      state.loading.closeAccessRegistration = false;
      state.hasErrors.closeAccessRegistration = false;
    },
    registerSuccess: (state, {
      payload
    }) => {
      state.registered = true;
      state.loading.register = false;
      state.hasErrors.register = false;
    }
  },
});

export const {
  asyncStart,
  asyncFailure,
  fetchRegistrationSuccess,
  fetchRegistrationsSuccess,
  addRegistrationSuccess,
  closeAccessRegistrationSuccess,
  registerSuccess
} = registrationSlice.actions;

export default registrationSlice.reducer;

export const registrationSelector = (state) => state.registration;

export const fetchRegistration = ({ id }) => async (dispatch) => {
  dispatch(asyncStart('fetchRegistration'));

  try {
    const returnResponse = await fetchRegistrationFunc({ id })
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, registration } = data;

          if (success && registration) {
            if(registration.length === 0) {
              dispatch(fetchRegistrationSuccess(null));
              return registration;
            }
            dispatch(fetchRegistrationSuccess(registration[0]));
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
};

export const fetchRegistrations = ({ lectureId, lecturerId }) => async (dispatch) => {
  dispatch(asyncStart('fetchRegistrations'));

  try {
    const returnResponse = await fetchRegistrationsFunc({ lectureId, lecturerId })
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, registration } = data;

          if (success && registration) {
            dispatch(fetchRegistrationsSuccess(registration));
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
    dispatch(asyncFailure('fetchRegistrations'));
  }
};

export const addRegistration = ({
  startDate, endDate, lectureId, lecturerId,
}) => async (dispatch) => {
  dispatch(asyncStart('addRegistration'));

  try {
    const returnResponse = await addRegistrationFunc({
      startDate, endDate, lectureId, lecturerId,
    })
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

export const register = ({ firstname, lastname, stuNo, registrationId}) => async (dispatch) => {
  dispatch(asyncStart('register'));

  try {
    const returnResponse = await registerFunc({ firstname, lastname, stuNo, registrationId})
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, message } = data;

          if (success && message) {
            dispatch(registerSuccess());
            return message;
          }
          throw Error('REGISTER_FAILED');
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
    dispatch(asyncFailure('register'));
  }
}

export const closeAccessRegistration = ({ registrationId}) => async (dispatch) => {
  dispatch(asyncStart('closeAccessRegistration'));

  try {
    const returnResponse = await closeAccessRegistrationFunc({ registrationId})
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, message } = data;

          if (success && message) {
            return message;
          }
          throw Error('CLOSE_ACCESS_FAILED');
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
    dispatch(asyncFailure('closeAccessRegistration'));
  }
}

export const downloadRegistrationList = ({ registrationId}) => async (dispatch) => {
  dispatch(asyncStart('downloadRegistrationList'));

  try {
    const returnResponse = await downloadRegistrationListFunc({ registrationId})
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, message } = data;

          if (success && message) {
            return message;
          }
          throw Error('DOWNLOAD_LIST_FAILED');
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
    dispatch(asyncFailure('downloadRegistrationList'));
  }
}