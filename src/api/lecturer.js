import axios from 'axios';
import apiURL from '../config';

export const loginProcessFunc = ({ email, password }) => axios.post(
  `${apiURL}/api/lecturer/login`,
  { email, password },
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });

export const whoAmIFunc = ({ token }) => axios.post(
  `${apiURL}/api/lecturer/whoami`,
  { token },
)
  .then((result) => {
    return result;
  })
  .catch((error) => {
    console.log('error: ', { error });
    throw Error('INVALID_CREDENTIALS');
  });
