import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const LOGOUT_URL = 'http://localhost:5000/api/v1/auth/logout';

export const logout = () => {
  const token = localStorage.getItem('jwtToken');
  const decodedToken = jwtDecode(token);
  console.log('Decoded tokenin logout() : ', decodedToken);
  if(decodedToken!==null && decodedToken.exp<Date.now()){
    localStorage.removeItem('jwtToken');
    window.location.href = '/';
  }

  return axios.post(
    LOGOUT_URL,
    {},
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Access-Control-Allow-Origin': 'http://localhost:*'
      }
    }
  )
  .then(response => {
    console.log(response.data.status, ': ', response.data.message);
    if (response.data.status === 'OK') {
      localStorage.removeItem('jwtToken');
      window.location.href = '/';
    } else if(response.data.status === 'BAD_REQUEST'){
      console.log('JWT is either expired or malformed.');
    } else {
      console.log('Logout request failed.');
    }
  })
  .catch(error => {
    console.error('Error during logout:', error);
  });
};