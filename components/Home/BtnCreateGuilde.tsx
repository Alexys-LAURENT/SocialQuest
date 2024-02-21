'use client';
import { Button, Card, useDisclosure } from '@nextui-org/react';
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const DynamicModalCreateGuilde = dynamic(() => import('@/components/Home/ModalCreateGuilde'), { ssr: false });

const BtnCreateGuilde = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        as={Card}
        onPress={onOpen}
        key={`create-guilde`}
        className="cursor-pointer p-2 bg-tempBgLightSecondary items-start hover:bg-tempLightBorder/50 dark:bg-tempBgDarkSecondary dark:hover:bg-tempDarkHover shadow-none border border-tempLightBorder dark:border-tempDarkBorder rounded-md !transition-all !duration-[125ms] h-auto"
      >
        <div className="flex items-center">
          <PlusIcon className="w-6 h-6" />
          <div className="flex flex-col ml-2 transition-all text-textDark dark:text-textLight">
            <div className="text-sm">Créer une guilde</div>
          </div>
        </div>
      </Button>
      <DynamicModalCreateGuilde isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default BtnCreateGuilde;
