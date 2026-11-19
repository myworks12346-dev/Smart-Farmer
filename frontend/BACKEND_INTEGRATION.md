# Smart Farmer — Frontend / FastAPI Backend Integration Guide

This document defines the exact contract between Member 1 (Frontend Next.js) and Member 2 (Backend FastAPI + Supabase).

---

## 1. Base Configuration

- **Environment Variable**: `NEXT_PUBLIC_API_BASE_URL`
- **Default**: `http://localhost:8000`
- **Authentication**: All protected requests include a Supabase JWT in the `Authorization` header:
  ```http
  Authorization: Bearer <supabase_access_token>
  ```
- **Backend Verification**: FastAPI must verify the token with Supabase JWT public key / secret. Do not trust user IDs provided directly in request bodies.

---

## 2. API Endpoints Contract

### 2.1 Farm Management

#### `GET /api/v1/farms`
Returns all farms belonging to the authenticated user.
```json
[
  {
    "id": "farm_001",
    "name": "Green Valley Fields",
    "state": "Karnataka",
    "district": "Bengaluru Rural",
    "village": "Doddaballapura",
    "latitude": 13.2984,
    "longitude": 77.5358,
    "land_area": 4.5,
    "area_unit": "Acres",
    "is_primary": true
  }
]
```

#### `POST /api/v1/farms`
Creates a new farm parcel.
- **Request Body**:
  ```json
  {
    "name": "Cauvery Riverside Farm",
    "state": "Karnataka",
    "district": "Mandya",
    "village": "Srirangapatna",
    "latitude": 12.4224,
    "longitude": 76.6833,
    "land_area": 6.0,
    "area_unit": "Acres",
    "is_primary": false
  }
  ```
- **Response**: `201 Created` with created farm object (including generated `id`).

---

### 2.2 Dashboard Aggregator

#### `GET /api/v1/dashboard/{farm_id}`
Returns aggregated data for the main farmer dashboard.
```json
{
  "farm": {
    "id": "farm_001",
    "name": "Green Valley Fields",
    "district": "Bengaluru Rural",
    "state": "Karnataka",
    "land_area": 4.5,
    "area_unit": "Acres"
  },
  "weather": {
    "temperature_c": 26,
    "temp_min_c": 19,
    "temp_max_c": 29,
    "humidity": 75,
    "rainfall_mm": 14,
    "wind_speed_kmh": 12,
    "rain_probability": 75,
    "condition": "Thunderstorms / Overcast",
    "source": "IMD (India Meteorological Department)",
    "updated_at": "2026-11-19T10:00:00Z"
  },
  "crop": {
    "name": "Paddy (Rice)",
    "variety": "BPT 5204 (Samba Mahsuri)",
    "stage": "Flowering",
    "sowing_date": "2026-08-25"
  },
  "risks": [
    {
      "id": "alert_01",
      "crop_name": "Paddy (Rice)",
      "crop_stage": "Flowering",
      "hazard": "Heavy Rainfall & Pollen Washout Warning",
      "severity": "high",
      "reason": "Forecast rainfall of 14-22mm coincides with active flowering. Rain wash-out prevents pollination.",
      "advisory": "Ensure drainage channels in paddy basins are clear. Postpone urea top-dressing and chemical sprays.",
      "forecast_period": "Next 24 to 48 Hours",
      "source": "IMD Agromet Advisory Service",
      "timestamp": "2026-11-19T08:30:00Z",
      "is_read": false
    }
  ],
  "market_prices": [
    {
      "id": "mkt_01",
      "commodity": "Paddy (Dhan) - Common",
      "state": "Karnataka",
      "district": "Bengaluru Rural",
      "mandi_name": "Doddaballapura APMC",
      "min_price": 2180,
      "max_price": 2350,
      "modal_price": 2280,
      "unit": "Quintal",
      "reporting_date": "2026-11-18",
      "trend": "up",
      "change_percentage": 2.4
    }
  ]
}
```

---

### 2.3 Crop Lifecycle & Milestones

#### `POST /api/v1/crop-cycles`
Registers a new crop on a farm.
- **Request Body**:
  ```json
  {
    "farm_id": "farm_001",
    "crop_name": "Paddy (Rice)",
    "variety": "BPT 5204",
    "sowing_date": "2026-08-25",
    "current_stage": "Flowering"
  }
  ```

#### `PATCH /api/v1/crop-cycles/{id}/stage`
Updates the crop's current phenological milestone (triggers backend recalculation of weather vulnerabilities).
- **Request Body**:
  ```json
  {
    "stage": "Fruiting / Grain formation"
  }
  ```
- **Allowed Stages**:
  - `Sowing`
  - `Germination`
  - `Vegetative`
  - `Flowering`
  - `Fruiting / Grain formation`
  - `Maturity`
  - `Harvesting`

---

### 2.4 Weather & Risk Intelligence

#### `GET /api/v1/weather/{farm_id}`
Returns current weather observations and upcoming 5-day forecasts.

#### `GET /api/v1/risks/{farm_id}`
Returns active risk alerts and agricultural advisories for the farm's active crop stages.

---

### 2.5 Agricultural Market Prices (Agmarknet)

#### `GET /api/v1/market/prices?commodity={name}&district={district}`
Returns latest daily APMC mandi commodity prices.

---

### 2.6 Alerts & Notifications

#### `GET /api/v1/alerts`
Returns warnings for the authenticated farmer.

#### `PATCH /api/v1/alerts/{id}/read`
Marks an alert as read / acknowledged.
