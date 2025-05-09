import { Eye } from "lucide-react";
import { useFilmsStore } from "@/store/useFilmsStore";
import { toast } from "sonner";

interface WatchedButtonProps {
  filmId: string;
}

export const WatchedButton = ({ filmId }: WatchedButtonProps) => {
  const { addToWatchFilms, removeFromWatchFilms, isInWatchFilms } = useFilmsStore();
  const inFilmeInWatchFilms = isInWatchFilms(filmId);

  const handleToggleWatchFilms = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (inFilmeInWatchFilms) {
        removeFromWatchFilms(filmId);
      } else {
        addToWatchFilms(filmId);
      }
      toast.success("Sucesso!", {
        description: inFilmeInWatchFilms
          ? "Filme removido da lista de filmes assistidos."
          : "Filme adicionado à lista de filmes assistidos.",
      });
    } catch (error) {
      console.error("Erro ao adicionar/remover filme aos assistidos:", error);
    }
  };

  return (
    <button
      onClick={handleToggleWatchFilms}
      className={`p-2 rounded-full cursor-pointer ${inFilmeInWatchFilms ? "bg-green-100 text-green-500" : "bg-gray-100"}`}
    >
      <Eye
        size={18}
        color={inFilmeInWatchFilms ? "currentColor" : "black"}
        fill="none"
      />
    </button>
  );
};