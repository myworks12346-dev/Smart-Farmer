import {
  DashboardResponse,
  Farm,
  CropRiskAlert,
  MarketPrice,
  CropGrowthStage,
} from "@/types";
import {
  MOCK_DASHBOARD_RESPONSE,
  MOCK_FARMS,
  MOCK_RISK_ALERTS,
  MOCK_MARKET_PRICES,
} from "@/mock/data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

interface RequestOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async fetchWithAuth<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<{ data: T; isMock: boolean }> {
    const { token, headers, ...rest } = options;

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(headers as Record<string, string>),
    };

    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }

    const url = `${this.baseUrl}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(url, {
        ...rest,
        headers: requestHeaders,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { data, isMock: false };
    } catch {
      // Graceful fallback to mock data with explicit isMock flag
      return { data: null as unknown as T, isMock: true };
    }
  }

  async getDashboard(farmId: string, token?: string): Promise<{ data: DashboardResponse; isMock: boolean }> {
    const result = await this.fetchWithAuth<DashboardResponse>(`/api/v1/dashboard/${farmId}`, { token });
    if (result.isMock || !result.data) {
      return { data: MOCK_DASHBOARD_RESPONSE, isMock: true };
    }
    return result;
  }

  async getFarms(token?: string): Promise<{ data: Farm[]; isMock: boolean }> {
    const result = await this.fetchWithAuth<Farm[]>("/api/v1/farms", { token });
    if (result.isMock || !result.data) {
      return { data: MOCK_FARMS, isMock: true };
    }
    return result;
  }

  async createFarm(farm: Omit<Farm, "id">, token?: string): Promise<{ data: Farm; isMock: boolean }> {
    const result = await this.fetchWithAuth<Farm>("/api/v1/farms", {
      method: "POST",
      body: JSON.stringify(farm),
      token,
    });
    if (result.isMock || !result.data) {
      const newFarm: Farm = { ...farm, id: `farm_${Date.now()}` };
      return { data: newFarm, isMock: true };
    }
    return result;
  }

  async updateCropStage(
    cycleId: string,
    stage: CropGrowthStage,
    token?: string
  ): Promise<{ success: boolean; isMock: boolean }> {
    const result = await this.fetchWithAuth<{ success: boolean }>(
      `/api/v1/crop-cycles/${cycleId}/stage`,
      {
        method: "PATCH",
        body: JSON.stringify({ stage }),
        token,
      }
    );
    if (result.isMock) {
      return { success: true, isMock: true };
    }
    return { success: true, isMock: false };
  }

  async getRisks(farmId: string, token?: string): Promise<{ data: CropRiskAlert[]; isMock: boolean }> {
    const result = await this.fetchWithAuth<CropRiskAlert[]>(`/api/v1/risks/${farmId}`, { token });
    if (result.isMock || !result.data) {
      return { data: MOCK_RISK_ALERTS, isMock: true };
    }
    return result;
  }

  async getMarketPrices(
    commodity?: string,
    district?: string,
    token?: string
  ): Promise<{ data: MarketPrice[]; isMock: boolean }> {
    const params = new URLSearchParams();
    if (commodity) params.append("commodity", commodity);
    if (district) params.append("district", district);

    const qs = params.toString() ? `?${params.toString()}` : "";
    const result = await this.fetchWithAuth<MarketPrice[]>(`/api/v1/market/prices${qs}`, { token });
    if (result.isMock || !result.data) {
      return { data: MOCK_MARKET_PRICES, isMock: true };
    }
    return result;
  }

  async getAlerts(token?: string): Promise<{ data: CropRiskAlert[]; isMock: boolean }> {
    const result = await this.fetchWithAuth<CropRiskAlert[]>("/api/v1/alerts", { token });
    if (result.isMock || !result.data) {
      return { data: MOCK_RISK_ALERTS, isMock: true };
    }
    return result;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
