import { useContext, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Spinner,
} from '@nextui-org/react';
import UploadFile from '@/components/UploadFile';
import { uploadFiles } from '@/utils/uploadFiles';
import { ToasterContext } from '@/app/context/ToasterContext';
import { createGuild } from '@/utils/createGuild';
import { useRouter } from 'next/navigation';

export const ModalCreateGuilde = ({ isOpen, onOpenChange }: { isOpen: boolean; onOpenChange: () => void }) => {
  const [input, setInput] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const { error, success } = useContext(ToasterContext);
  const router = useRouter();

  const handleCreateGuild = async (onClose: () => void) => {
    setLoading(true);
    const filePath = await uploadFiles([{ file }], 'guildes_avatars');
    if (!filePath) {
      return error("Une erreur est survenue lors de l'envoi des images");
    }
    const isCreated = await createGuild(input, filePath[0], description);
    if (isCreated) {
      success('Guilde créée !');
      setLoading(false);
      setInput('');
      setDescription('');
      onClose();
      router.refresh();
    } else {
      setLoading(false);
      setInput('');
      setDescription('');
      error('Une erreur est survenue');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Créer une guilde</ModalHeader>
              <ModalBody>
                <UploadFile file={file} setFile={setFile} />
                <Input label="Nom de la guilde" value={input} onChange={(e) => setInput(e.target.value)} />
                <Textarea
                  label="Description de la guilde"
                  aria-label="Description"
                  minRows={1}
                  classNames={{
                    inputWrapper: 'h-auto',
                  }}
                  value={description}
                  maxLength={255}
                  onChange={(e) => setDescription(e.target.value)}
                ></Textarea>
              </ModalBody>
              <ModalFooter>
                <Button className="customButton bg-danger/70 border-danger" variant="light" onPress={onClose}>
                  Fermer
                </Button>
                <Button
                  disabled={!input || !file || !description}
                  className="customButton bg-secondary/70 border-secondary"
                  onClick={() => handleCreateGuild(onClose)}
                >
                  {loading ? <Spinner size="sm" className="scale-75" color="white" /> : 'Creer'}
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
