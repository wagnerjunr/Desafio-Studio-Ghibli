import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";

import { ArrowUpRight, NotepadText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilmsType } from "@/types/FilmsType";
import { useFilmsStore } from "@/store/useFilmsStore";
import { RatingMovieComponent } from "./RatingMovieComponent";
import { toast } from "sonner";

interface FilmProps {
  film: FilmsType;
}

export const ModalNotes = ({ film }: FilmProps) => {
  const { rateFilm } = useFilmsStore();

  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const { addToNoteFilm } = useFilmsStore();

  //Adicione uma anotação ao filme, e caso seja necessário, adicione uma avaliação ao filme
  const handleAddNoteFilme = () => {
    addToNoteFilm(film.id, note);
    if (rating > 0) {
      rateFilm(film.id, rating);
    }
    toast.success("Sucesso!", {
      description: "Avaliação adicionada ao filme com sucesso.",
    });
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="outline" className="w-[90%] cursor-pointer">
          <NotepadText size={16} />
          Adicionar uma Nota
        </Button>
      </ModalTrigger>
      <ModalContent className="md:rounded-xl">
        <ModalHeader>
          <ModalTitle>Adicionar Nota</ModalTitle>
          <ModalDescription>
            Adicionar uma nota ao filme {film.title}
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="flex flex-col md:gap-4">
          <div className="flex items-center gap-3">
            <p className="text-base">Avaliação</p>
            <RatingMovieComponent rating={rating} setRating={setRating} />
          </div>
          <textarea
            className="w-full h-[150px] p-4 rounded-lg border border-border"
            placeholder="Escreva aqui sua nota..."
            value={note}
            maxLength={999}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          ></textarea>
        </ModalBody>

        <div className="flex items-center w-full gap-2 mt-6">
          <ModalClose className="w-full">
            <Button variant="secondary" className="w-full">
              <X size={18} className="mr-2" />
              Cancelar
            </Button>
          </ModalClose>

          <Button
            className="w-full"
            onClick={handleAddNoteFilme}
            disabled={!note}
          >
            <ArrowUpRight size={18} className="mr-2" />
            Adicionar Nota
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
