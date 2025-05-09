import { useFilmsStore } from "@/store/useFilmsStore";
import { useGetFilms } from "@/hooks/useGetFilms";
import { FilmCard } from "@/components/Films/FilmCard";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";

export const WatchList = () => {
  const { watchList } = useFilmsStore();
  const { data: films, isLoading } = useGetFilms();

  const watchlistFilms =
    films?.filter((film) => watchList.includes(film.id)) || [];

  return (
    <div className="flex flex-col w-full min-h-full items-center justify-center px-5 py-6 gap-4 max-w-[1324px] mt-[80px]">
      <h1 className="text-2xl font-bold mb-4">Minha Lista</h1>
      {isLoading ? (
        <SkeletonCard />
      ) : watchlistFilms.length === 0 ? (
        <p className="text-gray-500">
          Você ainda não adicionou nenhum filme à sua lista.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {watchlistFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};
