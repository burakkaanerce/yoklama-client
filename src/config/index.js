const apiList = {
  development: 'http://localhost:4000',
  production: 'https://yoklama-api.herokuapp.com'
}

const apiURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? apiList.development : apiList.production

export default apiURL;