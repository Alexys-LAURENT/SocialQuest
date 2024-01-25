"use client"
import { useEffect, useRef, useState } from 'react';
import { clsx } from "@nextui-org/shared-utils";
import { Button, Progress } from "@nextui-org/react";

const HebdoCaroussel = () => {
    const carousselRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (carousselRef.current && isAnimating) {
                const caroussel = carousselRef.current;
                const firstChild = caroussel.firstChild as HTMLElement;

                // Si le premier enfant est complètement hors de vue
                if (firstChild.getBoundingClientRect().right <= 0) {
                    caroussel.appendChild(firstChild); // Déplacez le premier enfant à la fin
                    caroussel.scrollLeft -= firstChild.offsetWidth; // Compensez le défilement
                } else {
                    caroussel.scrollLeft += 1; // Défilement normal
                }
            }
        }, 10); // changez cette valeur pour contrôler la fréquence de défilement

        return () => clearInterval(interval); // nettoyer l'intervalle lors du démontage du composant
    }, [isAnimating]);

    return (
        <>
            <div
                ref={carousselRef}
                id="carousselMissions"
                className={clsx('transition-all no-scrollbar h-[180px] relative w-full flex items-center gap-5 overflow-x-scroll flex-nowrap px-5 xl:rounded-lg bg-gradient-to-br  from-[#60efff] to-[#183182]')}
                onMouseEnter={() => setIsAnimating(false)}
                onMouseLeave={() => setIsAnimating(true)}
            >
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                        return (
                            <div key={`mission-hebdo-${item}`} className='transition-all translate-x-[-0%] HebdoMission flex flex-col items-center h-[80%] min-w-[400px] max-w-[400px]  z-30 rounded-large backdrop-blur-md backdrop-saturate-150 border-none bg-background/50 '>
                                <div className=' w-[85%] h-[70%] flex'>
                                    <div className='flex flex-col w-10/12 h-full justify-end'>
                                        <h2 className='font-semibold text-xl'>Ajouter {index} personnes en amis</h2>
                                        <span>0/2</span>
                                    </div>
                                    <div className='flex flex-col justify-end'>
                                        <Button onClick={() => alert('test')}>
                                            Récupérer
                                        </Button>

                                    </div>
                                </div>
                                <div className='w-[85%] h-[20%] flex justify-center items-center'>
                                    <Progress value={50} aria-label='progress bar' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default HebdoCaroussel;