import axios from 'axios';
import apiURL from '../config';

export const fetchRegistrationFunc = ({ id }) => axios.post(
  `${apiURL}/api/registration/findone`,
  { id },
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const fetchRegistrationsFunc = ({ token, lectureId, lecturerId }) => axios.post(
  `${apiURL}/api/registration/list`,
  { lectureId, lecturerId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const addRegistrationFunc = ({
  token, startDate, endDate, lectureId, lecturerId,
}) => axios.post(
  `${apiURL}/api/registration/add`,
  {
    startDate, endDate, lectureId, lecturerId,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const registerFunc = ({
  firstname, lastname, stuNo, registrationId,
}) => axios.post(
  `${apiURL}/api/registration/register`,
  {
    firstname, lastname, stuNo, registrationId,
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const closeAccessRegistrationFunc = ({ token, registrationId }) => axios.post(
  `${apiURL}/api/registration/close`,
  { registrationId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const downloadRegistrationListFunc = ({ token, registrationId }) => axios.post(
  `${apiURL}/api/registration/download`,
  { registrationId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const deleteRegistrationFunc = ({ token, registrationId }) => axios.post(
  `${apiURL}/api/registration/delete`,
  { registrationId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });