import { Input } from "@/components/ui/input";
import { useGetFilms } from "@/hooks/useGetFilms";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/chekebox";
import { useFilmsStore } from "@/store/useFilmsStore";
import { FilmesGrid } from "@/components/Films/FilmsGrid";
import { FiltersPopover } from "@/components/Filters/FiltersPopover";
import { SortingSelect } from "@/components/Filters/SortingSelect";

export const Home = () => {
  const { data: films, isLoading } = useGetFilms();
  const [search, setSearch] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyWatchlist, setShowOnlyWatchlist] = useState(false);
  const [showOnlyRated, setShowOnlyRated] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minScore, setMinScore] = useState(0);
  const [selectedSort, setSelectedSort] = useState<string>("none");

  const { getFilmRating, isFavorite, isInWatchFilms } = useFilmsStore();

  const resetFilters = () => {
    setShowOnlyFavorites(false);
    setShowOnlyWatchlist(false);
    setShowOnlyRated(false);
    setMinRating(0);
    setMinScore(0);
  };

  const filteredFilms = useMemo(() => {
    if (!films) return [];

    // Filtro de texto (título ou descrição)
    const filtered = films.filter((film) => {
      const textMatch =
        film.title.toLowerCase().includes(search.toLowerCase()) ||
        (isChecked &&
          film.description.toLowerCase().includes(search.toLowerCase()));

      // Filtro de favoritos
      const favoriteMatch = !showOnlyFavorites || isFavorite(film.id);

      // Filtro de watchlist
      const watchlistMatch = !showOnlyWatchlist || isInWatchFilms(film.id);

      // Filtro de avaliação do usuário
      const rating = getFilmRating(film.id) || 0;
      const ratingMatch = !showOnlyRated || rating > 0;
      const minRatingMatch = rating >= minRating;

      const scoreMatch = parseInt(film.rt_score) >= minScore;

      return (
        textMatch &&
        favoriteMatch &&
        watchlistMatch &&
        ratingMatch &&
        minRatingMatch &&
        scoreMatch
      );
    });

    if (selectedSort === "none") {
      return filtered;
    }

    const [sortField, sortDirection] = selectedSort.split("_");
    console.log(sortField, sortDirection);

    return [...filtered].sort((a, b) => {
      let valueA: string | number;
      let valueB: string | number;

      switch (sortField) {
        case "title":
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case "duration":
          valueA = parseInt(a.running_time);
          valueB = parseInt(b.running_time);
          break;
        case "userrating":
          valueA = getFilmRating(a.id) || 0;
          valueB = getFilmRating(b.id) || 0;
          break;
        case "rtscore":
          valueA = parseInt(a.rt_score);
          valueB = parseInt(b.rt_score);
          break;
        default:
          return 0;
      }
      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });
  }, [
    films,
    search,
    isChecked,
    showOnlyFavorites,
    showOnlyWatchlist,
    showOnlyRated,
    minRating,
    minScore,
    selectedSort,
    getFilmRating,
    isFavorite,
    isInWatchFilms,
  ]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-full justify-center py-6 gap-4 max-w-[1324px] mt-[100px]">
      <div className="flex flex-col justify-center gap-2">
        <div className="flex items-center w-full gap-2">
          <div className="flex items-center w-full gap-2">
            <Input
              placeholder="Pesquisar filme"
              className="w-full max-w-[600px]"
              icon={Search}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <FiltersPopover
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
              showOnlyWatchlist={showOnlyWatchlist}
              setShowOnlyWatchlist={setShowOnlyWatchlist}
              showOnlyRated={showOnlyRated}
              setShowOnlyRated={setShowOnlyRated}
              minRating={minRating}
              setMinRating={setMinRating}
              minScore={minScore}
              setMinScore={setMinScore}
              resetFilters={resetFilters}
            />
          </div>
          <div className="flex justify-end items-center w-full">
            <SortingSelect
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 w-full">
          <Checkbox
            id="checkbox"
            checked={isChecked}
            onCheckedChange={() => {
              setIsChecked(!isChecked);
            }}
          />
          <label htmlFor="checkbox">
            <span className="text-sm text-neutral">
              Incluir sinopse na pesquisa
            </span>
          </label>
        </div>
      </div>

      {filteredFilms && (
        <div>
          <FilmesGrid films={filteredFilms} />
        </div>
      )}
    </div>
  );
};
