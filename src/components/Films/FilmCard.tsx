import { formatTime } from "@/lib/utils";
import type { FilmsType } from "@/types/FilmsType";
import { useFilmsStore } from "@/store/useFilmsStore";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { ModalNotes } from "./_components/ModalNotes";
import { ModalUpdateNotes } from "./_components/ModalUpdateNote";
import { useState } from "react";
import { FilmActionButtons } from "./_components/Buttons/FilmActionButtons";
import { FilmRatingDisplay } from "./_components/Buttons/FilmRatingDisplay";

interface FilmProps {
  film: FilmsType;
  search?: string;
}

export const FilmCard = ({ film, search }: FilmProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const { getNoteFilm } = useFilmsStore();
  const thumbnailCover = film.image;

  // Pega os dados do filme com base na função
  const filmId = film.id;
  const noteFilm = getNoteFilm(filmId);

  // Função para alternar a visualização completa da sinopse.
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Função para destacar o termo de pesquisa no texto da sinopse.
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === "") {
      return <>{text}</>;
    }
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <span key={index} className="bg-blue-200 rounded px-1">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full h-fit rounded-lg  opacity-90 hover:opacity-100  border border-border p-4">
        <a href={`/film/${film.id}`}>
          <img
            className="rounded-lg h-[350px] w-full object-cover cursor-pointer transition-all  active:scale-95"
            src={thumbnailCover}
            alt="event cover image"
          />
        </a>

        <div className="flex flex-col gap-1 py-2 rounded-b-lg w-full">
          <p className="font-semibold text-lg truncate overflow-hidden whitespace-nowrap text-ellipsis">
            {film.title}
          </p>
          <div className="flex items-center justify-between">
            <p>
              {film.release_date} - {formatTime(film.running_time)}
            </p>
            <section className="flex items-center gap-2">
              <Star size={14} fill="gold" color="gray" />
              <p> {film.rt_score}%</p>
            </section>
          </div>
          <div>
            <p
              className={`text-sm text-gray-600 ${showFullDescription ? "" : "line-clamp-2"}`}
            >
              {search
                ? highlightSearchTerm(film.description, search)
                : film.description}
            </p>
            <button
              onClick={toggleDescription}
              className="text-xs text-blue-500 mt-1 flex items-center gap-1 hover:underline"
            >
              {showFullDescription ? (
                <>
                  Mostrar menos <ChevronUp size={14} />
                </>
              ) : (
                <>
                  Mostrar tudo <ChevronDown size={14} />
                </>
              )}
            </button>
          </div>
          <div className="flex flex-col gap-2 text-xs text-gray-600 my-1">
            <p>Diretor: {film.director}</p>
            <p>Produtor: {film.producer}</p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <FilmActionButtons filmId={filmId} />
            <FilmRatingDisplay filmId={filmId} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {noteFilm ? (
          <ModalUpdateNotes film={film} noteFilm={noteFilm} />
        ) : (
          <ModalNotes film={film} />
        )}
      </div>
    </div>
  );
};
