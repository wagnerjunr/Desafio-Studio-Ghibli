import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RatingFilterItemProps {
  value: string;
  id: string;
  label: string;
}
//Componente para os itens de filtro de avaliação.(Como são vários items esse componente facilita para fazer manutenção)
export const RatingFilterItem = ({ value, id, label }: RatingFilterItemProps) => {
  return (
    <div className="flex items-center space-x-2 hover:bg-gray-400/10 py-1 rounded-md">
      <RadioGroupItem value={value} id={id} />
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
      </Label>
    </div>
  );
};