import { ClockPlus } from "lucide-react";
import { useFilmsStore } from "@/store/useFilmsStore";
import { toast } from "sonner";

interface WatchListButtonProps {
  filmId: string;
}

export const WatchListButton = ({ filmId }: WatchListButtonProps) => {
  const { addToWatchList, removeFromWatchList, isInWatchList } = useFilmsStore();
  const isInWatchListMovie = isInWatchList(filmId);

  const handleToggleWatchList = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isInWatchListMovie) {
        removeFromWatchList(filmId);
      } else {
        addToWatchList(filmId);
      }
      toast.success("Sucesso!", {
        description: isInWatchListMovie
          ? "Filme removido da lista de filmes para assistir."
          : "Filme adicionado à lista de filmes para assistir.",
      });
    } catch (error) {
      console.error("Erro ao adicionar/remover filme da lista para assistir:", error);
    }
  };

  return (
    <button
      onClick={handleToggleWatchList}
      className={`p-2 rounded-full cursor-pointer ${isInWatchListMovie ? "bg-blue-100 text-blue-500" : "bg-gray-100"}`}
    >
      <ClockPlus
        size={18}
        color={isInWatchListMovie ? "currentColor" : "black"}
        fill="none"
      />
    </button>
  );
};