import axios from "axios";
import type { Vehicular_types } from "../types/vehicular.types";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../util/const";

interface cheuqueoPagi {
  totalClients: number;
}

export function useChequeoVehicular(zona: string, fecha?: string, enabled = true, token?: string) {
  const [data, setData] = useState<Vehicular_types[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [state, setState] = useState<cheuqueoPagi>({
    totalClients: 0,
  });
  const [totalClients, setTotalClients] = useState();

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetchData = async (): Promise<void> => {
      setLoading(true);
      try {
          let url = `${API_URL}/Vehicular/${encodeURIComponent(zona)}?page=${page}&pageSize=${pageSize}`;
        if (fecha) {
          url += `&fecha=${fecha}`;
        }

        const response = await axios.get(url, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });
        setData(response.data.data);
        setMessage(response.data.message);
        setTotalClients(response.data.count);
        setState((prev) => ({
          ...prev,
          totalClients: response.data.count,
        }));
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Error al obtener los datos");
        }
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [enabled, zona, fecha, page, pageSize]);

  const total = Math.ceil(state.totalClients / pageSize);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    data,
    loading,
    error,
    message,
    totalClients,
    handlePageChange,
    total,
    page
  };
}
