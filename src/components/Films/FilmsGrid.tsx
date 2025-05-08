import type { FilmsType } from "@/types/FilmsType";
import { FilmCard } from "./FilmCard";

export const FilmesGrid = ({ films,search }: { films: FilmsType[],search?:string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {films?.map((film, index) => (
        <div key={index} className="w-full">
          <FilmCard key={index} film={film} search={search}/>
        </div>
      ))}
    </div>
  );
};
