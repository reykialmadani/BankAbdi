import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor untuk menyisipkan token dari localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk menangani response error
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access');
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`Error with status: ${error.response.status}`);
      }
    } else if (error.request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Tipe data Content
export interface Content {
  id: number;
  sub_menu_id: number;
  title: string;
  description: string | null;
  required_documents: string | null;
  thumbnail: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  updated_by: number | null;
  report_type: string | null;
  report_year: string | null;
  sub_menu?: {
    sub_menu_name: string;
    id: number;
    menu_id: number;
    name: string;
    url: string;
    menu?: {
      id: number;
      name: string;
      url: string;
    };
  };
}

// Helper untuk transform URL file dokumen
export const transformDocumentUrl = (url: string): string => {
  if (url && url.startsWith('/uploads/')) {
    const filename = url.replace('/uploads/', '');
    return `${API_URL}/storage/${filename}`;
  }
  return url;
};

// API service functions
export const api = {
  content: {
    getAll: async (): Promise<Content[]> => {
      const response = await axiosInstance.get('/api/content');
      return response.data.data;
    },
    getById: async (id: number): Promise<Content> => {
      const response = await axiosInstance.get(`/api/content/${id}`);
      return response.data.data;
    },
    getBySubMenuUrl: async (url: string): Promise<Content[]> => {
      const allContents = await api.content.getAll();
      return allContents.filter(
        (content) =>
          content.sub_menu && content.sub_menu.url === url && content.status
      );
    },
    create: async (
      contentData: Omit<Content, 'id' | 'created_at' | 'updated_at'>
    ): Promise<Content> => {
      const response = await axiosInstance.post('/api/content', contentData);
      return response.data.data;
    },
    update: async (
      id: number,
      contentData: Partial<Content>
    ): Promise<Content> => {
      const response = await axiosInstance.put(
        `/api/content/${id}`,
        contentData
      );
      return response.data.data;
    },
    delete: async (id: number): Promise<void> => {
      await axiosInstance.delete(`/api/content/${id}`);
    },
  },
};

export { axiosInstance };
export default axiosInstance;
export const getAllContents = api.content.getAll;
export const getContentBySubMenuUrl = api.content.getBySubMenuUrl;