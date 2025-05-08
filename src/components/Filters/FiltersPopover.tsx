import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/chekebox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Eye, Filter, Heart, NotepadText } from "lucide-react";

interface FiltersPopoverProps {
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (value: boolean) => void;
  showOnlyWatchlist: boolean;
  setShowOnlyWatchlist: (value: boolean) => void;
  showOnlyRated: boolean;
  setShowOnlyRated: (value: boolean) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  minScore: number;
  setMinScore: (value: number) => void;
  resetFilters: () => void;
}

export const FiltersPopover = ({
  showOnlyFavorites,
  setShowOnlyFavorites,
  showOnlyWatchlist,
  setShowOnlyWatchlist,
  showOnlyRated,
  setShowOnlyRated,
  resetFilters,
}: FiltersPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Filter size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4 py-2">
          <h3 className="font-medium">Filtrar Filmes</h3>

          <div className="flex items-center gap-2">
            <Checkbox
              id="favorites"
              checked={showOnlyFavorites}
              onCheckedChange={() => setShowOnlyFavorites(!showOnlyFavorites)}
            />
            <label
              htmlFor="favorites"
              className="text-sm flex items-center gap-2"
            >
              <Heart size={18} fill="red" />
              Favorites
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="watchlist"
              checked={showOnlyWatchlist}
              onCheckedChange={() => setShowOnlyWatchlist(!showOnlyWatchlist)}
            />
            <label
              htmlFor="watchlist"
              className="text-sm flex items-center gap-2"
            >
              <Eye size={18} color="black" />
              Watched
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="rated"
              checked={showOnlyRated}
              onCheckedChange={() => setShowOnlyRated(!showOnlyRated)}
            />
            <label htmlFor="rated" className="text-sm flex items-center gap-2">
              <NotepadText size={16} color="black" />
              With Notes
            </label>
          </div>

          <Button variant="outline" onClick={resetFilters}>
            Limpar Filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
