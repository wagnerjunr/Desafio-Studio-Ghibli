import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { FilmsType } from "@/types/FilmsType";

export const useGetFilms = () => {
  const getFilmsFn = async () => {
    const response = await api.get(`/films`);
    return response.data as FilmsType[];
  };

  return useQuery({
    queryKey: ["Films"],
    queryFn: getFilmsFn,
  });
};
