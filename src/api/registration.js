import axios from 'axios';

export const fetchRegistrationFunc = ({ id }) => axios.post(
    'http://localhost:4000/api/registration/find',
    { id }
  )
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const fetchRegistrationsFunc = ({ lectureId, lecturerId }) => axios.post('http://localhost:4000/api/registration/list', { lectureId, lecturerId })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const addRegistrationFunc = ({ startDate, endDate, lectureId, lecturerId }) => axios.post('http://localhost:4000/api/registration/add', { startDate, endDate, lectureId, lecturerId })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });
  
export const registerFunc = ({ firstname, lastname, stuNo, registrationId}) => axios.post('http://localhost:4000/api/registration/register', { firstname, lastname, stuNo, registrationId})
.then((result) => {
  console.log('result: ', { result });
  return result;
})
.catch((error) => {
  console.log('error: ', { error });
  throw Error('INVALID_CREDENTIALS');
});

export const closeAccessRegistrationFunc = ({ registrationId }) => axios.post('http://localhost:4000/api/registration/close', { registrationId })
.then((result) => {
  console.log('result: ', { result });
  return result;
})
.catch((error) => {
  console.log('error: ', { error });
  throw Error('INVALID_CREDENTIALS');
});

export const downloadRegistrationListFunc = ({ registrationId }) => axios.post('http://localhost:4000/api/registration/download', { registrationId })
.then((result) => {
  console.log('result: ', { result });
  return result;
})
.catch((error) => {
  console.log('error: ', { error });
  throw Error('INVALID_CREDENTIALS');
});