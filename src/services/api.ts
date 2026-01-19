import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_UR,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@EventManager:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface AdminData {
  nome?: string;
  email: string;
  senha: string;
  confirmarSenha?: string;
  gravarSenha?: boolean;
}

export interface EventData {
  id?: number;
  nome: string;
  data: string;
  localizacao: string;
  imagem: string;
}

export const authService = {
  login: async (credentials: AdminData) => {
    const response = await api.post<{ token: string }>('/auth/login', credentials);

    if (credentials.gravarSenha) {
      localStorage.setItem('@EventManager:savedEmail', credentials.email);
    } else {
      localStorage.removeItem('@EventManager:savedEmail');
    }

    return response.data;
  },

  register: async (adminData: AdminData) => {
    const response = await api.post('/auth/register', adminData);
    return response.data;
  }
};

export const eventService = {
  listAll: async () => {
    const response = await api.get<EventData[]>('/eventos');
    return response.data;
  },

  create: async (event: EventData) => {
    const response = await api.post<EventData>('/eventos', event);
    return response.data;
  },

  update: async (id: number, event: EventData) => {
    const response = await api.put<EventData>(`/eventos/${id}`, event);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/eventos/${id}`);
  }
};

export default api;