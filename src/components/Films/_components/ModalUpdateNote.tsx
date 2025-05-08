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

interface FilmProps {
  film: FilmsType;
  noteFilm: string;
}

export const ModalUpdateNotes = ({ film, noteFilm }: FilmProps) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string>(noteFilm);
  const { removeFromNoteFilm, updateNoteFilm } = useFilmsStore();

  const handleUpdateNoteFilme = () => {
    updateNoteFilm(film.id, note);
    setOpen(false);
  };
  const handleRemoveNoteFilm = () => {
    removeFromNoteFilm(film.id);
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
