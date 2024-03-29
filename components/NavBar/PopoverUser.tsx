'use client';
import PopOverUserContent from '@/components/NavBar/PopOverUserContent';
import { useState, useContext } from 'react';
import { Profile } from '@/app/types/entities';
import { DrawerContext } from '@/app/context/DrawerContext';
import { Badge, Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import Image from 'next/image';
import defaultUser from '@/public/assets/defaultUser.svg';

const PopoverUser = ({ signOut, user }: { signOut: () => void; user: Profile }) => {
  const [isPopoverUserOpen, setIsPopoverUserOpen] = useState(false);
  const { showDrawer, closeDrawer, open } = useContext(DrawerContext);

  // useEffect(() => {
  //     setWindowWidth(window.innerWidth);
  //     window.addEventListener("resize", () => {
  //         setWindowWidth(window.innerWidth);
  //         if (window.innerWidth >= 640) {
  //             setIsPopoverUserOpen(true);
  //             closeDrawer();
  //         } else {
  //             setIsPopoverUserOpen(false);
  //             showDrawer("User");
  //         }
  //     });

  //     return () => {
  //         window.removeEventListener("resize", () => {
  //             setWindowWidth(window.innerWidth);
  //         });
  //     };
  // }, []);

  const handleShowDrawer = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (window.innerWidth < 640) {
      e.stopPropagation();
      showDrawer('User');
    }
  };

  return (
    <>
      <Popover
        id="PopoverUser"
        placement="bottom"
        offset={15}
        classNames={{ base: 'hidden sm:flex w-[16rem]' }}
        isOpen={isPopoverUserOpen}
        onOpenChange={setIsPopoverUserOpen}
        shouldCloseOnBlur={false}
        onClose={() => closeDrawer()}
        shouldCloseOnInteractOutside={(e) => {
          const classes = [
            'ant-image-preview-wrap',
            'ant-image-preview-img',
            'ant-image-preview-close',
            'ant-image-preview-footer',
            'anticon-close',
            'ant-image-preview-switch-right',
            'ant-image-preview-switch-left',
            'ant-drawer-body',
            'switchThemeWrapper',
            'levelWrapper',
            'nextRewardsWrapper',
            'popOverUserContentWrapper',
          ];

          let element = e as HTMLElement;
          while (element) {
            if (classes.some((className) => element.classList.contains(className))) {
              return false;
            }
            element = element.parentElement as HTMLElement;
          }

          return true;
        }}
      >
        <PopoverTrigger>
          <div
            className="hidden sm:flex items-center cursor-pointer min-w-[32px] sm:min-w-[44px]"
            onClick={(e) => handleShowDrawer(e)}
          >
            <Badge
              content={user?.niveaux.libelle}
              className="bg-secondary text-xs border-bgLight dark:border-tempBgDark transition-all !duration-500"
            >
              <Image
                src={user?.avatar_url || defaultUser.src}
                alt={user?.avatar_url! || defaultUser.src}
                width={48}
                height={48}
                className="relative inline-flex shrink-0 justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground w-[2rem] h-[2rem] sm:w-[2.75rem] sm:h-[2.75rem] rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default transition-all !duration-500"
              />
            </Badge>
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-white dark:bg-tempBgDark border rounded-md border-white/30 transition-all !duration-500">
          <PopOverUserContent
            user={user}
            customFunction={() => {
              setIsPopoverUserOpen(false);
              closeDrawer();
            }}
            signOut={signOut}
          />
        </PopoverContent>
      </Popover>

      <div
        className={`flex sm:hidden cursor-pointer ${open ? 'scale-[0.97] bg-black opacity-70' : ''}`}
        onClick={(e) => handleShowDrawer(e)}
      >
        <Badge
          content={user?.niveaux.libelle}
          className="bg-secondary text-xs border-bgLight dark:border-tempBgDark transition-all !duration-500"
        >
          <Image
            src={user?.avatar_url || defaultUser.src}
            alt={user?.avatar_url! || defaultUser.src}
            width={48}
            height={48}
            className="relative inline-flex shrink-0 justify-center items-center box-border overflow-hidden align-middle z-0 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-tiny bg-default text-default-foreground w-[2rem] h-[2rem] sm:w-[2.75rem] sm:h-[2.75rem] rounded-full ring-2 ring-offset-2 ring-offset-background dark:ring-offset-background-dark ring-default transition-all !duration-500"
          />
        </Badge>
      </div>
    </>
  );
};

export default PopoverUser;
