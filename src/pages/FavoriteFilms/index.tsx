import { useFilmsStore } from "@/store/useFilmsStore";
import { useGetFilms } from "@/hooks/useGetFilms";
import { FilmCard } from "@/components/Films/FilmCard";
import { SkeletonCard } from "@/components/Skeleton/SkeletonCard";
import { PageLayout } from "@/components/PageLayout/PageLayout";

export const FavorireFilms = () => {
  const { favorites } = useFilmsStore();
  const { data: films, isLoading } = useGetFilms();

  const favoritesFilms =
    films?.filter((film) => favorites.includes(film.id)) || [];

  return (
    <PageLayout className="items-center">
      <h1 className="text-2xl font-bold mb-4">Filmes Favoritos</h1>
      {isLoading ? (
        <SkeletonCard />
      ) : favoritesFilms.length === 0 ? (
        <p className="text-gray-500">
          Você ainda não adicionou nenhum filme à sua lista de favoritos.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {favoritesFilms.map((film) => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};
