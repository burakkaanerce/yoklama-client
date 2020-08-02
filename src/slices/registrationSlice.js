import {
  createSlice,
} from '@reduxjs/toolkit';
import { addRegistrationFunc, fetchRegistrationFunc, fetchRegistrationsFunc, registerFunc, closeAccessRegistrationFunc, downloadRegistrationListFunc, deleteRegistrationFunc } from '../api/registration';

const initialState = {
  loading: {
    addRegistration: false,
    fetchRegistration: false,
    fetchRegistrations: false,
    register: false,
    closeAccessRegistration: false,
    downloadRegistrationList: false,
    deleteRegistration: false,
  },
  hasErrors: {
    addRegistration: false,
    fetchRegistration: false,
    fetchRegistrations: false,
    register: false,
    closeAccessRegistration: false,
    downloadRegistrationList: false,
    deleteRegistration: false,
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
      if(payload === 'fetchRegistrations') {
        state.registrations = []
      }
    },
    asyncFailure: (state, {
      payload,
    }) => {
      state.loading[payload] = false;
      state.hasErrors[payload] = true;
      if(payload === 'fetchRegistrations') {
        state.registrations = []
      }
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
      state.loading.fetchRegistrations = false;
      state.hasErrors.fetchRegistrations = false;
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

export const fetchRegistrations = ({ lectureId, lecturerId }) => async (dispatch, state) => {
  dispatch(asyncStart('fetchRegistrations'));

  try {
    const token = state().auth.auth.token;
    const returnResponse = await fetchRegistrationsFunc({ token, lectureId, lecturerId })
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
}) => async (dispatch, state) => {
  dispatch(asyncStart('addRegistration'));

  try {
    const token = state().auth.auth.token;
    const returnResponse = await addRegistrationFunc({
      token, startDate, endDate, lectureId, lecturerId,
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

export const closeAccessRegistration = ({ registrationId}) => async (dispatch, state) => {
  dispatch(asyncStart('closeAccessRegistration'));

  try {
    const token = state().auth.auth.token;
    const returnResponse = await closeAccessRegistrationFunc({ token, registrationId})
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

export const downloadRegistrationList = ({ registrationId}) => async (dispatch, state) => {
  dispatch(asyncStart('downloadRegistrationList'));

  try {
    const token = state().auth.auth.token;
    const returnResponse = await downloadRegistrationListFunc({ token, registrationId})
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, message, filename } = data;

          if (success && message && filename) {
            return filename;
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

export const deleteRegistration = ({ registrationId}) => async (dispatch, state) => {
  dispatch(asyncStart('deleteRegistration'));

  try {
    const token = state().auth.auth.token;
    const returnResponse = await deleteRegistrationFunc({ token, registrationId})
      .then((result) => {
        console.log('result: ', result);
        const { data } = result;
        console.log('data: ', data);
        if (data) {
          const { success, message } = data;

          if (success && message) {
            return message;
          }
          throw Error('DELETE_REGS_FAILED');
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
    dispatch(asyncFailure('deleteRegistration'));
  }
}