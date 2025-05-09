import { Input } from "@/components/ui/input";
import { useGetFilms } from "@/hooks/useGetFilms";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/chekebox";
import { useFilmsStore } from "@/store/useFilmsStore";
import { FiltersPopover } from "@/components/Filters/FiltersPopover";
import { SortingSelect } from "@/components/Filters/SortingSelect";
import { RatingFilter } from "@/components/Filters/RatingFilter";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { FilmsGrid } from "@/components/Films/FilmsGrid";
import { ClearFilterButton } from "@/components/Filters/ClearFilterButton";
import { PageLayout } from "@/components/PageLayout/PageLayout";

export const Home = () => {
  const { data: films, isLoading } = useGetFilms();
  const [search, setSearch] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Estados para os filtros para favoritos, assistidos e notas.Caso estejam como true o filtro se comportará para filtrar os filmes que correspondem aos filtros selecionados.
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [showOnlyWatchlist, setShowOnlyWatchlist] = useState(false);
  const [showOnlyNotesList, setShowOnlyNotesList] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const [selectedSort, setSelectedSort] = useState<string>("none");

  const { getFilmRating, isFavorite, isInWatchFilms, getNoteFilm } =
    useFilmsStore();

  // Função para resetar os filtros
  const resetFilters = () => {
    setShowOnlyFavorites(false);
    setShowOnlyWatchlist(false);
    setShowOnlyNotesList(false);
    setMinRating(0);
  };

  // Verificar se há algum filtro ativo
  const hasActiveFilters =
    showOnlyFavorites ||
    showOnlyWatchlist ||
    showOnlyNotesList ||
    minRating !== 0;

  // Filtragem dos filmes com base nos filtros e ordenação selecionados
  // useMemo é usado para memorizar o valor do filteredFilms e evitar que ele seja recalculado a cada renderização.
  const filteredFilms = useMemo(() => {
    if (!films) return [];

    const filtered = films.filter((film) => {
      // Verifica se o título ou a descrição do filme contém a string de pesquisa.
      const textMatch =
        film.title.toLowerCase().includes(search.toLowerCase()) ||
        (isChecked &&
          film.description.toLowerCase().includes(search.toLowerCase()));

      //Caso os estados dos filtros estiverem como falso, será colocado true e os filmes serão retornados.
      //Caso os estados dos filtros estiverem como true, será testado o filme com base na função para verificar se o Filme está nos favoritos, assistidos ou tem nota.

      // Filtro de favoritos
      const favoriteMatch = !showOnlyFavorites || isFavorite(film.id);
      // Filtro de notas
      const noteMatch = !showOnlyNotesList || getNoteFilm(film.id);
      // Filtro de watchlist
      const watchlistMatch = !showOnlyWatchlist || isInWatchFilms(film.id);
      // Filtro de avaliação
      const ratingMatch =
        minRating === 0
          ? true
          : minRating === 6
            ? getFilmRating(film.id) !== null && getFilmRating(film.id)! > 0
            : minRating === -1
              ? getFilmRating(film.id) === null
              : getFilmRating(film.id) === minRating;

      console.log(favoriteMatch, noteMatch, watchlistMatch, ratingMatch);
      return (
        textMatch && favoriteMatch && watchlistMatch && noteMatch && ratingMatch
      );
    });

    console.log(filtered);
    if (selectedSort === "none") {
      return filtered;
    }
    // Ordenação dos filmes. SortFild pega o valor do select e o split separa o valor em duas partes, a primeira parte é o campo que será ordenado e a segunda parte é a direção da ordenação.
    // Com base na escolha do usuário no componente SortingSelect, o valor do selectedSort é atualizado e assim feito o sorting.
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
    showOnlyNotesList,
    minRating,
    selectedSort,
    getFilmRating,
    getNoteFilm,
    isFavorite,
    isInWatchFilms,
  ]);

  return (
    <PageLayout>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex md:items-center md:flex-row flex-col gap-4 w-full max-w-[800px]">
          <Input
            placeholder="Pesquisar filme"
            className="max-w-[600px] flex-grow"
            icon={Search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <div className="flex items-center gap-4">
            <FiltersPopover
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
              showOnlyWatchlist={showOnlyWatchlist}
              setShowOnlyWatchlist={setShowOnlyWatchlist}
              showOnlyNotesList={showOnlyNotesList}
              setShowOnlyNotesList={setShowOnlyNotesList}
            />
            <RatingFilter minRating={minRating} setMinRating={setMinRating} />
          </div>
        </div>

        <div className="flex items-center justify-between">
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
                Incluir sinopse na pesquisa
              </span>
            </label>
          </div>
          <SortingSelect
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
          />
        </div>
        {/* Caso haja algum filtro ativo, esse componente será renderizado e o usuário poderá limpar os filtros e ver filtro ativos. */}
        {hasActiveFilters && (
          <ClearFilterButton
            resetFilters={resetFilters}
            showOnlyFavorites={showOnlyFavorites}
            showOnlyWatchlist={showOnlyWatchlist}
            showOnlyNotesList={showOnlyNotesList}
            minRating={minRating}
            setMinRating={setMinRating}
            setShowOnlyFavorites={setShowOnlyFavorites}
            setShowOnlyWatchlist={setShowOnlyWatchlist}
            setShowOnlyNotesList={setShowOnlyNotesList}
          />
        )}
      </div>

      {isLoading ? (
        <SkeletonCard />
      ) : (
        filteredFilms && (
          <div>
            <FilmsGrid
              films={filteredFilms}
              search={isChecked ? search : undefined}
            />
          </div>
        )
      )}
    </PageLayout>
  );
};
