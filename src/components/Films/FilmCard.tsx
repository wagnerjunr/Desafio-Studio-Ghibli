import { formatTime } from "@/lib/utils";
import type { FilmsType } from "@/types/FilmsType";
import { useFilmsStore } from "@/store/useFilmsStore";
import {
  Heart,
  Star,
  Eye,
  ClockPlus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ModalNotes } from "./_components/ModalNotes";
import { ModalUpdateNotes } from "./_components/ModalUpdateNote";
import { toast } from "sonner";
import { useState } from "react";

interface FilmProps {
  film: FilmsType;
  search?: string;
}

export const FilmCard = ({ film, search }: FilmProps) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const {
    addToFavorites,
    removeFromFavorites,
    addToWatchFilms,
    removeFromWatchFilms,
    addToWatchList,
    removeFromWatchList,
    isFavorite,
    isInWatchList,
    isInWatchFilms,
    getFilmRating,
    getNoteFilm,
  } = useFilmsStore();
  const thumbnailCover = film.image;

  // Pega os dadoos do filme com base na função, caso o filme ja tenha sido adicionado a lista de favoritos, de filme assistidos e de lista de filmes para assistir.
  const filmId = film.id;
  const isFilmFavorite = isFavorite(filmId);
  const inFilmeInWatchFilms = isInWatchFilms(filmId);
  const isInWatchListMovie = isInWatchList(filmId);
  const filmRating = getFilmRating(filmId);
  const noteFilm = getNoteFilm(filmId);

  //Função para alternar o estado do filme para favorito ou não.
  const handleToggleFavorite = () => {
    if (isFilmFavorite) {
      removeFromFavorites(filmId);
    } else {
      addToFavorites(filmId);
    }
  };

  // Função para alternar o estado do filme para lista de filmes para assistir ou não.
  const handleToggleWatchList = () => {
    if (isInWatchListMovie) {
      removeFromWatchList(filmId);
    } else {
      addToWatchList(filmId);
    }
  };

  //Função para alterar o estado do filme para assistido ou não assistido.
  const handleToggleWatchFilms = () => {
    if (inFilmeInWatchFilms) {
      removeFromWatchFilms(filmId);
    } else {
      addToWatchFilms(filmId);
    }
  };

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
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite();
                  toast.success("Sucesso!", {
                    description: isFilmFavorite
                      ? "Removed from favorites movies"
                      : "Added to favorites movies",
                  });
                }}
                className={`p-2 rounded-full cursor-pointer ${isFilmFavorite ? "bg-red-100 text-red-500" : "bg-gray-100"}`}
              >
                <Heart
                  size={18}
                  fill={isFilmFavorite ? "currentColor" : "none"}
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleWatchFilms();
                  toast.success("Sucesso!", {
                    description: inFilmeInWatchFilms
                      ? "Removed from watched movies"
                      : "Added to watched movies",
                  });
                }}
                className={`p-2 rounded-full cursor-pointer ${inFilmeInWatchFilms ? "bg-green-100 text-green-500" : "bg-gray-100"}`}
              >
                <Eye
                  size={18}
                  color={inFilmeInWatchFilms ? "currentColor" : "black"}
                  fill="none"
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleWatchList();
                  toast.success("Sucesso!", {
                    description: isInWatchListMovie
                      ? "Removed from watch list"
                      : "Added to watch list",
                  });
                }}
                className={`p-2 rounded-full cursor-pointer ${isInWatchListMovie ? "bg-blue-100 text-blue-500" : "bg-gray-100"}`}
              >
                <ClockPlus
                  size={18}
                  color={isInWatchListMovie ? "currentColor" : "black"}
                  fill="none"
                />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="focus:outline-none cursor-default"
                >
                  <Star
                    size={16}
                    fill={filmRating && filmRating >= star ? "gold" : "none"}
                    color={filmRating && filmRating >= star ? "gold" : "gray"}
                  />
                </button>
              ))}
            </div>
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
