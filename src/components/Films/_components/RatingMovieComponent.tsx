import { useState } from "react";
import { Star } from "lucide-react";

interface RatingMovieComponentProps {
  rating: number;
  setRating: (rating: number) => void;
}

export const RatingMovieComponent = ({
  rating,
  setRating,
}: RatingMovieComponentProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Movie Rating"
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = hoverRating >= star || rating >= star;
        return (
          <Star
            key={star}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
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
