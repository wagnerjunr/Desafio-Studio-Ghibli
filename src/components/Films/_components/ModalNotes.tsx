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

export const ModalNotes = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant="outline" className="w-[90%]">
          <NotepadText size={16} />
          Adicionar um Nota
        </Button>
      </ModalTrigger>
      <ModalContent className="md:rounded-xl">
        <ModalHeader>
          <ModalTitle>Envio de Ingresso</ModalTitle>
          <ModalDescription>
            Altere os dados de um envio de ingresso
          </ModalDescription>
        </ModalHeader>
        <ModalBody className="flex flex-col md:gap-4">
          <div>teste</div>
        </ModalBody>

        <div className="flex items-center w-full gap-2 mt-6">
          <ModalClose className="w-full">
            <Button variant="secondary" className="w-full">
              <X size={18} className="mr-2" />
              Cancelar
            </Button>
          </ModalClose>

          <Button className="w-full">
            <ArrowUpRight size={18} className="mr-2" />
            Atualizar Envio
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};
