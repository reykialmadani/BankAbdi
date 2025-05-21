import axios from 'axios';

// Buat instance axios dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Interceptor untuk request
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage jika ada (untuk autentikasi)
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk response
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle berbagai error umum
    if (error.response) {
      // Respons server dengan kode status di luar 2xx
      switch (error.response.status) {
        case 401:
          // Unauthorized - bisa redirect ke login
          console.error('Unauthorized access');
          // Redirect ke login jika diperlukan
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error');
          break;
        default:
          console.error(`Error with status: ${error.response.status}`);
      }
    } else if (error.request) {
      // Request dibuat tapi tidak ada response
      console.error('No response received from server');
    } else {
      // Error saat setup request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper functions untuk API endpoints
const api = {
  // Content related endpoints
  content: {
    getById: (id: string | number) => axiosInstance.get(`/api/content/${id}`),
    getBySubMenu: (subMenuId: string | number) => axiosInstance.get(`/api/content/submenu/${subMenuId}`),
  },
  // Bisa ditambahkan endpoint-endpoint lain sesuai kebutuhan
};

// Util untuk transformasi URL
export const transformDocumentUrl = (url: string): string => {
  if (url && url.startsWith('/uploads/')) {
    // Mengubah path dari /uploads/ menjadi /storage/
    const filename = url.replace('/uploads/', '');
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/storage/${filename}`;
  }
  return url;
};

export { axiosInstance, api };
export default axiosInstance;