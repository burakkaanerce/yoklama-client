import axios from 'axios';

export const fetchRegistrationFunc = ({ lectureId, lecturerId }) => axios.post('http://localhost:4000/api/registration/list', { lectureId, lecturerId })
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
