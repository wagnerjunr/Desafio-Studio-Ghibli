import type { FilmsType } from "@/types/FilmsType";
import { FilmCard } from "./FilmCard";
import { useState } from "react";
import { PaginationComponent } from "../Pagination/PaginationComponent";

export const FilmsGrid = ({
  films,
  search,
}: {
  films: FilmsType[];
  search?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filmsPagination = films?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {filmsPagination?.map((film, index) => (
          <div key={index} className="w-full">
            <FilmCard key={index} film={film} search={search} />
          </div>
        ))}
      </div>
      {/* Paginação para os filmes (Esse componente so aparece caso exista mais de 8 filmes, havendo mais de 1 página)  */}
      <PaginationComponent
        items={films}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
