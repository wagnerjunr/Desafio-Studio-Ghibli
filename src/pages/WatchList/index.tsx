import { useFilmsStore } from "@/store/useFilmsStore";
import { useGetFilms } from "@/hooks/useGetFilms";
import { FilmCard } from "@/components/Films/FilmCard";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { PageLayout } from "@/components/PageLayout/PageLayout";

export const WatchList = () => {
  const { watchList } = useFilmsStore();
  const { data: films, isLoading } = useGetFilms();

  const watchlistFilms =
    films?.filter((film) => watchList.includes(film.id)) || [];

  return (
    <PageLayout className="items-center">
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
    </PageLayout>
  );
};
