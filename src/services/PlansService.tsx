import api from "./api";

interface Plan {
    id: number;
    name: string;
    price: string;
    description?: string;
    duration_days: string;
    ad_quantity?: string;
    featured: string;
    auto_renew: string;
    active: string
}

class PlansService {
  async getAll(): Promise<Plan[]> {
    const response = await api.get<Plan[]>("/plans");
    return response.data;
  }

  async getById(id: string): Promise<Plan> {
    const response = await api.get<Plan>(`/plans/${id}`);
    return response.data;
  }

  async create(plan: Omit<Plan, "id">): Promise<Plan> {
    const response = await api.post<Plan>("/plans", plan);
    return response.data;
  }

  async update(id: string, plan: Partial<Plan>): Promise<Plan> {
    const response = await api.put<Plan>(`/plans/${id}`, plan);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/plans/${id}`);
  }
}

export default new PlansService();
