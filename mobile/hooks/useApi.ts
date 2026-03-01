// hooks/useApi.ts
import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import api from "@/lib/api";

export const useApi = () => {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;
    const interceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    
    // cleanup to prevent stacking interceptors
    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [getToken]);

  return api;
};