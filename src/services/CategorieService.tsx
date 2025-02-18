import api from "./api";

interface Category {
    id: number;
    name: string;
    type: string;
    parent_id?: number | null;
    slug: string;
    description?: string;
    is_active: boolean;
}

class CategoryService {
  async getAll(): Promise<Category[]> {
    const response = await api.get<Category[]>("/categories");
    return response.data;
  }

  async getById(id: number): Promise<Category> {
    const response = await api.get<Category>(`/categories/${id}`);
    return response.data;
  }

  async create(category: Omit<Category, "id">): Promise<Category> {
    const response = await api.post<Category>("/categories", category);
    return response.data;
  }

  async update(id: number, category: Partial<Category>): Promise<Category> {
    const response = await api.put<Category>(`/categories/${id}`, category);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}

export default new CategoryService();
