import { Autocomplete, AutocompleteItem, AutocompleteSection, Avatar } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { doSearchByWord } from "@/utils/doSearchByWord";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
const SearchBar = () => {
    const headingClasses = "flex w-full py-1.5 px-2 font-bold text-sm";
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [guildes, setGuildes] = useState<any>([])
    const [profiles, setProfiles] = useState<any>([])
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            const data = await doSearchByWord(inputValue);
            console.log(data);
            setProfiles(data[0]);
            setGuildes(data[1]);
        }, 800);

        // Nettoyer le délai lors du démontage du composant
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [inputValue]);


    return (
        <Autocomplete
            aria-label="Rechercher"
            inputProps={{ classNames: { inputWrapper: "h-10 transition-all !duration-500" }, startContent: <MagnifyingGlassIcon className="w-5 h-5 text-textDark dark:text-textLight !duration-[125ms]" /> }}
            classNames={{ selectorButton: "hidden" }}
            selectorIcon={null}
            scrollShadowProps={{
                isEnabled: false,
            }}
            inputValue={inputValue}
            isLoading={isLoading}
            placeholder="Rechercher"
            onInputChange={(value) => {
                setInputValue(value);
                setIsLoading(true);
            }}
        >

            <AutocompleteSection title="Utilisateurs" classNames={{ heading: headingClasses }} showDivider>
                {profiles.map((profile: any) => (
                    <AutocompleteItem key={`searchbar-${profile.username}`} value={profile.username} textValue={profile.username} >
                        <Link href={`/${profile.username}`} className="w-full h-full">
                            <div className="flex flex-row w-full h-fit gap-2 items-center">
                                <Avatar size="sm" src={profile.avatar_url} />
                                <div className="w-full h-full flex flex-col">
                                    {profile.username}
                                    <span className="text-tiny text-default-400">Utilisateur . Niveau {profile.niveau}</span>
                                </div>
                            </div>
                        </Link>
                    </AutocompleteItem>
                ))}
            </AutocompleteSection>
            <AutocompleteSection title="Guildes" classNames={{ heading: headingClasses }} showDivider>
                {guildes.map((guilde: any) => (
                    <AutocompleteItem key={`searchbar-${guilde.nom}`} value={guilde.nom} textValue={guilde.nom} >
                        <Link href={`/g/${guilde.nom}`} className="w-full h-full">
                            <div className="flex flex-row w-full h-fit gap-2 items-center">
                                <Avatar size="sm" src={guilde.avatar_url} />
                                <div className="w-full h-full flex flex-col">
                                    {guilde.nom}
                                    <span className="text-tiny text-default-400">Guilde . {guilde.total_members} membres</span>
                                </div>
                            </div>
                        </Link>
                    </AutocompleteItem>
                ))}
            </AutocompleteSection>

            <AutocompleteSection title="Voir plus" classNames={{ heading: headingClasses }}>
                <AutocompleteItem value="Voir plus" textValue="Voir plus" key={`searchbar-voir-plus`}>
                    Rechercher {inputValue}
                </AutocompleteItem>
            </AutocompleteSection>


        </Autocomplete>
    );
}

export default SearchBar;