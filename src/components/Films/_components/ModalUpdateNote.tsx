import { useState } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/components/ui/modal";

import { ArrowUpRight, NotepadText, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilmsType } from "@/types/FilmsType";
import { useFilmsStore } from "@/store/useFilmsStore";
import { RatingMovieComponent } from "./RatingMovieComponent";
import { toast } from "sonner";

interface FilmProps {
  film: FilmsType;
  noteFilm: string;
}

export const ModalUpdateNotes = ({ film, noteFilm }: FilmProps) => {
  const {
    removeFromNoteFilm,
    updateNoteFilm,
    rateFilm,
    getFilmRating,
    removeFilmRating,
  } = useFilmsStore();
  const filmRating = getFilmRating(film.id);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string>(noteFilm);
  const [rating, setRating] = useState<number>(filmRating || 0);

  //Faz o update da nota do filme e da avaliação do filme caso tenha sido alterado
  const handleUpdateNoteFilme = () => {
    updateNoteFilm(film.id, note);
    if (rating !== filmRating) {
      rateFilm(film.id, rating);
    }
    toast.success("Sucesso!", {
      description: "Nota do filme atualizada com sucesso.",
    });
    setOpen(false);
  };

  //Remove a nota do filme e remove a avaliação do filme, e limpa os dados de avaliação e nota
  const handleRemoveNoteFilm = () => {
    removeFromNoteFilm(film.id);
    removeFilmRating(film.id);
    toast.success("Sucesso!", {
      description: "Nota do filme removida com sucesso.",
    });
    setNote("");
    setRating(0);
    setOpen(false);
  };

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="outline" className="w-[90%] cursor-pointer">
          <NotepadText size={16} />
          Atualizar Nota
        </Button>
      </ModalTrigger>
      <ModalContent className="md:rounded-xl">
        <ModalHeader>
          <ModalTitle>Atualizar Nota</ModalTitle>
          <ModalDescription>
            Atualizar nota do filme {film.title}
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
            onChange={(e) => {
              setNote(e.target.value);
            }}
          ></textarea>
        </ModalBody>

        <div className="flex items-center w-full gap-2 mt-6">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleRemoveNoteFilm}
          >
            <Trash size={18} className="mr-2" />
            Remover Nota
          </Button>

          <Button
            className="w-full"
            onClick={handleUpdateNoteFilme}
            disabled={!note || note.length === 0 || note === noteFilm}
          >
            <ArrowUpRight size={18} className="mr-2" />
            Atualizar Nota
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
