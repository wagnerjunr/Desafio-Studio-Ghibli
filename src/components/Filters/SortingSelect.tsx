import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = {
  value: string;
  label: string;
};

export type SortDirection = "asc" | "desc" | "none";

interface SortingSelectProps {
  selectedSort: string;
  setSelectedSort: (value: string) => void;
}

export const SortingSelect = ({
  selectedSort,
  setSelectedSort,
}: SortingSelectProps) => {
  const sortOptions: SortOption[] = [
    { value: "none", label: "Sem ordenação" },
    { value: "title_asc", label: "Título (A-Z)" },
    { value: "title_desc", label: "Título (Z-A)" },
    { value: "duration_asc", label: "Duração (menor para maior)" },
    { value: "duration_desc", label: "Duração (maior para menor)" },
    { value: "userrating_asc", label: "Avaliação pessoal (menor para maior)" },
    { value: "userrating_desc", label: "Avaliação pessoal (maior para menor)" },
    { value: "rtscore_asc", label: "Pontuação (menor para maior)" },
    { value: "rtscore_desc", label: "Pontuação (maior para menor)" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Select value={selectedSort} onValueChange={setSelectedSort}>
        <SelectTrigger className="w-full cursor-pointer" id="sort-select">
          <SelectValue placeholder="Selecione uma opção de ordenação" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};