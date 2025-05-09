import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup } from "@/components/ui/radio-group";
import { RatingFilterItem } from "./RatingFilterItem";

interface RatingFilterProps {
  minRating: number;
  setMinRating: (value: number) => void;
}

export const RatingFilter = ({
  minRating,
  setMinRating,
}: RatingFilterProps) => {
  const getButtonText = () => {
    if (minRating === -1) return "Sem avaliação";
    if (minRating === 0) return "Todos os filmes";
    if (minRating === 6) return "Todos avaliados";
    return `${minRating} estrelas`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <Star size={12} /> {getButtonText()}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56">
        <div className="space-y-4">
          <h4 className="font-medium text-sm border-b-2 border-border">
            Filtrar por avaliação
          </h4>
          <RadioGroup
            value={minRating.toString()}
            onValueChange={(value) => setMinRating(parseInt(value))}
          >
            <RatingFilterItem value="0" id="all" label="Todos os filmes" />
            <RatingFilterItem
              value="6"
              id="all-rated"
              label="Todos avaliados"
            />
            <RatingFilterItem value="-1" id="no-rating" label="Sem avaliação" />
            <RatingFilterItem value="5" id="five-stars" label="5 estrelas" />
            <RatingFilterItem value="4" id="four-stars" label="4 estrelas" />
            <RatingFilterItem value="3" id="three-stars" label="3 estrelas" />
            <RatingFilterItem value="2" id="two-stars" label="2 estrelas" />
            <RatingFilterItem value="1" id="one-star" label="1 estrela" />
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};
