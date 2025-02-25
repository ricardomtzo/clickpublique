import api from "./api";

interface User {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  password: string;
  type_user: string;
  gender: string;
  address?: any;
  active: boolean;
  created_at?: string;
  date_birth?: string;
}

class UserService {
  async getAll(): Promise<User[]> {
    const response = await api.get<User[]>("/user");
    return response.data;
  }

  async getById(id: string): Promise<User> {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  }

  async create(user: Omit<User, "id">): Promise<User> {
    const response = await api.post<User>("/users", user);
    return response.data;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const response = await api.put<User>(`/users/${id}`, user);
    return response.data;
  }

  async updateAddress(id: string, address: any): Promise<User> {
    const response = await api.put<User>(`/address/${id}`, address);
    return response.data;
  }

  async createAddress(address: any): Promise<User> {
    const response = await api.post<User>(`/address`, address);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}

export default new UserService();
