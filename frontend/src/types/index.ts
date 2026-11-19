// Smart Farmer Domain Types

export type Language = "en" | "hi" | "kn" | "te" | "ta" | "mr";

export type CropGrowthStage =
  | "Sowing"
  | "Germination"
  | "Vegetative"
  | "Flowering"
  | "Fruiting / Grain formation"
  | "Maturity"
  | "Harvesting";

export type RiskSeverity = "low" | "moderate" | "high" | "critical";

export interface FarmerProfile {
  id: string;
  full_name: string;
  phone_or_email: string;
  preferred_language: Language;
  created_at: string;
}

export interface Farm {
  id: string;
  farmer_id?: string;
  name: string;
  state: string;
  district: string;
  village?: string;
  latitude: number;
  longitude: number;
  land_area: number;
  area_unit: "Acres" | "Hectares" | "Bigha" | "Guntha";
  is_primary?: boolean;
}

export interface CropCycle {
  id: string;
  farm_id: string;
  crop_name: string;
  variety?: string;
  sowing_date: string;
  current_stage: CropGrowthStage;
  target_harvest_date?: string;
  expected_yield_tons?: number;
}

export interface CurrentWeather {
  temperature_c: number;
  temp_min_c?: number;
  temp_max_c?: number;
  humidity: number;
  rainfall_mm: number;
  wind_speed_kmh?: number;
  condition: string;
  rain_probability?: number;
  source: string;
  updated_at: string;
}

export interface WeatherForecastDay {
  date: string;
  day_name: string;
  temp_max_c: number;
  temp_min_c: number;
  rainfall_probability: number;
  rainfall_expected_mm: number;
  condition: string;
  risk_level: RiskSeverity;
}

export interface HistoricalWeatherPoint {
  date: string;
  rainfall_mm: number;
  temp_avg_c: number;
  humidity_avg: number;
}

export interface CropRiskAlert {
  id: string;
  farm_id?: string;
  crop_name: string;
  crop_stage: CropGrowthStage;
  hazard: string;
  severity: RiskSeverity;
  reason: string;
  advisory: string;
  forecast_period?: string;
  source: string;
  timestamp: string;
  is_read?: boolean;
}

export interface MarketPrice {
  id: string;
  commodity: string;
  state: string;
  district: string;
  mandi_name: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  unit: string;
  reporting_date: string;
  trend?: "up" | "down" | "stable";
  change_percentage?: number;
}

// Unified Dashboard API Response from FastAPI (agreed contract Section 8)
export interface DashboardResponse {
  farm: {
    id: string;
    name: string;
    district: string;
    state?: string;
    land_area?: number;
    area_unit?: string;
  };
  weather: CurrentWeather;
  crop: {
    name: string;
    variety?: string;
    stage: CropGrowthStage;
    sowing_date?: string;
  };
  risks: CropRiskAlert[];
  market_prices: MarketPrice[];
  upcoming_forecast?: WeatherForecastDay[];
}
