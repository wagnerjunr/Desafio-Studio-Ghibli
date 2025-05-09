import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface CleanFilterButtonProps {
  showOnlyFavorites: boolean;
  showOnlyWatchlist: boolean;
  showOnlyNotesList: boolean;
  minRating: number;
  setShowOnlyFavorites: (value: boolean) => void;
  setShowOnlyWatchlist: (value: boolean) => void;
  setShowOnlyNotesList: (value: boolean) => void;
  setMinRating: (value: number) => void;
  resetFilters: () => void;
}

export const ClearFilterButton = ({
  showOnlyFavorites,
  setShowOnlyFavorites,
  showOnlyWatchlist,
  setShowOnlyWatchlist,
  showOnlyNotesList,
  setShowOnlyNotesList,
  minRating,
  setMinRating,
  resetFilters,
}: CleanFilterButtonProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" onClick={resetFilters} className="w-fit">
        Limpar Filtros
      </Button>

      <div className="flex flex-wrap gap-2">
        {showOnlyFavorites && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Favoritos
            <X
              size={14}
              className="cursor-pointer ml-1"
              onClick={() => setShowOnlyFavorites(false)}
            />
          </Badge>
        )}

        {showOnlyWatchlist && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Assistidos
            <X
              size={14}
              className="cursor-pointer ml-1"
              onClick={() => setShowOnlyWatchlist(false)}
            />
          </Badge>
        )}

        {showOnlyNotesList && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Com anotações
            <X
              size={14}
              className="cursor-pointer ml-1"
              onClick={() => setShowOnlyNotesList(false)}
            />
          </Badge>
        )}

        {minRating !== 0 && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {minRating === -1
              ? "Sem avaliação"
              : minRating === 6
                ? "Com avaliação"
                : `${minRating} estrelas`}
            <X
              size={14}
              className="cursor-pointer ml-1"
              onClick={() => setMinRating(0)}
            />
          </Badge>
        )}
      </div>
    </div>
  );
};
