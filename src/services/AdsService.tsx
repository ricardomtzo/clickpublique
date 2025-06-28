import api from "./api";

interface Ad {
    id: number;
    user_id: string;
    description: string;
    price?: string;
    accepts_trade: string;
    status?: string;
    hide_phone: boolean;
    title: string;
    adType: any
}

class AdsService {
  async getAll(params?: any): Promise<Ad[]> {
    const response = await api.get<Ad[]>("/ads", { params });
    return response.data;
  }

  async getByUserId(id: string): Promise<Ad> {
    const response = await api.get<Ad>(`/ads/user/${id}`);
    return response.data;
  }

  async getById(id: string): Promise<Ad> {
    const response = await api.get<Ad>(`/ads/${id}`);
    return response.data;
  }

  async create(ad: Omit<Ad, "id">): Promise<Ad> {
    const response = await api.post<Ad>("/ads", ad);
    return response.data;
  }

  async update(id: string, ad: Partial<Ad>): Promise<Ad> {
    const response = await api.put<Ad>(`/ads/${id}`, ad);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/ads/${id}`);
  }
}

export default new AdsService();
