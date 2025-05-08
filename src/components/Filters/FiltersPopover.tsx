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
  showOnlyNotesList: boolean;
  setShowOnlyNotesList: (value: boolean) => void;
}
// Esse componente é um popover que permite filtrar os filmes por favoritos, assistidos e com notas.
// Ele recebe como props as funções que atualizam o estado do filtro e o estado atual do filtro.
export const FiltersPopover = ({
  showOnlyFavorites,
  setShowOnlyFavorites,
  showOnlyWatchlist,
  setShowOnlyWatchlist,
  showOnlyNotesList,
  setShowOnlyNotesList,
}: FiltersPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer px-2">
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
              Favoritos
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
              Assistidos
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="rated"
              checked={showOnlyNotesList}
              onCheckedChange={() => setShowOnlyNotesList(!showOnlyNotesList)}
            />
            <label htmlFor="rated" className="text-sm flex items-center gap-2">
              <NotepadText size={16} color="black" />
              Com notas
            </label>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
