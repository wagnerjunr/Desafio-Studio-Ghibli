import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useFilmsStore } from "@/store/useFilmsStore";

export const RatingMovieComponent = ({ filmId }: { filmId: string }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const { rateFilm, getFilmRating } = useFilmsStore();

  const filmRating = getFilmRating(filmId);

  const handleRateFilm = (rating: number) => {
    if (filmRating === rating) {
      rateFilm(filmId, 0);
      toast.success("Sucesso!", {
        description: "Removido avaliação do filme com sucesso.",
      });
    } else {
      rateFilm(filmId, rating);
      toast.success("Sucesso!", { description: "Filme avaliado com sucesso." });
    }
  };

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Movie Rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive =
          hoverRating >= star || (filmRating && filmRating >= star);
        return (
          <Star
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRateFilm(star)}
            size={22}
            className={`cursor-pointer transition-transform duration-300 ease-in-out ${
              isActive ? "text-gold" : "text-gray-400"
            }`}
            fill={isActive ? "gold" : "none"}
            color={isActive ? "gold" : "gray"}
          />
        );
      })}
    </div>
  );
};
