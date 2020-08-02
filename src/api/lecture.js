import axios from 'axios';

export const findLectureFunc = ({ name, code }) => axios.post('https://yoklama-api.herokuapp.com/api/lecture/list', { name, code })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const addLectureFunc = ({ name, code, lecturerId }) => axios.post('https://yoklama-api.herokuapp.com/api/lecture/add', { name, code, lecturerId })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });
