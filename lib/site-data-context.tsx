"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { loadData, saveData, resetData, getDefaultData, type AdminData } from "./admin-store";

type SiteDataContextType = {
  data: AdminData;
  version: number;
  refresh: () => void;
  update: (newData: AdminData) => void;
  reset: () => void;
};

const SiteDataContext = createContext<SiteDataContextType | null>(null);

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AdminData>(getDefaultData);
  const [version, setVersion] = useState(0);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    loadData().then((d) => {
      setData(d);
      setLoaded(true);
    });
  }, []);

  const refresh = useCallback(() => {
    loadData().then((d) => {
      setData(d);
      setVersion((v) => v + 1);
    });
  }, []);

  const update = useCallback((newData: AdminData) => {
    saveData(newData);
    setData(newData);
    setVersion((v) => v + 1);
  }, []);

  const reset = useCallback(() => {
    resetData();
    setData(getDefaultData());
    setVersion((v) => v + 1);
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, version, refresh, update, reset }}>
      {loaded ? children : null}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
