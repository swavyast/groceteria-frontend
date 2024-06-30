import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'http://localhost:5000/api/v1/auth/login';

export const login = async (formData) => {
    try {
        const resp = await axios.post(API_BASE_URL, formData);

        const { message, status, data } = resp.data;
        const accessToken = resp.headers.authorization;
        console.log('accessToken:', accessToken);

        if (status === 'ACCEPTED') {
            localStorage.setItem('jwtToken', accessToken);
            const decodedToken = jwtDecode(accessToken);
            localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
        }

        return { message, status, data }; // Returning mapped ApiResponse fields
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Re-throwing error for downstream error handling
    }
};
