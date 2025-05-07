import { Input } from "@/components/ui/input";
import { useGetFilms } from "@/hooks/useGetFilms";
import { useEffect } from "react";
import { Search } from "lucide-react";
import { FilmesGrid } from "@/components/Films/FilmsGrid";

export const Home = () => {
  const { data: films, isLoading } = useGetFilms();

  useEffect(() => {
    console.log(films);
  }, [films]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col w-full min-h-full items-center justify-center px-5 py-6 gap-4 max-w-[1324px] mt-[80px]">
      <Input
        placeholder="Pesquisar filme"
        className="w-full max-w-[600px]"
        icon={Search}
      />
      {films && (
        <div>
          <FilmesGrid films={films} />
        </div>
      )}
    </div>
  );
};
