import { formatTime } from "@/lib/utils";
import type { FilmsType } from "@/types/FilmsType";
import { useFilmsStore } from "@/store/useFilmsStore";
import { Heart, BookmarkPlus, Star } from "lucide-react";
import { ModalNotes } from "./_components/ModalNotes";

interface FilmProps {
  film: FilmsType;
}

export const FilmCard = ({ film }: FilmProps) => {
  const thumbnailCover = film.image;
  const {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    rateFilm,
    isFavorite,
    isInWatchlist,
    getFilmRating,
  } = useFilmsStore();

  const filmId = film.id;
  const isFilmFavorite = isFavorite(filmId);
  const isFilmInWatchlist = isInWatchlist(filmId);
  const filmRating = getFilmRating(filmId);

  const handleToggleFavorite = () => {
    if (isFilmFavorite) {
      removeFromFavorites(filmId);
    } else {
      addToFavorites(filmId);
    }
  };

  const handleToggleWatchlist = () => {
    if (isFilmInWatchlist) {
      removeFromWatchlist(filmId);
    } else {
      addToWatchlist(filmId);
    }
  };

  const handleRateFilm = (rating: number) => {
    if (filmRating === rating) {
      rateFilm(filmId, 0);
    } else {
      rateFilm(filmId, rating);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 w-full h-fit rounded-lg  opacity-90 hover:opacity-100  border border-border p-4">
        <img
          className="rounded-lg h-[350px] w-full object-cover cursor-pointer transition-all  active:scale-95"
          src={thumbnailCover}
          alt="event cover image"
        />

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
          <p className="line-clamp-2 text-sm text-gray-600">
            {film.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleFavorite();
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
                  handleToggleWatchlist();
                }}
                className={`p-2 rounded-full cursor-pointer ${isFilmInWatchlist ? "bg-blue-100 text-blue-500" : "bg-gray-100"}`}
              >
                <BookmarkPlus
                  size={18}
                  fill={isFilmInWatchlist ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRateFilm(star);
                  }}
                  className="focus:outline-none"
                >
                  <Star
                    size={16}
                    className="cursor-pointer"
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
        <ModalNotes />
      </div>
    </div>
  );
};
