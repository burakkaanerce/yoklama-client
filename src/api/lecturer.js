import axios from 'axios';

export const loginProcessFunc = ({ email, password }) => axios.post('https://yoklama-api.herokuapp.com/api/lecturer/login', { email, password })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

  export const whoAmIFunc = ({ token }) => axios.post('https://yoklama-api.herokuapp.com/api/lecturer/whoami', { token })
  .then((result) => {
    console.log('result: ', { result });
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });