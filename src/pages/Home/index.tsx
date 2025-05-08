import { Input } from "@/components/ui/input";
import { useGetFilms } from "@/hooks/useGetFilms";
import { Search } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/chekebox";
import { useFilmsStore } from "@/store/useFilmsStore";
import { FilmesGrid } from "@/components/Films/FilmsGrid";
import { FiltersPopover } from "@/components/Filters/FiltersPopover";

export const Home = () => {
  const { data: films, isLoading } = useGetFilms();
  const [search, setSearch] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyWatchlist, setShowOnlyWatchlist] = useState(false);
  const [showOnlyRated, setShowOnlyRated] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [minScore, setMinScore] = useState(0);

  const { getFilmRating, isFavorite, isInWatchFilms } = useFilmsStore();

  // Função para resetar todos os filtros
  const resetFilters = () => {
    setShowOnlyFavorites(false);
    setShowOnlyWatchlist(false);
    setShowOnlyRated(false);
    setMinRating(0);
    setMinScore(0);
  };

  // Filtragem de filmes com todos os critérios
  const filteredFilms = films?.filter((film) => {
    // Filtro de texto (título ou descrição)
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

    // Filtro de pontuação do filme
    const scoreMatch = parseInt(film.rt_score) >= minScore;

    // Retorna true apenas se todos os filtros forem atendidos
    return (
      textMatch &&
      favoriteMatch &&
      watchlistMatch &&
      ratingMatch &&
      minRatingMatch &&
      scoreMatch
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-full justify-center py-6 gap-4 max-w-[1324px] mt-[100px]">
      <div className="flex items-center w-full max-w-[600px] gap-4">
        <Input
          placeholder="Search for a movie"
          className="w-full"
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

      <div className="flex items-center gap-2">
        <Checkbox
          id="checkbox"
          checked={isChecked}
          onCheckedChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <label htmlFor="checkbox">
          <span className="text-sm text-neutral">
            Include synopsis in search
          </span>
        </label>
      </div>

      {filteredFilms && (
        <div>
          <FilmesGrid films={filteredFilms} />
        </div>
      )}
    </div>
  );
};
