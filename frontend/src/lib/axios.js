import axios from 'axios';

// Create an Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Ensure this matches your server's base URL
  withCredentials: true, // If you need to send cookies
});


// Add request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token or other headers here if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally (e.g., redirect to login on 401)
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;