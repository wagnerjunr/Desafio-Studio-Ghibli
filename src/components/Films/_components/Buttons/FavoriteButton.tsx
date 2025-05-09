import { Heart } from "lucide-react";
import { useFilmsStore } from "@/store/useFilmsStore";
import { toast } from "sonner";

interface FavoriteButtonProps {
  filmId: string;
}

export const FavoriteButton = ({ filmId }: FavoriteButtonProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFilmsStore();
  const isFilmFavorite = isFavorite(filmId);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isFilmFavorite) {
        removeFromFavorites(filmId);
      } else {
        addToFavorites(filmId);
      }
      toast.success("Sucesso!", {
        description: isFilmFavorite
          ? "Filme removido dos favoritos."
          : "Filme adicionado aos favoritos.",
      });
    } catch (error) {
      console.error("Erro ao adicionar/remover filme aos favoritos:", error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`p-2 rounded-full cursor-pointer ${isFilmFavorite ? "bg-red-100 text-red-500" : "bg-gray-100"}`}
    >
      <Heart
        size={18}
        fill={isFilmFavorite ? "currentColor" : "none"}
      />
    </button>
  );
};