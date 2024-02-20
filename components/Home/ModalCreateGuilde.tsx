import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';
import CropperComponent from './Cropper';

export const ModalCreateGuilde = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Créer une guilde</ModalHeader>
              <ModalBody>
                <CropperComponent />
                <Input label="Nom de la guilde" />
              </ModalBody>
              <ModalFooter>
                <Button className="customButton bg-danger/70 border-danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button className="customButton bg-secondary/70 border-secondary" onPress={onClose}>
                  Créer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateGuilde;
