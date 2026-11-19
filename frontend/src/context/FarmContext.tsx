"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Farm } from "@/types";
import { MOCK_FARMS } from "@/mock/data";
import { apiClient } from "@/lib/api/client";
import { useAuth } from "@/context/AuthContext";

interface FarmContextType {
  farms: Farm[];
  selectedFarm: Farm;
  setSelectedFarm: (farm: Farm) => void;
  loadFarms: () => Promise<void>;
  addFarm: (farm: Farm) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export function FarmProvider({ children }: { children: React.ReactNode }) {
  const { accessToken } = useAuth();
  const [farms, setFarms] = useState<Farm[]>(MOCK_FARMS);
  const [selectedFarm, setSelectedFarm] = useState<Farm>(MOCK_FARMS[0]);

  const loadFarms = async () => {
    try {
      const res = await apiClient.getFarms(accessToken || undefined);
      if (res.data && res.data.length > 0) {
        setFarms(res.data);
        // Retain selected farm or fallback to first
        setSelectedFarm((prev) => res.data.find((f) => f.id === prev.id) || res.data[0]);
      }
    } catch {
      // Fallback to initial mock farms
    }
  };

  const addFarm = (newFarm: Farm) => {
    setFarms((prev) => [...prev, newFarm]);
    setSelectedFarm(newFarm);
  };

  useEffect(() => {
    loadFarms();
  }, [accessToken]);

  return (
    <FarmContext.Provider
      value={{
        farms,
        selectedFarm,
        setSelectedFarm,
        loadFarms,
        addFarm,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error("useFarm must be used within a FarmProvider");
  }
  return context;
}
