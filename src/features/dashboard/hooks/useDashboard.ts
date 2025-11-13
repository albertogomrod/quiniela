import { useState, useEffect } from "react";
import { useAuth } from "../../auth";
import type { DashboardStats } from "../types/dashboard.types";

export const useDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activeLeagues: 0,
    totalPredictions: 0,
    totalPoints: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Aquí harías la llamada a tu API
        // const response = await dashboardService.getStats();

        // Por ahora, datos mock
        setStats({
          activeLeagues: user?.ligas?.length || 0,
          totalPredictions: 0,
          totalPoints: 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  return { user, stats, loading };
};
