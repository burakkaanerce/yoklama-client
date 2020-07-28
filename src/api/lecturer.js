import axios from 'axios';

export const loginProcess = ({ username, password }) => axios.post('http://localhost:4000/api/lecturer/login', { username, password })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    return error;
  });
