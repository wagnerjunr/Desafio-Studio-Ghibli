import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
          <h4 className="font-medium text-sm">Filtrar por avaliação</h4>
          <RadioGroup
            value={minRating.toString()}
            onValueChange={(value) => setMinRating(parseInt(value))}
            className="space-y-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="0" id="all" />
              <Label htmlFor="all">Todos os filmes</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="6" id="all-rated" />
              <Label htmlFor="all-rated">Todos avaliados</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="-1" id="no-rating" />
              <Label htmlFor="no-rating">Sem avaliação</Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="5" id="five-stars" />
              <Label htmlFor="five-stars" className="flex items-center gap-1">
                5 estrelas
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4" id="four-stars" />
              <Label htmlFor="four-stars" className="flex items-center gap-1">
                4 estrelas
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="3" id="three-stars" />
              <Label htmlFor="three-stars" className="flex items-center gap-1">
                3 estrelas
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="2" id="two-stars" />
              <Label htmlFor="two-stars" className="flex items-center gap-1">
                2 estrelas
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="one-star" />
              <Label htmlFor="one-star" className="flex items-center gap-1">
                1 estrela
              </Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};
