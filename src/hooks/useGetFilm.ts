import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import type { FilmsType } from "@/types/FilmsType";

export const useGetFilm = ({filmId}:{filmId:string}) => {
  const getFilmFn = async () => {
    const response = await api.get(`/films/${filmId}`);
    return response.data as FilmsType;
  };

  return useQuery({
    queryKey: ["Film"],
    queryFn: getFilmFn,
  });
};
