import * as React from 'react'
import PrimarySearchAppBar from '../components/AppBar'

import ResponsiveStack from '../components/FooterStack'
import { jwtDecode } from 'jwt-decode';
import { useTokenContext, useUserContext } from '../AppContext';
import fetchUserDetails from '../services/UserDetails';


const UserHome = () => {

    const { token } = useTokenContext();
    const { userDetails, setUserDetails } = useUserContext();
    const [error, setError] = React.useState(null);


    React.useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                console.log('Decoded token:', decodedToken);
                const email = decodedToken.sub;

                try {
                    const response = await fetchUserDetails(token, email); // Pass token as parameter
                    console.log('Response from fetchUserDetails:', response);

                    if (response && response.status === 'OK') {
                        setUserDetails(response.data);
                    } else if (response && response.status === 'CONFLICT') {
                        console.log('User not found');
                    } else if (response && response.status === 'BAD_REQUEST') {
                        console.log('Username/email is null');
                    } else {
                        console.log('Unhandled response');
                    }
                } catch (error) {
                    setError(error);
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchData();
    }, [token, setUserDetails]);
    React.useEffect(() => {
        console.log('userDetails inside useEffect of UserHome : ', userDetails);
    })
    return (
        <>
            <PrimarySearchAppBar />

            <ResponsiveStack />
        </>
    )
}

export default UserHome