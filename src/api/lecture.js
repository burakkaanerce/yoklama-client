import axios from 'axios';
import apiURL from '../config';

export const findLectureFunc = ({ name, code, lecturerId }) => axios.post(
  `${apiURL}/api/lecture/list`,
  { name, code, lecturerId }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const addLectureFunc = ({ name, code, lecturerId }) => axios.post(
  `${apiURL}/api/lecture/add`,
  { name, code, lecturerId }
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });
