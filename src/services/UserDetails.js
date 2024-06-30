import axios from 'axios';

const ENDPOINT_URL = 'http://localhost:5000/api/v1/users/get-user-details';

const fetchUserDetails = async (token, email) => {
  try {
      const response = await axios.get(
          `${ENDPOINT_URL}/${email}`,
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              },
              mode:'cors',
              withCredentials: true
          }
      );
      console.log('User details:', response.data);
      return response.data;
  } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
  }
};

export default fetchUserDetails;