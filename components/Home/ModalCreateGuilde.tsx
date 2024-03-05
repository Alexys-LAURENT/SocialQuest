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
import { getGuildesNameWhereName } from '@/utils/getGuildesNameWhereName';

export const ModalCreateGuilde = ({
  isOpen,
  onOpenChange,
  fetchData,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  fetchData?: any;
}) => {
  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<{ value: boolean; reason: string }>();
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
      fetchData();
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

  const handleChangeInputNom = async (inputValue: string) => {
    setIsTyping(true);

    // set the input value without spaces
    setInput(inputValue.replace(/\s/g, ''));

    if (inputValue.includes(' ')) {
      error("Le nom de la guilde ne doit pas contenir d'espaces");
    }

    if ((await getGuildesNameWhereName(inputValue.replace(/\s/g, ''))) === false) {
      setIsInputValid({ value: false, reason: 'Le nom de la guilde est déjà utilisé' });
      setIsTyping(false);
      return;
    }

    setIsInputValid({ value: true, reason: '' });
    setIsTyping(false);
  };

  return (
    <>
      <Modal
        classNames={{
          base: 'bg-tempBgLightSecondary dark:bg-tempBgDark rounded-md border border-tempLightBorder dark:border-tempDarkBorder',
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setInput('');
          setDescription('');
          setFile(undefined);
          setIsInputValid({ value: true, reason: '' });
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Créer une guilde</ModalHeader>
              <ModalBody>
                <UploadFile text={'Ajouter une image'} file={file} setFile={setFile} className="mx-auto" />
                <Input
                  className="bg-transparent"
                  classNames={{
                    inputWrapper:
                      'bg-tempsBgLightSecondary dark:bg-tempBgDark border rounded-md border-tempLightBorder dark:border-tempDarkBorder group-data-[focus=true]:bg-tempBgLightSecondary dark:group-data-[focus=true]:bg-tempBgDark',
                  }}
                  label="Nom de la guilde"
                  value={input}
                  onChange={(e) => handleChangeInputNom(e.target.value)}
                  isInvalid={isInputValid ? !isInputValid?.value : false}
                  errorMessage={isInputValid?.reason}
                  endContent={
                    <Spinner size="sm" className={`scale-75 mt-2 ${!isTyping ? 'hidden' : ''} `} color="white" />
                  }
                />
                <Textarea
                  label="Description de la guilde"
                  aria-label="Description"
                  minRows={1}
                  classNames={{
                    inputWrapper:
                      'h-auto bg-tempsBgLightSecondary dark:bg-tempBgDark border rounded-md border-tempLightBorder dark:border-tempDarkBorder group-data-[focus=true]:bg-tempBgLightSecondary dark:group-data-[focus=true]:bg-tempBgDark',
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
                  disabled={!input || !file || !description || loading || !isInputValid?.value || isTyping}
                  className={`customButton bg-secondary/70 border-secondary ${!input || !file || !description || loading || !isInputValid?.value ? 'bg-secondary/30 border-secondary/30 text-opacity-30' : ''}`}
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
