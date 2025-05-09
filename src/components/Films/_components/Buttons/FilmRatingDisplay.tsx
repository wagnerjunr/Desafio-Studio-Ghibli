import { Star } from "lucide-react";
import { useFilmsStore } from "@/store/useFilmsStore";

interface FilmRatingDisplayProps {
  filmId: string;
}

export const FilmRatingDisplay = ({ filmId }: FilmRatingDisplayProps) => {
  const { getFilmRating } = useFilmsStore();
  const filmRating = getFilmRating(filmId);

  return (
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
  );
};