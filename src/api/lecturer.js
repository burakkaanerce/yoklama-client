import axios from 'axios';

export const loginProcessFunc = ({ email, password }) => axios.post('http://localhost:4000/api/lecturer/login', { email, password })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });
